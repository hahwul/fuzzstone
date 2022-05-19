/*
 * @author HAHWUL (@hahwul)
*/
// 로그인 처리에 사용할 객체/유틸 로드
var HttpRequestHeader = Java.type("org.parosproxy.paros.network.HttpRequestHeader");
var HttpHeader = Java.type("org.parosproxy.paros.network.HttpHeader");
var URI = Java.type("org.apache.commons.httpclient.URI");
var Pattern = Java.type("java.util.regex.Pattern");

var debugMode = false;

// 필수 파라미터 처리
function getRequiredParamsNames(){
    return ["loginUrl"];
}

// 옵션 파라미터 처리
function getOptionalParamsNames(){
    return ["extraPostData"];
}

// Users에서 받을 계정/패스워드 정보 매핑을 위한 처리
function getCredentialsParamsNames(){
    return ["username", "password"];
}

// 실제 인증 함수
function authenticate(helper, paramsValues, credentials) {
    debugMode && print("---- Starbucks authentication script has started ----");

		// 사용자로 부터 받은 Uri를 사용해도 되지만 고정 값이라면 그냥 전달하는 것도 방법 중 하나
    // 깔끔한 Referer 처리를 위해 로그인 페이지에 한번 붙어줍니다.
    var loginUri = new URI("https://www.starbucks.co.kr/login/login.do", false);
    var get = helper.prepareMessage();
    get.setRequestHeader(new HttpRequestHeader(HttpRequestHeader.GET, loginUri, HttpHeader.HTTP10));
    helper.sendAndReceive(get);

    // 이후 실제 로그인 요청을 위한 form 을 구성해줍니다.
    // credentials에서 Users에서 받은 파라미터 값을 얻어올 수 있어요.
    var requestBody = "user_id=" + encodeURIComponent(credentials.getParam("username"));
    requestBody += "&user_pwd=" + encodeURIComponent(credentials.getParam("password"));
    requestBody += "&captcha=";

    debugMode && print("POST request body built for the authentication:\n  " + requestBody.replaceAll("&", "\n  "));

    // POST Method로 로그인 요청을 전송합니다.
    var post = helper.prepareMessage();
    post.setRequestHeader(new HttpRequestHeader(HttpRequestHeader.POST, loginUri, HttpHeader.HTTP10));
    post.setRequestBody(requestBody);
    post.getRequestHeader().setContentLength(post.getRequestBody().length());
    helper.sendAndReceive(post);

    debugMode && print("---- Starbucks authentication script has finished ----\n");

    // Request 전송에 사용한 객체를 반환합니다. (이는 정상 로그인 식별 여부를 Authentication에서 체크하기 위해)
    return post;
}
