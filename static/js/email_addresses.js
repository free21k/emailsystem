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
            "url": "/api/email_addresses",
            "type": "GET",
            "data": function(d) {
                d.group = $('#group').val()
            },
            beforeSend: function() {loadingStart()},
            complete: function() {loadingStop()}
        },
        "columns": [
            { "data": "email_address" },
            { "data": "is_deny" }
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

function registerEmailAddress() {
    if($('#email').val() == '') {
        alert("아이디 정보를 입력해 주세요.");
        $('#email').focus();
        return false;
    }

    $.ajax({
        url : 'api/email_addresses',
        type : 'post',
        data : "email_address="+$('#email').val(),
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
    $('#registerEmailAddress').click(function() {
        registerEmailAddress();
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