/**
 * load progress
 */
function loadProgress() {
	$('.data-process').show();
}

/**
 * unload progress
 */
function unloadProgress() {
	$('.data-process').delay(500).hide(0);
}

/**
 * is empty
 * @param value
 * @returns {Boolean}
 */
function isEmpty(value) {
	if (value == null || value == "") {
		return true;
	} else {
		return false;
	}
}

/**
 * is blank
 * @param value
 * @returns {Boolean}
 */
function isBlank(value) {
	if (isEmpty(value) && value.trim() == "") {
		return true;
	} else {
		return false;
	}
}

function isTel(value) {
	var pattern = /^(01[016789]{1}|02|0[3-9]{1}[0-9]{1})-?([0-9]{3,4})-?([0-9]{4})$/;
	return pattern.test(value);
}

/**
 * is int
 * @param value
 */
function isInt(value) {
	var pattern = /^\d+$/;
	return pattern.test(value);
}

/**
 * is date
 * @param value
 */
function isDate(value) {
	var pattern1 = /^\d{8}$/;
	var pattern2 = /^\d{4}\-\d{2}\-\d{2}$/;
	return pattern1.test(value) || pattern2.test(value);
}

/**
 * is phone
 * @param value
 */
function isPhone(value) {
	var pattern1 = /^\d{9,}$/;
	var pattern2 = /^\d{2,3}\-\d{3,4}\-\d{4}$/;
	return pattern1.test(value) || pattern2.test(value);
	
}

/**
 * is email
 * @param value
 * @returns
 */
function isEmail(value) {
	var pattern = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	return pattern.test(value);
}

function isDigit(value) {
	var pattern = /^\d+$/;
	return pattern.test(value);
}

function isDecimal(value) {
	var pattern = /^[0-9]+([\.]{1}[0-9]+){0,1}$/;
	return pattern.test(value);
}

function isCrn(bisNo){
	// 넘어온 값의 정수만 추츨하여 문자열의 배열로 만들고 10자리 숫자인지 확인합니다.
	if ((bisNo = (bisNo+'').match(/\d{1}/g)).length != 10) { return false; }
	// 합 / 체크키
	var sum = 0, key = [1, 3, 7, 1, 3, 7, 1, 3, 5];
	// 0 ~ 8 까지 9개의 숫자를 체크키와 곱하여 합에더합니다.
	for (var i = 0 ; i < 9 ; i++) { sum += (key[i] * Number(bisNo[i])); }
	// 각 8번배열의 값을 곱한 후 10으로 나누고 내림하여 기존 합에 더합니다.
	// 다시 10의 나머지를 구한후 그 값을 10에서 빼면 이것이 검증번호 이며 기존 검증번호와 비교하면됩니다.
	return (10 - ((sum + Math.floor(key[8] * Number(bisNo[8]) / 10)) % 10)) == Number(bisNo[9]);
}

/**
 * date format
 * @param input_id
 * @param delimiter
 */
function dateformat(input_id, delimiter) {
	var dateValue = $("#"+input_id).val().replace(/-/g, "");
	if (dateValue.length > 6) {
		dateValue = dateValue.substring(0, 4) + delimiter + dateValue.substring(4, 6) + delimiter + dateValue.substring(6);
	} else if(dateValue.length > 4) {
		dateValue = dateValue.substring(0, 4) + delimiter + dateValue.substring(4);
	}
	$("#"+input_id).val(dateValue);
}

/**
 * date to string
 * @param date
 * @param delimiter
 * @returns
 */
function dateToStr(date, delimiter) {
	var month = date.getMonth() + 1;
	var day = date.getDate();
	return (date.getFullYear() + delimiter + ((month < 10) ? "0" : "") + month + delimiter + ((day < 10) ? "0" : "") + day);
}

/**
 * date to string
 * @param date
 * @param delimiter
 * @returns
 */
