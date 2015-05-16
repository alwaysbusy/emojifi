function saveBlacklist() {
    var entries = window.document.getElementById('blacklist').value.split("\n");
    var usable = [];
    var regex = /(https?:\/\/)?\w(\w|\.)+\.\w\w+\/(\w|.)*/g;
    for (var i = 0; i < entries.length; i++) {
        if(regex.test(entries[i])) {
            usable.push(entries[i]);
        }
    }
    
    chrome.storage.sync.set({'blacklist':usable});
}

function saveFilter() {
    chrome.storage.sync.set({'filter': window.document.getElementById('filter').checked});
}

function saveUsage() {
    if(window.document.getElementById('usage').checked) {
        chrome.storage.sync.set({'usage': window.document.getElementById('usage').checked, 'report': window.document.getElementById('report').checked});
        window.document.getElementById('report').disabled = false;
    } else {
        chrome.storage.sync.set({'usage': false, 'report': false});
        window.document.getElementById('report').disabled = true;
        window.document.getElementById('report').checked = false;
    }
}

function saveReport() {
    chrome.storage.sync.set({'report': window.document.getElementById('report').checked});
}

function saveEnable() {
    chrome.storage.sync.set({'enable': window.document.getElementById('enable').checked});
}

window.onload = function() {
    chrome.storage.sync.get(['blacklist', 'filter', 'usage', 'report', 'report', 'enable'], function(items) {
        window.document.getElementById('enable').checked = items.enable;
        window.document.getElementById('report').checked = items.report;
        window.document.getElementById('usage').checked = items.usage;
        if(items.usage == false) {
             window.document.getElementById('report').enabled = false;
        }
        window.document.getElementById('filter').checked = items.filter;
        window.document.getElementById('blacklist').value = items.blacklist.join("\n");
    });
    
    window.document.getElementById('blacklist').onblur = saveBlacklist;
    window.document.getElementById('filter').onclick = saveFilter;
    window.document.getElementById('usage').onclick = saveUsage;
    window.document.getElementById('report').onclick = saveReport;
    window.document.getElementById('enable').onclick = saveEnable;
}