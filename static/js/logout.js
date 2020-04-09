function logout() {
    $.ajax({
        url : '/api/auth/logout/',
        type : 'post',
        success : function(data, textStatus, xhr) {
            if (xhr.status == "200") {
                location.href = '/login';
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