function dateToStrDetail(date, delimiter) {
	var month = date.getMonth() + 1;
	var day = date.getDate();
	var hours = date.getHours();
	var minutes = date.getMinutes();
	var seconds = date.getSeconds();
	month = ((month < 10) ? "0" : "") + month;
	day = ((day < 10) ? "0" : "") + day;
	hours = ((hours < 10) ? "0" : "") + hours;
	minutes = ((minutes < 10) ? "0" : "") + minutes;
	seconds = ((seconds < 10) ? "0" : "") + seconds;
	return date.getFullYear() + delimiter + month + delimiter + day + " " + hours + ":" + minutes + ":" + seconds;
}

/**
 * string to date
 * @param str
 */
function strToDate(str) {
	if (isDate(str)) {
		str = str.replace(/-/g, "");
	 	var year = parseInt(str.substring(0, 4), 10);
	 	var month = parseInt(str.substring(4, 6), 10) - 1;
		var day = parseInt(str.substring(6, 8), 10);
		return new Date(year, month, day);
	} else {
		return null;
	}
}

/**
 * validate alert
 * @param msg
 * @param focusId
 */
function validateAlert(msg, focusId) {
	alert(msg);
	if (focusId != "") {
		$("#"+focusId).focus();
	}
}

/**
 * validate alert (btn enable)
 * @param msg
 * @param focusId
 * @param btnId
 */
function validateAlertBtn(msg, focusId, btnId) {
	alert(msg);
	if (focusId != "") {
		$("#"+focusId).focus();
	}
	$("#"+btnId).prop("disabled", false);
}


/**
 * id validate check
 * @param id
 * @returns
*/
function idValidateCheck(id){
	var regExp = /^[a-z0-9]{4,24}$/gi;
	var pattern = new RegExp(regExp);
	return !pattern.test(id);
}

/**
 * pwd validate check
 * @param pwd
 * @returns
 */
