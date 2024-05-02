var aTaskID = "";
var Holidays = [];
var size = {
    width: window.innerWidth || document.body.clientWidth,
    height: window.innerHeight || document.body.clientHeight
}
function isNullCheck(element) {
    return element == null ? "" : element;
}
function isNaNCheck(element) {
    return element == null ? "0" : element;
}
$(document).ready(function () {
    $('.jumbotron').css('height', size.height - 80);
    $('.modal-body').css('max-height', size.height - 200);
    $('.side-navi-data').css('height', size.height - 60);
    $('.divQuickList').css('height', size.height - 70);
    $('#IFitler').click(function () {

        $('#sideNavi_Filter').animate({ "right": "350px" }, "slow");
    });
    $('#isideClose_fitler').click(function () {
        $('#sideNavi_Filter').animate({ "right": "0px" }, "slow");
    });
    $('#btnProfileUpdate').click(function () {
        UpdateProfileData();
    });
});
GetHolidays();

setInterval(function () {
    $("input.IsNumeric").keydown(function (e) {
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 || (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) || (e.keyCode >= 35 && e.keyCode <= 40)) {
            return;
        }
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    });

}, 1000);

$('#IFitler').click(function () {

    $('#sideNavi_Filter').animate({ "right": "350px" }, "slow");
});
$('#isideClose_fitler').click(function () {
    $('#sideNavi_Filter').animate({ "right": "0px" }, "slow");
});


function GetHolidays() {
    Holidays = [];

    $.ajax({
        type: 'post',
        url: $('#hf_GetHolidaysInfo').val(),
        datatype: 'json',
        success: function (response) {
            try {
                var items = JSON.parse(response);
                $.each(items, function (index) {

                    var t = [

                        $(this)[0]["Leave_Date"].replace("T00:00:00", "")

                    ];

                    Holidays.push(t);
                });

            } catch (e) {

            }
        },
        error: function (response) {
            $.bootstrapGrowl(response, {
                type: 'danger',
                delay: 2000,
            });

        }
    });
}
function LoadUserData() {
    if ($('#hf_UserMaster').attr('data-value') == '') {
        window.location.href = $('#hf_LoginURL').val();
    }
    else {
        var aUserMaster = JSON.parse($('#hf_UserMaster').attr('data-value'));
        if (aUserMaster[0].MainMenu == null) {
            $('.sidebar-menu ul li').hide();
            $('#show-sidebar a').hide();
        }
        else {
            var aMainMenu = aUserMaster[0].MainMenu.split(",");
            var aSubMenu = aUserMaster[0].SubMenu.split(",");
            $('.sidebar-menu ul li').hide();
            $('#show-sidebar a').hide();

            $.each(aMainMenu, function (i) {
                $('.Li_' + aMainMenu[i]).show();
                if (typeof $('.Li_' + aMainMenu[i]).attr('menuview') == "undefined")
                    $('.Li_' + aMainMenu[i]).attr('menuview', aMainMenu[i]);

            });

            $.each(aSubMenu, function (i) {
                $('.Li_' + aSubMenu[i]).show();
            });

            if ($('#divMenulist').length != 0) {
                var aMenuViewList = $("#myiconmenu li[menuview]");

                var menu = '<div>';
                $('#divMenulist').html('');

                var zCtBox = 0;
                $.each(aMenuViewList, function (i, val) {
                    zCtBox += 1;
                    if (zCtBox == 7)
                        zCtBox = 1;
                    var aLabel = $($(this)[0]).find('a').attr('title');
                    var menuclass = $($(this)[0]).find('a').attr('class');
                    var aLink = $($(this)[0]).find('a').attr('href');
                    if (typeof aLabel == "undefined")
                        aLabel = $(this)[0].title;

                    menu += '<div class="col-sm-2">'
                        + '<div class="box_' + zCtBox + ' gallery" style="width: auto;height: 86px;">'
                        + '<p style="color:white">' + aLabel + '</p>'
                        + '<a href="' + aLink + '" class="' + menuclass + '" style="color: whitesmoke;font-size: 18px;"></a>'
                        + '</div>'
                        + '</div>'

                });
                menu += '</div >';
                $('#divMenulist').html(menu);
            }

        }


        $('#hf_UserID').val(aUserMaster[0].UserID);
        $('#hf_RoleID').val(aUserMaster[0].RoleID);
        $('#hf_UserType').val(aUserMaster[0].UserType);

        if (aUserMaster[0].UserType == 'Author' || aUserMaster[0].UserType == 'Editor') {
            $('.Li_Home').show();
        }

        if (aUserMaster.length > -1) {
            $('.spUserName').html('Welcome ' + aUserMaster[0].LoginName.capitalize() + ' !');
        }
        if (aUserMaster[0].Image == null)
            $('#imgUserDP,.imgProfile').attr('src', '../img/user.jpg');
        else
            $('#imgUserDP,.imgProfile').attr('src', aUserMaster[0].Image);
    }
    SetActiveMenu();
}

