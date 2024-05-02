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
        url: $('#hf_GetVesselData').val(),
        datatype: 'json',
        success: function (response) {
            FetchData(response.aVesselList);
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
        $('#tblVessel').DataTable({
            dom: 'lBfrtip',
            "pageLength": -1,
            "lengthMenu": [[10, 25, 50, 75, 100, -1], [10, 25, 50, 75, 100, "All"]],
            data: dataSet,
            columns: [
                { title: "S.No" },
                { title: "Name" },
                
                {
                    title: "<center>Actions</center>", "bSortable": false, "render": function (data, type, full, meta) {
                        return '' +
                            '<i class="fa fa-trash" aria- title="Delete" onclick=DeleteVesselDetails(' + isNullCheck(data) + ');></i >' +
                            '<i class="fa fa-pencil" aria- title="Edit" data-col="Name" onclick="GoToVesselDetails(' + isNullCheck(data) + ');"></i>' +
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
                    filename: 'Vessel',
                    title: 'Vessel List',
                    exportOptions: {
                        columns: [0, 1],
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
                    filename: 'Vessel',
                    title: 'Vessel List',
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

                        GoToVesselDetails(0);
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


function DeleteVesselDetails(aitem) {

    bootbox.confirm("Are you sure to delete the Vessel?",
        function (result) {
            if (result) {
                var data = { aVesselID: aitem };
                $.ajax({
                    type: 'post',
                    url: $('#hf_VesselInfoDelete').val(),
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
    

}
function GoToVesselDetails(item) {
    ClearForm();
    aID = item;
    if (aID != 0) {

        var data = { zVesselID: aID }
        $.ajax({
            type: 'post',
            url: $('#hf_GetVesselDetails').val(),
            data: data,
            datatype: 'json',
            success: function (response) {
                var items = response.aItemList;
                $('#txtName').val(isNullCheck(items.Name));
                

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

function UpdateVesselData() {
    var zResult = true;

    if ($('#txtName').val() == '') {
        $.bootstrapGrowl("Enter Name! ", { type: 'danger', delay: 5000, });
        $('#txtName').focus();
        zResult = false;
    }

    if (zResult) {

        var aitemInfoP = {
            ID: aID,
            Name: $('#txtName').val()
            
        }

        var data = { aobjP: aitemInfoP }

        $.ajax({
            type: 'post',
            url: $('#hf_UpdateVesselDetails').val(),
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

