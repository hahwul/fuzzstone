// https://www.hahwul.com/2021/09/11/zap-fuzzer-and-scripting/#random-ip-in-x-forwarded-for

function processMessage(utils, message) {
  // 랜덤으로 IP 포맷의 값을 생성합니다.
	var random_ip = Math.floor(Math.random() * 254)+ "." + Math.floor(Math.random() * 254) + "." + Math.floor(Math.random() * 254) + "." + Math.floor(Math.random() * 254);
	// Fuzzing의 Request가 전송되기 전 X-Forwarded-For 헤더에 추가합니다.
	message.getRequestHeader().setHeader("X-Forwarded-For", random_ip);
}

function processResult(utils, fuzzResult){
	return true;
}

function getRequiredParamsNames(){
	return [];
}

function getOptionalParamsNames(){
	return [];
}
