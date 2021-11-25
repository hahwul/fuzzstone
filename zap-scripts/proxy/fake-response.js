var patternUrl = "https://www.hahwul.com/zzz"
var resHeaders = "HTTP/1.1 200 OK\r\nContent-Type: text/html; charset=UTF-8"
var resBody = "<h1>Fake</h1>"

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
