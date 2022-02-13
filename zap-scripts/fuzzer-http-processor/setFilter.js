function getRequiredParamsNames(){
	return [];
}

function getOptionalParamsNames(){
	return ["statusCode","regex","lengthBody","lengthHeader"];
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
	
	if(params.lengthBody != "") {
		var matchBodySize = params.lengthBody;
		var fuzzedBodySize = (fuzzed.getResponseBody().toString()).length()
		if(parseInt(matchBodySize) == fuzzedBodySize) {
			return false;
	     }
	}

	if(params.lengthHeader != "") {
		var matchHeaderSize = params.lengthHeader;
		var fuzzedHeaderSize = (fuzzed.getResponseHeader().toString()).length()
		if(parseInt(matchHeaderSize) == fuzzedHeaderSize) {
			return false;
	     }
	}

	return true;
}
