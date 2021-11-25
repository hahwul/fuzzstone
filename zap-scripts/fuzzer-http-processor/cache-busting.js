// https://www.hahwul.com/2021/09/11/zap-fuzzer-and-scripting/#fuzz-with-cache-busting

function processMessage(utils, message) {
	var cbValue = Math.floor(Math.random() * 254)
	var urlParams = message.getUrlParams();
     var updatedUrlParams = modifyParams(urlParams,cbValue);
     message.setGetParams(updatedUrlParams);
}

function modifyParams(params,cbValue) {
    var iterator = params.iterator();
    while(iterator.hasNext()) {
        var param = iterator.next();
        // Check if the url parameters has the antiCsrfTokenName in it.
        if (param.getName().equals("cachebusting")) {
		param.setValue(cbValue)
        }
    }
    return params;
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