function noWeekendsOrHolidays(date) {
    var dt = $.datepicker.formatDate('yy-mm-dd', date);
    var noWeekend = $.datepicker.noWeekends(date);

    if (noWeekend[0]) {
        return HoliDaysList(dt);
    } else {
        return noWeekend;
    }
}

function HoliDaysList(date) {
    for (i = 0; i < Holidays.length; i++) {
        if (date == Holidays[i]) {
            return [false, Holidays[i][2] + '_day'];
        }
    }
    return [true, ''];
}

String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

var month_names = ["Jan", "Feb", "Mar",
    "Apr", "May", "Jun",
    "Jul", "Aug", "Sep",
    "Oct", "Nov", "Dec"];

Date.prototype.toShortFormat = function () {

    var day = this.getDate();
    var month_index = this.getMonth();
    var year = this.getFullYear();

    return "" + day + month_names[month_index] + year;
}
Date.prototype.toShortFormatWithTime = function () {

    var day = this.getDate();
    var month_index = this.getMonth();
    var year = this.getFullYear();
    var ztime = '_' + this.getHours() + '_' + this.getMinutes() + '_' + this.getSeconds();

    return "_" + day + month_names[month_index] + year + ztime;
}
var today = new Date();


function FormatDateColumn(dateL, addDate) {
    try {

        var date = new Date(parseInt(dateL.replace(/\D/g, '')));
        if (typeof addDate != "undefined") {
            date.setDate(date.getDate() + addDate);
        }
        var day = date.getDate();
        var dayString = day > 9 ? day : '0' + day;
        var Monthstr = date.getMonth() > 9 ? date.getMonth() : '0' + date.getMonth();
        var dtT = dayString + ' ' + month_names[date.getMonth()] + ' ' + date.getFullYear(); //month_names[date.getMonth()]

        return dtT;
    } catch (e) {
        return '';
    }
}
function FromateDateWithTime(dateTime) {
    var date = new Date(parseInt(dateTime.substr(6)));
    var hrs = date.getHours() > 9 ? date.getHours() : '0' + date.getHours();
    var mints = date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes();
    var formatted = ("0" + date.getDate()).slice(-2) + " " +
        month_names[date.getMonth()] + " " + // ("0" + (date.getMonth() + 1)).slice(-2)
        date.getFullYear() + " " + hrs + ":" + mints;

    return formatted;
}

function FormatDate(dateL, addDate) {
    try {

        var date = new Date(dateL);
        if (typeof addDate != "undefined") {
            date.setDate(date.getDate() + addDate);
        }
        var day = date.getDate();
        var dayString = day > 9 ? day : '0' + day;
        var dtT = dayString + ' ' + month_names[date.getMonth()] + ' ' + date.getFullYear(); //month_names[date.getMonth()] 

        return dtT;
    } catch (e) {
        return '';
    }
}

function FormatDate_IE(dateL) {
    try {
        var dateL = dateL.split(' ');
        var zmonthL = month_names.indexOf(dateL[1].toString()) + 1;
        var monthString = zmonthL > 9 ? zmonthL : '0' + zmonthL;
        var dtT = dateL[2].toString() + '-' + monthString + '-' + dateL[0].toString();
        return dtT;
    } catch (e) {
        return '';
    }
}

//setInterval(function () { heartbeat(); }, 30000);
//function heartbeat() {
//    try {
//        $.ajax({
//            type: 'post',
//            url: $('#hf_KeepAlive').val(),
//            data: null,
//            contentType: 'application/json;charset=utf-8',
//            datatype: 'json',
//            success: function (response) {
//                console.log(response);
//            },
//            error: function (response) {

//            }
//        });
//    } catch (e) {

//    }
//}

function diff_weeks(dt2, dt1) {
    dt2 = new Date(dt2);
    dt1 = new Date(dt1);
    var diff = (dt2.getTime() - dt1.getTime()) / 1000;
    diff /= (60 * 60 * 24 * 7);
    return Math.abs(Math.round(diff));

}

var daysList = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
function GetDayName(aDt) {
    try {
        var adate = new Date(aDt);
        var aval = daysList[adate.getDay()];
        return (typeof aval == 'undefined' ? '' : aval);
    } catch (e) {
        return "";
    }

}