function pwdValidateCheck(pwd) {
	var count = 0;
	
	var regSpec = /['~!@#$%^&*()_+|\\\'\"\/?\[\]\{\}\:\;\,\.\<\>\-\=\`]/gi;
	var regAlpha = /[a-z]/gi;    
	var regNum = /[0-9]/g;
	if(pwd.length < 10){
		return false;
	}
	if(pwd.search(/\s/g) != -1){
		return false;
	}
	if(regSpec.test(pwd)) {
		count++;
	}
	if(regAlpha.test(pwd)) {
		count++;
	}
	if(regNum.test(pwd)) {
		count++;
	}
	if (count < 2) {
		return false;
	} else {
		return true;
	}
}

/**
 * password validate level
 * @param pwd
 * @returns
 */
function pwdValidateLevel(pwd) {
	var level = 0;
	
	var regSpec = /['~!@#$%^&*()_+|\\\'\"\/?\[\]\{\}\:\;\,\.\<\>\-\=\`]/gi;
	var regAlpha = /[a-z]/gi;    
	var regNum = /[0-9]/g;
	
	if(pwd.length >= 10) {
		level++;
	}
	if(regSpec.test(pwd)) {
		level++;
	}
	if(regAlpha.test(pwd)) {
		level++;
	}
	if(regNum.test(pwd)) {
		level++;
	}
	return level;
}

/**
 * get context path
 * @returns {String}
 */
function getContextPath() {
	var contextPath = "";
	var scriptList = $("script");
	for (var i=0; i<scriptList.length; i++) {
		if (scriptList[i].src.match("/resources/js/common.js")) {
			var hostname = "";
			if (document.location.origin) {
				hostname = document.location.origin;
			} else {
				hostname = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port: '');
			}
			contextPath = scriptList[i].src.replace(hostname, "").replace("/resources/js/common.js", "");
		}
	}
	return contextPath;
}

function getInternetExplorerVersion() {    
    var rv = -1; // Return value assumes failure.    
    if (navigator.appName == 'Microsoft Internet Explorer') {        
         var ua = navigator.userAgent;        
         var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");        
         if (re.exec(ua) != null)            
             rv = parseFloat(RegExp.$1);    
    } else {
    	rv = 11;
    }    
    return rv; 
} 

/*
 *  釉뚮씪?곗????대쫫
 */
function getBrowserInfo(){
	var agent = navigator.userAgent.toLowerCase();
	var name = navigator.appName;
	var browser;
 
    // MS 怨꾩뿴 釉뚮씪?곗?瑜?援щ텇?섍린 ?꾪븿.
    if(name === 'Microsoft Internet Explorer' || agent.indexOf('trident') > -1 || agent.indexOf('edge/') > -1) {
        browser = 'ie';
        if(name === 'Microsoft Internet Explorer') { // IE old version (IE 10 or Lower)
            agent = /msie ([0-9]{1,}[\.0-9]{0,})/.exec(agent);
            browser += parseInt(agent[1]);
        } else { // IE 11+
            if(agent.indexOf('trident') > -1) { // IE 11 
                browser += 11;
            } else if(agent.indexOf('edge/') > -1) { // Edge
                browser = 'edge';
            }
        }
    } else if(agent.indexOf('safari') > -1) { // Chrome or Safari
        if(agent.indexOf('opr') > -1) { // Opera
            browser = 'opera';
        } else if(agent.indexOf('chrome') > -1) { // Chrome
            browser = 'chrome';
        } else { // Safari
            browser = 'safari';
        }
    } else if(agent.indexOf('firefox') > -1) { // Firefox
        browser = 'firefox';
    }
    return browser;
}

/**
 * post to url
 * @param action
 * @param params
 */
function post_to_url(action, params) {
	var form = document.createElement("form");
	form.method = "post";
	form.action = action;
	
	for (var key in params) {
		var hiddenField = document.createElement("input");
		hiddenField.type = "hidden";
		hiddenField.name = key;
		hiddenField.value = params[key];
		
		form.appendChild(hiddenField);
	}
	
	document.body.appendChild(form);
	form.submit();
}

function formSerialize($frm, chknameArray) {
	var subquery = "";
	$.each(chknameArray, function(idx, chkname) {
		subquery += "&" + chkname + "Chk=";
		$chk = $frm.find("input:checkbox[name="+chkname+"]:checked");
		$chk.each(function(_idx) {
			if (_idx > 0) subquery += ",";
			subquery += $(this).val();
		});
	});
	return $frm.serialize() + subquery;
}

function insertComma(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function toFix(i) {
	return i.toFixed(2);
}
function checkPasswordPattern(value) {
	var pattern = /^(?=.*[a-zA-Z])(?=.*[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"])(?=.*[0-9]).{8,32}$/;
	return pattern.test(value);
}

function isNullCheck(_id, _name) {
	if ( typeof($('#'+_id).val()) == 'undefined' || $('#'+_id).val().trim() == '' ) {
		$('#'+_id).focus();
		alert(_name + " 항목을 입력해 주세요.");
		return false;
	} 
	return true;
}

function ajax(method, url, formData, callbackFun){
	$.ajax({
		url:url,
		type:method,
		data:formData,
		async:true,
		success:function(result){
			loadingStop();
			callbackFun(result);
		},
		error:function(xhr,status,error) {
			loadingStop();
			if (error.status == 400) {
				alert("세션이 만료되었습니다.\n로그인 후 이용해주시기 바랍니다.");
				location.href = "${ADMIN}/login";
			} else {
				alert(xhr.responseJSON.msg);
			}
		},
		beforeSend: function() {
			loadingStart();
		},
		complete: function() {
			loadingStop();
		}
	});
}

function ajaxP(url, formData, callbackFun) {
	return ajax("POST", url, formData, callbackFun);
};

function ajaxG(url, callbackFun) {
	return ajax("GET", url, null, callbackFun);
};

function hashPassword(pw) {
	var hashedPw = CryptoJS.SHA512(pw).toString();
	return hashedPw;
}

var setCookie = function(name, value, exp) {
    var date = new Date();
    date.setTime(date.getTime() + exp*24*60*60*1000);
    document.cookie = name + '=' + value + ';expires=' + date.toUTCString() + ';path=/';
};

var getCookie = function(name) {
    var value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return value? value[2] : null;
};
function eraseCookie(name) {   
    document.cookie = name+'=; Max-Age=-99999999;';
}



/* Korean */
var KOREAN_PATTERN = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
/* IP address */
var IP_ADDR_PATTERN = /^(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9]?)\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9]?)\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9]?)\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9]?)$/;
