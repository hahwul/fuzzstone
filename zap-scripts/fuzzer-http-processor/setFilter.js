function getRequiredParamsNames(){
	return [];
}

function getOptionalParamsNames(){
	return ["statusCode","regex"];
}

function processMessage(utils, message) {
	// Take no action
}

function processResult(utils, fuzzResult){
	var params = utils.getParameters();
	var fuzzed = fuzzResult.getHttpMessage();

	if(params.regex != "") {
		var matchPattern = new RegExp(params.regex);
		var fuzzedResponseHeader = fuzzed.getResponseHeader().toString();
		var fuzzedResponseBody = fuzzed.getResponseBody().toString();
	     var regexHeaderFound = fuzzedResponseHeader.search(matchPattern) != -1;
	     var regexBodyFound = fuzzedResponseBody.search(matchPattern) != -1;
		if(regexHeaderFound || regexBodyFound) {
			return false;
	     }
	}

	if(params.statusCode != "") {
		var matchStatusCode = params.statusCode;
		var fuzzedStatusCode = fuzzed.getResponseHeader().getStatusCode().toString();
		if(fuzzedStatusCode == matchStatusCode) {
			return false;
	     }
	}
	return true;
}
