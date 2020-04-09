$(document).ready(function(){
	
	/* 셀렉트 이벤트 */
	$(document).on("change", ".select-change", function(){ // 2017. 07. 26 수정 
		selectChange(this);
	});

	/* 파일업로드 대체 버튼 over 효과 */
	$(document).on('mouseenter', '.button-hidden', function(){
		$(this).prev().addClass('hover');
	});
	$(document).on('mouseleave', '.button-hidden', function(){
		$(this).prev().removeClass('hover');
	});

});

/* ie9이하 체크 */
function isIE() {
	var ua = navigator.userAgent.toLowerCase();
	return (ua.indexOf('msie') != -1) ? parseInt(ua.split('msie')[1]) : 11; // ie10까지 : ie11 & 기타 브라우저
}

var isIeVersion = isIE();

/* 이미지 미리보기 따로 철저한 확장자 체크는 하지 않음... */
function previewImage(t, previewId) {
	var preview = document.getElementById(previewId); //div id   

	if(isIeVersion < 10){//ie9 이하일때
		t.select();
		var src = document.selection.createRange().text; // get file full path 
		preview.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + src + "', sizingMethod='scale')"; //이미지 로딩, sizingMethod는 div에 맞춰서 사이즈를 자동조절 하는 역할
	}else{ //ie가 아니거나, 10이상
		var files = t.files;
		var file = files[0];
		var prevImg = document.getElementById("prev_" + previewId); //이전에 미리보기가 있다면 삭제
			
		if(prevImg){
			preview.removeChild(prevImg);
		}

		var img = document.createElement("img"); //크롬은 div에 이미지가 뿌려지지 않는다. 그래서 자식Element를 만든다.
		img.id = "prev_" + previewId;
		img.file = file;
		
		preview.appendChild(img);

		if(window.FileReader){ // FireFox, Chrome, Opera 확인.
			var reader = new FileReader();
			reader.onloadend = (function(aImg) {
				return function(e) {
					aImg.src = e.target.result;
				};
			})(img);
			reader.readAsDataURL(file);
		}else{ // safari is not supported FileReader
			if (!document.getElementById("sfr_preview_error_" + previewId)) {
				var info = document.createElement("p");
				info.id = "sfr_preview_error_" + previewId;
				info.innerHTML = "not supported FileReader";
				preview.insertBefore(info, null);
			}
		}
	}

	preview.style.width = "400px";
	preview.style.height = "100px";
}

/* ie9-- input file reset */
function resetFileForm(elFileForm) { 
	var orgParent = elFileForm.parentNode;
	var orgNext = elFileForm.nextSibling;
	var tmp = document.createElement('form');
	tmp.appendChild(elFileForm);
	tmp.reset();
	orgParent.insertBefore(elFileForm, orgNext);
}

/* 이미지 미리보기 제거 */
function deletePreviewImage(previewId){
	var img = document.getElementById(previewId);
    if(isIeVersion < 10){//ie9 이하일때
		img.style.filter = "none";
	}else{ //ie가 아니거나, 10이상
		$(img).find('img').remove();
	}

	img.style.width = "0px";
	img.style.height = "0px";
	img.style.marginBottom = "0px";
}

/* 파일등록 */
function fileNameAdd(t, previewId) {
	var fileValue = $(t).val();
	var fileValueArr = fileValue.split("\\");
	var fileName = fileValueArr[fileValueArr.length -1];
	var addFile = '';

	if(fileValue){
		if(previewId){
			addFile = '<div class="add-text img-preview" data-preview-id="'+previewId+'"><span class="file-name">'+fileName+'</span><button type="button" class="del-file blind" onclick="javascript:delFile(this);">파일삭제</button></div>';
			previewImage(t, previewId);
		}else{
			addFile = '<div class="add-text"><span class="file-name">'+fileName+'</span><button type="button" class="del-file blind" onclick="javascript:delFile(this);">파일삭제</button></div>';
		}
		$(t).parent().siblings('.not-flie').hide();
	}else{
		if(previewId){
			deletePreviewImage(previewId);
		}
		$(t).parent().siblings('.not-flie').show();
	}

	$(t).parent().siblings('.add-file').html(addFile);
}

/* 파일삭제 */
function delFile(obj) {
	var $this = $(obj);
	var preview = $this.parent().attr("data-preview-id");
	var $input = $this.closest('.add-file').prev().find("input[type='file']");

	if($this.parent().hasClass("img-preview")){
		deletePreviewImage(preview);
	}
	if(isIeVersion < 11){
		resetFileForm($input[0]);
	}
	$input.val("");
	$this.closest('.add-file').next().show();
	$this.parent().remove();
}

/* Select Change */
function selectChange(t){
	var selectName = $(t).children("option:selected").text();
	$(t).siblings(".select-arrow").text(selectName);
}

/* 이메일 셀렉트 */
function setEmail(t){
	var emailVal = $(t).val();
	var target = $(t).parent().prev().find(".form-input");
	if(emailVal == ""){
		target.prop("readonly", false);
		target.val("");
		target.focus();
	}else if(emailVal == "-1"){
		target.prop("readonly", true);
		target.val("");
	}else{
		target.prop("readonly", true);
		target.val(emailVal);
	}
	selectChange(t);
}

/* 팝업 오픈 */
function openPopup(t){
	var thisId = $(t).attr('data-id');
	if(thisId != ''){
		$('body').addClass('pop-over-hidden');
		$('.back-bg').show();
		$('#'+thisId).show();
		setTimeout(function() {
			$('.back-bg').addClass('in');
		}, 10); 
		setTimeout(function() {
			$('#'+thisId).addClass('in');
		}, 200);
	}
	return false;
}
/* 팝업닫기 */
function closePopup(){ 
	$('.pop-up').removeClass('in');
	setTimeout(function() {
		$('.back-bg').removeClass('in');
	}, 200);
	setTimeout(function() {
		$('.pop-up').hide();
		$('.back-bg').hide();
		$('body').removeClass('pop-over-hidden');
	}, 300);
}

/* loading - 시작 */
function loadingStart(){ 
	$('.data-process').show();
}

/* loading - 중지 */
function loadingStop(){
	$('.data-process').hide();
}