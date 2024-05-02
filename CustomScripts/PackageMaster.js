var dataSet = [];
var aID = 0;
$(function () {
    $('#btnUpdate').click(function () {
        UpdatePackageData();
    });
    CallData();
});
function CallData() {
    $('#LoadingImage').show();
    $.ajax({
        type: 'post',
        url: $('#hf_GetPackageData').val(),
        datatype: 'json',
        success: function (response) {
            FetchData(response.aPackageList);
            $('#LoadingImage').hide();
        },
        error: function (result) {
            $.bootstrapGrowl('Error Occured, Try Again', {
                type: 'danger',
                delay: 2000
            });
            $('#LoadingImage').hide();
        }
    });
}

function FetchData(itemsList) {
    try {

        dataSet = [];
        var items = itemsList;
        var zCtInP = 0;
        var zCtCom = 0;

        $.each(items,
            function (index) {
                var zindexL = 0;
                zCtInP += 1;
                zindexL = zCtInP;
                var ceData = [
                    zindexL.toString(),
                    $(this)[0]["PackageType"],
                    $(this)[0]["ShortCode"],
                    $(this)[0]["ID"]
                ];
                dataSet.push(ceData);
            });

        LoadData();
    }
    catch (e) {
        $('#LoadingImage').hide();
    }
}

function LoadData() {

    try {
        $('#tblPackage').DataTable({
            dom: 'lBfrtip',
            "pageLength": -1,
            "lengthMenu": [[10, 25, 50, 75, 100, -1], [10, 25, 50, 75, 100, "All"]],
            data: dataSet,
            columns: [
                { title: "S.No" },
                { title: "Type" },
                { title: "Short Code" },
                {
                    title: "<center>Actions</center>", "bSortable": false, "render": function (data, type, full, meta) {
                        return '' +
                            '<i class="fa fa-trash" aria- title="Delete" onclick=DeletePackageDetails(' + isNullCheck(data) + ');></i >' +
                            '<i class="fa fa-pencil" aria- title="Withdrawn" data-col="Name" onclick="GoToPackageDetails(' + isNullCheck(data) + ');"></i>' +
                            '';
                    }
                }
            ],

            "destroy": true,
            fixedHeader: {
                header: true
            },
            buttons: [
                {
                    extend: 'excelHtml5',
                    text: '<img src="../Images/excel.png" title="Export to Excel" />',
                    filename: 'Package',
                    title: 'Package List',
                    exportOptions: {
                        columns: [0, 1, 2],
                        format: {
                            header: function (data, row, column, node) {
                                var zheader = data.toString().split('<div class="dropdown')[0];
                                zheader = zheader.toString().split('<i class="fa fa-filter')[0];
                                return zheader.replace('<br>', '');
                            }
                        }
                    }
                },
                {
                    extend: 'pdfHtml5',
                    text: '<img src="../Images/pdf.png" title="Export to PDF" />',
                    filename: 'Package',
                    title: 'Package List',
                    orientation: 'landscape',
                    pageSize: 'LEGAL',
                    exportOptions: {
                        columns: [0, 1, 2],
                        format: {
                            header: function (data, row, column, node) {
                                var zheader = data.toString().split('<div class="dropdown')[0];
                                zheader = zheader.toString().split('<i class="fa fa-filter')[0];
                                return zheader.replace('<br>', '');
                            },
                        }
                    }
                },
                {
                    text: '<button class="btn btn-success notika-btn-success">Add</button>',
                    action: function (e, dt, node, config) {

                        GoToPackageDetails(0);
                    }

                }
            ],
            "scrollY": (size.height - 282),
            "scrollX": true

        });

    } catch (e) {
        $('#LoadingImage').hide();
        alert(e.message);
    }


}


function DeletePackageDetails(aitem) {

    bootbox.confirm("Are you sure to delete the Package?",
        function (result) {
            if (result) {
                var data = { aPackageID: aitem };
                $.ajax({
                    type: 'post',
                    url: $('#hf_PackageInfoDelete').val(),
                    data: data,
                    datatype: 'json',
                    success: function (response) {
                        if (response.toString().indexOf('Error') != -1) {
                            $.bootstrapGrowl(response,
                                {
                                    type: 'danger',
                                    delay: 2000,
                                });

                            CallData();

                        } else {
                            $.bootstrapGrowl(response,
                                {
                                    type: 'info',
                                    delay: 2000,
                                });
                            ClearForm();
                            CallData();
                        }
                        $('#LoadingImage').hide();


                    },
                    error: function (response) {
                        $.bootstrapGrowl(response,
                            {
                                type: 'danger',
                                delay: 2000,
                            });
                        CallData();
                        $('#LoadingImage').hide();
                    }
                });
            }
        });
}

function ClearForm() {
    $('#txtType').val('');
    $('#txtCode').val('');
    
}
function GoToPackageDetails(item) {
    ClearForm();
    aID = item;
    if (aID != 0) {

        var data = { zPackageID: aID }
        $.ajax({
            type: 'post',
            url: $('#hf_GetPackageDetails').val(),
            data: data,
            datatype: 'json',
            success: function (response) {
                var items = response.aItemList;
                $('#txtType').val(isNullCheck(items.PackageType));
                $('#txtCode').val(isNullCheck(items.ShortCode));
                
            },
            error: function (response) {
                $.bootstrapGrowl(response,
                    {
                        type: 'danger',
                        delay: 2000,
                    });
            }
        });
    }
    $("#myModalone").modal('show');

}

function UpdatePackageData() {
    
    return false;
    var zResult = true;

    if ($('#txtType').val() == '') {
        $.bootstrapGrowl("Enter Type! ", { type: 'danger', delay: 5000, });
        $('#txtType').focus();
        zResult = false;
    }
   
    if (zResult) {

        var aitemInfoP = {
            ID: aID,
            PackageType: $('#txtType').val(),
            ShortCode: $('#txtCode').val()
        }

        var data = { aobjP: aitemInfoP }

        $.ajax({
            type: 'post',
            url: $('#hf_UpdatePackageDetails').val(),
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
                    CallData();


                }
            },
            error: function (response) {
                $.bootstrapGrowl(response, {
                    type: 'danger',
                    delay: 2000,
                });
            }
        });
        $('.close').trigger('click');
    }

}

