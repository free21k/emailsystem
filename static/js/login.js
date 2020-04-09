$(document).ready(function(){
    setCookie("token","",-1);
});

function login() {
    if($('#username').val() == '') {
        alert("아이디 정보를 입력해 주세요.");
        $('#username').focus();
        return false;
    }
    
    if($('#pwd').val() == '') {
        alert("비밀번호 정보를 입력해 주세요.");
        $('#pwd').focus();
        return false;
    }
    $.ajax({
        url : 'api/auth/login/',
        type : 'post',
        data : "username="+$('#username').val()+"&password="+$('#pwd').val(),
        success : function(data, textStatus, xhr) {
            if (xhr.status == "200") {
                eraseCookie("token");
                setCookie("token", data.token);
                location.href = 'email_addresses';
            } else {
                alert(data.msg);
            }
        },
        error : function(data, textStatus, xhr) {
            if(xhr.status == 400) {
                alert("관리자 계정 정보를 다시 확인해 주세요.");
            } else {
                alert("알수 없는 에러 입니다. 관리자에게 확인 부탁드립니다. (" + xhr.status+ ")");
            }
        }
    });
}

$(function(){
    $('#loginBtn').click(function(){
        login();
    });

    $("#pwd").keyup(
        function(e){
            if(e.keyCode == 13) {
                login(); 
            }
        }
    );
});