function GetLastMonthDate(adateL) {
    var date = new Date(adateL);
    date.setMonth(date.getMonth() - 1);
    var dtF = date.getDate() + ' ' + month_names[date.getMonth()] + ' ' + date.getFullYear();
    if (GetDayName(dtF) == 'Sunday') {
        date.setMonth(date.getDate() + 1);
        dtF = date.getDate() + ' ' + month_names[date.getMonth()] + ' ' + date.getFullYear();
    }
    else if (GetDayName(dtF) == 'Saturday') {
        date.setMonth(date.getDate() - 1);
        dtF = date.getDate() + ' ' + month_names[date.getMonth()] + ' ' + date.getFullYear();
    }
    return dtF;
}
function getDueDate(aAddDt, adt) {
    var dt = new Date();
    if (typeof adt !== "undefined")
        dt = new Date(adt);
    dt.setDate(dt.getDate() + aAddDt);
    var y = dt.getYear();
    if (y < 1000) y += 1900;
    return dt.getDate() + '-' + month_names[dt.getMonth()] + '-' + dt.getFullYear();
}

function GetLastSegment() {
    var pageURL = window.location.href;
    var lastURLSegment = pageURL.substr(pageURL.lastIndexOf('/') + 1);
    if (lastURLSegment.toLocaleLowerCase() == 'index' || lastURLSegment.toLocaleLowerCase() == 'display') {
        var parts = pageURL.split("/");
        lastURLSegment = parts[parts.length - 2]
    }
    return lastURLSegment;
}
function unique(list) {
    var result = [];
    $.each(list, function (i, e) {
        if ($.inArray(e, result) == -1) result.push(e);
    });
    return result;
}
function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}
function clearForm(form) {
    $(':input', form).each(function () {
        var type = this.type;
        var tag = this.tagName.toLowerCase();
        if (type == 'text' || type == 'password' || tag == 'textarea' || tag == 'email')
            this.value = "";
        //else if (type == 'checkbox' || type == 'radio')
        //    this.checked = false;
        else if (tag == 'select') {
            this.selectedIndex = -1;
            $(this).val(-1).change();
        }
    });

    $('#imgUserLogo').attr('src', "");
};
function DisableCtrl(form, IsEditable) {
    $(':input', form).each(function () {
        if (IsEditable == 1)
            $(this).removeAttr('disabled');
        else
            $(this).attr('disabled', 'disabled');
    });

    //Check PA Comments ICON 
    if (IsEditable == 0)
        $(form).find('i').hide();
    else
        $(form).find('i').show();

    if ($('#hf_UserType').val() != 'Manager') {
        $(form).find('i[data-id]:not(i[data-value])').hide();
    }
    //Check PA Comments ICON 

};
// Table Column Filter Open
function OpenToggle(type, zthis) {
    closeToggle();
    document.getElementById("myDropdown" + type).classList.toggle("show");
    $("#myDropdown" + type + ' select').select2("open");

    $("#myDropdown" + type + ' select').on("select2-closing", function (e) {
        $("#myDropdown" + type + ' select').select2("open");
    });

    $('#myDropdown' + type + ' select > option').prop("selected", true);
}

// Close the dropdown menu if the user clicks outside of it
function closeToggle() {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
            openDropdown.classList.remove('show');
        }
    }
}


function GetTableRowToList(zTableID, aTitle) {
    var getResultList = [];
    $("table#" + zTableID + " tr").each(function () {
        var arrayOfThisRow = [];
        var tableData = $(this).find('td');
        if (tableData.length > 0) {
            tableData.each(function () {
                try {
                    if ($(this).find('select').length > 0) {
                        arrayOfThisRow.push($(this).find('select').val());
                    }
                    else if ($(this).text() == '' && $(this).find('input').length > 0) {
                        if ($(this).find('input')[0].value == 'on')
                            arrayOfThisRow.push($(this).find('input')[0].checked);

                        else {
                            var zActivityNameL = $(this).find('input')[0].value.toString().replace(",", "");
                            arrayOfThisRow.push(zActivityNameL);
                        }
                    }
                    else {
                        if (aTitle != null)
                            arrayOfThisRow.push($(this).text().replace(/,/g, '|'));
                        else
                            arrayOfThisRow.push($(this).text());
                    }
                } catch (e) {
                }

            });
            getResultList.push(arrayOfThisRow);
        }
    });

    return getResultList;
}

function GetIEVersion() {
    var sAgent = window.navigator.userAgent;
    var Idx = sAgent.indexOf("MSIE");

    // If IE, return version number.
    if (Idx > 0)
        return parseInt(sAgent.substring(Idx + 5, sAgent.indexOf(".", Idx)));

    // If IE 11 then look for Updated user agent string.
    else if (!!navigator.userAgent.match(/Trident\/7\./))
        return 11;

    else
        return 0; //It is not IE
}
function bytesToSize(bytes) {
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes == 0) return '0 Byte';
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
}

