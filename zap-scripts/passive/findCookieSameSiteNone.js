// findCookieSameSiteNone.js
// Cookie SameSite=None Check 
// by @hahwul

function scan(ps, msg, src) 
{

    var alertRisk = 3
    var alertConfidence = 2
    var alertTitle = "Cookie set with SameSite=None"
    var alertDesc = "A cookie has been set with the SameSite=None"
    var alertSolution = "Session cookies should not use SameSite =None as much as possible."

    var cweId = 0
    var wascId = 13

    var url = msg.getRequestHeader().getURI().toString();
    var headers = msg.getResponseHeader().getHeaders("Set-Cookie")
    
    if (headers != null)
    {
        var re_noneflag = /([Ss][Aa][Mm][Ee][Ss][Ii][Tt][Ee][=][Nn][Oo][Nn][Ee])/g
        if ((re_noneflag.test(headers)))
        {
            ps.raiseAlert(alertRisk, alertConfidence, alertTitle, alertDesc, url, '', '', '', alertSolution,headers, cweId, wascId, msg);
        }
    }
    
}
