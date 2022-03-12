// @hahwul

function scan(ps, msg, src) {
    var alertRisk = 2
    var alertConfidence = 2
    var alertTitle = 'Found DOM clobbering attack surface'
    var alertDesc = ''
    var alertSolution = ''
    var cweId = 200
    var wascId = 0
    var url = msg.getRequestHeader().getURI().toString()
    var contentType = msg.getResponseHeader().getHeader("Content-Type")
    var unwantedFileTypes = ['image/png', 'image/jpeg','image/gif','application/x-shockwave-flash','application/pdf']
    var patterns = [
      /(location|\.href|\.innerHTML|\.outerHTML|document.URL|\.srcdoc)(|\s)=(|\s)window\..*/gi,
      /(eval\(|html\(|constructor\(|setInterval\(|setTimeout\(|document.write\(|document.execCommand\()(|\s)window\..*/gi
    ]

    if (unwantedFileTypes.indexOf(""+contentType) >= 0) {
        return
	}

    var body = msg.getResponseBody().toString()
    for(i=0;i<patterns.length;i++){
      if (patterns[i].test(body)) {
          patterns[i].lastIndex = 0
          var foundIBAN = []
          var comm
          while (comm = patterns[i].exec(body)) {
              foundIBAN.push(comm[0])
          }
      ps.raiseAlert(alertRisk, alertConfidence, alertTitle, alertDesc, url, '', '', foundIBAN.toString(), alertSolution, foundIBAN.toString(), cweId, wascId, msg)
    }
    }    
}
