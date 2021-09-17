const devmode = true;
var manifest = chrome.runtime.getManifest();
var appName = manifest.name;
var appVersion = manifest.version;

//running on app reload
chrome.runtime.onInstalled.addListener(function () {
    if (devmode) {
        console.log(appName + appVersion + " is reloaded.");
        console.log("Draken sends his regards.");
    }
});