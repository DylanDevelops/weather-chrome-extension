// starts up the chrome api behind the scenes
chrome.runtime.onInstalled.addListener(function() {
    console.log("Extension Installed Successfully");
});