function validateFileType(file, Size) {
    let f_no = /(\.bat|\.exe|\.dll)$/i;
    var fileUpload = $(file).get(0);
    var files = fileUpload.files;
    for (var i = 0; i < files.length; i++) {
        //if (files[i].size > Size) {
        //    $.bootstrapGrowl('Please upload file less than ' + bytesToSize(Size) + ' ! ', {
        //        type: 'danger',
        //        delay: 8000,
        //    });
        //    return false;
        //}
        let filename = files[i].name.split('\\').pop();
        let ext = filename.substr((filename.lastIndexOf('.') + 1));
        if (f_no.test(filename)) {
            $.bootstrapGrowl("File type not supported.", {
                type: 'danger',
                delay: 2000,
            });
            $(file).val(null);
            return false;
        }
    }
    return true;
}
function GetBrowserName() {
    var ua = navigator.userAgent.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i),
        browser;
    if (navigator.userAgent.match(/Edge/i) || navigator.userAgent.match(/Trident.*rv[ :]*11\./i)) {
        browser = "msie";
    }
    else {
        browser = ua[1].toLowerCase();
    }
    return browser;
}

var sortBy = (function () {
    var toString = Object.prototype.toString,
        // default parser function
        parse = function (x) { return x; },
        // gets the item to be sorted
        getItem = function (x) {
            var isObject = x != null && typeof x === "object";
            var isProp = isObject && this.prop in x;
            return this.parser(isProp ? x[this.prop] : x);
        };

    return function sortby(array, cfg) {
        if (!(array instanceof Array && array.length)) return [];
        if (toString.call(cfg) !== "[object Object]") cfg = {};
        if (typeof cfg.parser !== "function") cfg.parser = parse;
        cfg.desc = !!cfg.desc ? -1 : 1;
        return array.sort(function (a, b) {
            a = getItem.call(cfg, a);
            b = getItem.call(cfg, b);
            return cfg.desc * (a < b ? -1 : +(a > b));
        });
    };
}());
//sortBy(data, {prop: "date",desc: true,parser: (d) => new Date(d) });
function UpdateProfileData() {
    var zResult = true;
    if ($('#txtLoginName').val() == '') {
        $.bootstrapGrowl("Enter Name! ", { type: 'danger', delay: 5000, });
        $('#txtLoginName').focus();
        zResult = false;
    }
    else if ($('#TxtEmailID').val() == '') {
        $.bootstrapGrowl("Enter Email ! ", { type: 'danger', delay: 5000, });
        $('#TxtEmailID').focus();
        zResult = false;
    }

    if (zResult) {
       
        var data = { zName: $('#txtLoginName').val(), zEmail: $('#TxtEmailID').val(), zCompany: $('#TxtCompnayName').val(), zStreet: $('#TxtStreet').val(), zCity: $('#TxtCity').val(), zRegion: $('#TxtRegion').val(), zPostCode: $('#TxtPostCode').val(), zCountry: $('#TxtCountry').val(), zInterest: $('#TxtInterest').val() }
        $.ajax({
            type: 'post',
            url: $('#hf_ProfileInfoUpdate').val(),
            data: data,
            datatype: 'json',
            success: function (response) {
                if (response.toString().indexOf('Error') != -1) {
                    $.bootstrapGrowl(response, {
                        type: 'danger',
                        delay: 2000,
                    });


                }
                else {
                    $.bootstrapGrowl(response, {
                        type: 'info',
                        delay: 2000,
                    });
                   
                }
                $('#LoadingImage').hide();
                
            },
            error: function (response) {
                $.bootstrapGrowl(response, {
                    type: 'danger',
                    delay: 2000,
                });
                $('#LoadingImage').hide();
            }
        });

        $('#myModal_ViewProfile').modal('hide');
    }
}

function showProfile() {
    $.ajax({
        type: 'post',
        url: $('#hf_GetUserProfile').val(),
        datatype: 'json',
        success: function (response) {

            var aUserDetails = response.aItemList;
            $('#txtLoginName').val(isNullCheck(aUserDetails.Name));
            $('#TxtEmailID').val(isNullCheck(aUserDetails.Email));
            $('#TxtCompnayName').val(isNullCheck(aUserDetails.CompanyName));
            $('#TxtStreet').val(isNullCheck(aUserDetails.StreetName));
            $('#TxtCity').val(isNullCheck(aUserDetails.CityName));
            $('#TxtRegion').val(isNullCheck(aUserDetails.RegionName));
            $('#TxtPostCode').val(isNullCheck(aUserDetails.PostCode));
            $('#TxtCountry').val(isNullCheck(aUserDetails.Country));
            $('#TxtInterest').val(isNullCheck(aUserDetails.CEInterestArea));
            $('#LoadingImage').hide();
        },
        error: function (response) {
            $('#LoadingImage').hide();
        }
    });
    $('#myModal_ViewProfile').modal();
}