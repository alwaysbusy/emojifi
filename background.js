//Copyright (c) 2015 Owen Hurford
//Emoji Images used under CC BY-SA 4.0 Int from emojione.com
//Emoji Instertion code (c) 2014 Ranks.com, Inc., via Emoji One under The MIT License

//Test if settings configured and if not give defaults
chrome.storage.sync.get(null, function(items){
    if(Object.keys(items).indexOf('blacklist') == -1) {
        chrome.storage.sync.set({'blacklist':[]});
    }
    if(Object.keys(items).indexOf('filter') == -1) {
        chrome.storage.sync.set({'filter':true});
    }
    if(Object.keys(items).indexOf('usage') == -1) {
        chrome.storage.sync.set({'usage':true});
    }
    if(Object.keys(items).indexOf('report') == -1) {
        chrome.storage.sync.set({'report': false});
    }
    if(Object.keys(items).indexOf('enable') == -1) {
        chrome.storage.sync.set({'enable': true});
    }
});

//Add detection for enable and storage changes
var enable, blacklist, filter;

function stdSettingsCheck() {
    chrome.storage.sync.get(['enable', 'blacklist', 'filter'],function(items) {
        enable = items.enable;
        filter = items.filter;
        blacklist = items.blacklist;
        
        if(enable) {
            chrome.browserAction.setIcon({'path':'emojione/assets/png/1F600.png'});
        } else {
            chrome.browserAction.setIcon({'path':'emojione/assets/png/1F621.png'});
        }
    });
}
stdSettingsCheck();

var ajax = new XMLHttpRequest();
ajax.open('GET', 'filter.txt', false);
ajax.send(null);
var filterList = ajax.responseText.split("\n");

chrome.storage.onChanged.addListener(function(changes, namespace) {
    stdSettingsCheck();
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    //Something has happened in the tab, better add some emoji (if enabled and not filtered)
    if(changeInfo.status == 'complete' && enable) {
        var allow = true;
        for (var i = 0; i < blacklist.length; i++) {
            if(tab.url.indexOf(blacklist[i]) >= 0){
                allow = false;
            }
        }
        if (filter) {
           for (var i = 0; i < filterList.length; i++) {
               if(tab.url.indexOf(filterList[i]) >= 0) {
                   allow = false;
               }
           }
        }
        if (allow) {
            chrome.browserAction.setIcon({'path':'emojione/assets/png/1F556.png'});
            chrome.tabs.insertCSS(tabId, {"file" : "/emojione/assets/css/emojione.min.css", "allFrames": true, "matchAboutBlank": true});
            chrome.tabs.executeScript(tabId, {"file": "emojione/lib/js/emojione.min.js", "allFrames": true, "matchAboutBlank": true});
            chrome.tabs.executeScript(tabId, {"file": "emojifi.js", "allFrames": true, "matchAboutBlank": true}, function(result) {
                chrome.browserAction.setIcon({'path':'emojione/assets/png/1F600.png'});
            });
        }
    }
});