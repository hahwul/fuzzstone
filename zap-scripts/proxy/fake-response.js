var patternUrl = "https://www.hahwul.com/zzz"
var resHeaders = "HTTP/1.1 200 OK\r\nContent-Type: application/json; charset=UTF-8"
var resBody = '{"msg":"success"}'

function proxyRequest(msg) {
	if (msg.getRequestHeader().getURI().toString().equals(patternUrl)) {

		print('[*] set fake response to ' + msg.getRequestHeader().getURI().toString())

		msg.setResponseBody(resBody);
		msg.setResponseHeader(resHeaders);
		msg.getResponseHeader().setContentLength(msg.getResponseBody().length());
	}
	return true
}

function proxyResponse(msg) {
	return true
}
