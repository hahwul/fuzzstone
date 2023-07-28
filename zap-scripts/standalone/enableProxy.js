var url = "http://localhost:8090/JSON/network/action/setHttpProxyEnabled/?enabled=true";

var URL = Java.type('java.net.URL');
var HttpURLConnection = Java.type('java.net.HttpURLConnection');

try {
    var connection = new URL(url).openConnection();
    connection.setRequestMethod('GET');

    var responseCode = connection.getResponseCode();
    if (responseCode === 200) {
        print("Enabled!");
    } else {
        print("Error: " + responseCode);
    }

} catch (e) {
    print("Error: " + e);
}
