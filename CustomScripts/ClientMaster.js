var dataSet = [];
var aID = 0;
$(function () {
    $('#btnUpdate').click(function () {
        UpdateClientData();
    });
    CallData();
});
function CallData() {
    $('#LoadingImage').show();
    $.ajax({
        type: 'post',
        url: $('#hf_GetClientData').val(),
        datatype: 'json',
        success: function (response) {
            FetchData(response.aClientList);
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
                    $(this)[0]["Name"],
                    $(this)[0]["EmailID"],
                    $(this)[0]["PrimaryMobileNo"],
                   
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
        $('#tblClient').DataTable({
            dom: 'lBfrtip',
            "pageLength": -1,
            "lengthMenu": [[10, 25, 50, 75, 100, -1], [10, 25, 50, 75, 100, "All"]],
            data: dataSet,
            columns: [
                { title: "S.No" },
                { title: "Name" },
                { title: "Email ID" },
                { title: "Mobile No" },
                
                {
                    title: "<center>Actions</center>", "bSortable": false, "render": function (data, type, full, meta) {
                        return '' +
                            '<i class="fa fa-trash" aria- title="Delete" onclick=DeleteClientDetails(' + isNullCheck(data) + ');></i >' +
                            '<i class="fa fa-pencil" aria- title="Withdrawn" data-col="Name" onclick="GoToClientDetails(' + isNullCheck(data) + ');"></i>' +
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
                    filename: 'Withdraw' ,
                    title: 'Article List',
                    exportOptions: {
                        columns: [0, 1, 2, 3],
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
                    filename: 'Withdrawn',
                    title: 'Article List',
                    orientation: 'landscape',
                    pageSize: 'LEGAL',
                    exportOptions: {
                        columns: [0, 1, 2, 3],
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

                        GoToClientDetails(0);
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


function DeleteClientDetails(aitem) {
    
    bootbox.confirm("Are you sure to delete the Client?",
        function (result) {
            if (result) {
                var data = { aClientID: aitem };
                $.ajax({
                    type: 'post',
                    url: $('#hf_ClientInfoDelete').val(),
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
    $('#txtName').val('');
    $('#txtEmail').val('');
    $('#txtAddress').val('');
    $('#txtDistrict').val('');
    $('#txtState').val('');
    $('#txtPincode').val('');
    $('#txtPhoneNo').val('');
    $('#txtAlternatePhoneNo').val('');
    $('#txtAlternateEmailId').val('');
    $('#txtUserName').val('');
    $('#txtPassword').val('');
    $('#txtGST').val('');
}
function GoToClientDetails(item) {
    ClearForm();
    aID = item;
    if (aID != 0) {

        var data = { zClientID: aID }
        $.ajax({
            type: 'post',
            url: $('#hf_GetClientDetails').val(),
            data: data,
            datatype: 'json',
            success: function (response) {
                var items = response.aItemList;
                $('#txtName').val(isNullCheck(items.Name));
                $('#txtEmail').val(isNullCheck(items.EmailID));
                $('#txtAddress').val(isNullCheck(items.Address));
                $('#txtDistrict').val(isNullCheck(items.District));
                $('#txtState').val(isNullCheck(items.State));
                $('#txtPincode').val(isNullCheck(items.Pincode));
                $('#txtPhoneNo').val(isNullCheck(items.PrimaryMobileNo));
                $('#txtAlternatePhoneNo').val(isNullCheck(items.SecondaryMobileNo));
                $('#txtAlternateEmailId').val(isNullCheck(items.SecondaryEmailID));
                $('#txtUserName').val(isNullCheck(items.UserName));
                $('#txtPassword').val(isNullCheck(items.Password));
                $('#txtGST').val(isNullCheck(items.GST));
                                
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

function UpdateClientData() {
    var zResult = true;
    
    if ($('#txtName').val() == '') {
        $.bootstrapGrowl("Enter Name! ", { type: 'danger', delay: 5000, });
        $('#txtName').focus();
        zResult = false;
    }
    else if ($('#txtEmail').val() == '') {
        $.bootstrapGrowl("Enter Email Id! ", { type: 'danger', delay: 5000, });
        $('#txtEmail').focus();
        zResult = false;
    }
    else if ($('#txtAddress').val() == '') {
        $.bootstrapGrowl("Enter Address! ", { type: 'danger', delay: 5000, });
        $('#txtAddress').focus();
        zResult = false;
    }
    else if ($('#txtDistrict').val() == '') {
        $.bootstrapGrowl("Enter District! ", { type: 'danger', delay: 5000, });
        $('#txtDistrict').focus();
        zResult = false;
    }
    else if ($('#txtState').val() == '') {
        $.bootstrapGrowl("Enter State! ", { type: 'danger', delay: 5000, });
        $('#txtState').focus();
        zResult = false;
    }
    else if ($('#txtPincode').val() == '') {
        $.bootstrapGrowl("Enter Pincode! ", { type: 'danger', delay: 5000, });
        $('#txtPincode').focus();
        zResult = false;
    }
    else if ($('#txtPhoneNo').val() == '') {
        $.bootstrapGrowl("Enter Phone No! ", { type: 'danger', delay: 5000, });
        $('#txtPhoneNo').focus();
        zResult = false;
    }
    else if ($('#txtUserName').val() == '') {
        $.bootstrapGrowl("Enter User Name! ", { type: 'danger', delay: 5000, });
        $('#txtUserName').focus();
        zResult = false;
    }
    else if ($('#txtPassword').val() == '') {
        $.bootstrapGrowl("Enter Password! ", { type: 'danger', delay: 5000, });
        $('#txtPassword').focus();
        zResult = false;
    }
    
    if (zResult) {

        var aitemInfoP = {
            ID: aID,
            Name:$('#txtName').val(),
            EmailID:$('#txtEmail').val(),
            Address:$('#txtAddress').val(),
            District:$('#txtDistrict').val(),
            State:$('#txtState').val(),
            Pincode:$('#txtPincode').val(),
            PrimaryMobileNo:$('#txtPhoneNo').val(),
            SecondaryMobileNo:$('#txtAlternatePhoneNo').val(),
            SecondaryEmailID:$('#txtAlternateEmailId').val(),
            UserName:$('#txtUserName').val(),
            Password:$('#txtPassword').val(),
            GST: $('#txtGST').val()
        }

        var data = { aobjP: aitemInfoP }

        $.ajax({
            type: 'post',
            url: $('#hf_UpdateClientDetails').val(),
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
        $('#myModal_View').modal('hide');
    }

}

