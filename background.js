//Copyright (c) 2015 Owen Hurford
//Emoji Images used under CC BY-SA 4.0 Int from emojione.com
//Emoji Instertion code (c) 2014 Ranks.com, Inc., via Emoji One under The MIT License

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    //Something has happened in the tab, better add some emoji
    if(changeInfo.status == 'complete') {
        chrome.tabs.insertCSS(tabId, {"file" : "/emojione/assets/css/emojione.min.css", "allFrames": true, "matchAboutBlank": true});
        chrome.tabs.executeScript(tabId, {"file": "emojione/lib/js/emojione.min.js", "allFrames": true, "matchAboutBlank": true});
        chrome.tabs.executeScript(tabId, {"file": "emojifi.js", "allFrames": true, "matchAboutBlank": true});
    }
});