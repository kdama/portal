$("th:contains('[')")[0].innerHTML.match(/\[(.+),(.+)\]/);
var qu1 = RegExp.$1 + RegExp.$2;
$("th:contains('[')")[1].innerHTML.match(/\[(.+),(.+)\]/);
var qu2 = RegExp.$1 + RegExp.$2;
$("th:contains('[')")[2].innerHTML.match(/\[(.+),(.+)\]/);
var qu3 = RegExp.$1 + RegExp.$2;

if ((qu1+qu2+qu3).length == 6) {
	chrome.extension.sendRequest({
		q1: qu1,
		q2: qu2,
		q3: qu3,
	}, function(response){
		if (response.mode == 'mode_auto_complete' || response.mode == 'mode_auto_complete_login') {
			$("[name=message3]")[0].value = response.a1;
			$("[name=message4]")[0].value = response.a2;
			$("[name=message5]")[0].value = response.a3;
			if (response.mode == 'mode_auto_complete_login') {
				$("[name=OK]")[0].value = '1 秒後にログインします...';
				setTimeout(function(){
					$("[name=OK]")[0].click();
				},1000);
			}
			else {
				$("[name=OK]")[0].focus();
			}
		}
	});
}
else {
	console.log("regexp error")
}