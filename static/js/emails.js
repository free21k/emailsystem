$(document).ready(function(){
    $dataTableSelect = $(".data-table-actions select");
    $dataTableSelect.on("change", function(){
        var selected = $(this).children('option:selected').val();
        oTable.page.len(selected).draw();
    });
    initDataTable();
});

var oTable;
var $dataTableSelect;

function initDataTable() {
    oTable = $('.data-table').DataTable({
        "ajax": {
            "url": "/api/emails",
            "type": "GET",
            "data": function(d) {
                d.group = $('#group').val()
            },
            beforeSend: function() {loadingStart()},
            complete: function() {loadingStop()}
        },
        "columns": [
            {"data" : "subject"},
            {"data" : "total"},
            {"data" : "complete"},
            {"data" : "write_date"},
            {"data" : "complete_date"}
        ],
    });

    $dataTableSelect.prop("disabled", false);
}

function rebindDataTable() {
    oTable.ajax.reload();
}

// 검색 클릭 전 initDataTable, 클릭 후 rebindDataTable
function displayDataTable() {
    if(oTable === undefined) {
        initDataTable();
    } else{
        rebindDataTable();
    }
}
function registerEmail() {
    if($('#subject').val() == '') {
        alert("제목을 입력해 주세요.");
        $('#subject').focus();
        return false;
    }

    if($('#body').val() == '') {
        alert("내용을 입력해 주세요.");
        $('#body').focus();
        return false;
    }

    $.ajax({
        url : 'api/emails',
        type : 'post',
        data : "subject="+$('#subject').val()+"&contents="+$('#body').val(),
        success : function(data, textStatus, xhr) {
            if (xhr.status == "200") {
                alert('완료');
                location.reload();
            }
        },
        error : function(data, textStatus, xhr) {
            alert("알수 없는 에러 입니다. 관리자에게 확인 부탁드립니다. (" + xhr.status+ ")");
        },
        beforeSend: function() {loadingStart()},
        complete: function() {loadingStop()}
    });
}

$(function(){
    $('#logoutBtn').click(function() {
        logout();
    });
    $('#registerEmail').click(function() {
        registerEmail();
    });
    $('#search').click(function() {
        displayDataTable();
    });
    $("#group").keyup(
        function(e){
            if(e.keyCode == 13) {
                displayDataTable(); 
            }
        }
    );
});