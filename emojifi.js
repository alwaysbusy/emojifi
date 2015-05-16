//Copyright (c) Owen Hurford 2015

//Set emoji to also replace ascii and use SVG for sake of loveliness
emojione.ascii = false;
emojione.imageType = 'svg';
emojione.imagePathSVG = chrome.extension.getURL('emojione/assets/svg/');
emojione.imagePathPNG = chrome.extension.getURL('emojione/assets/png/');

function emojifi() {
    recursiveEmojifi(window.document.body);
}

function recursiveEmojifi(node) {
    var i;
    
    if (node) {
        if (node.hasChildNodes()) {
            for (i = 0; i < node.childNodes.length; i++) {
                recursiveEmojifi(node.childNodes[i]);
            }
        } else {
            var original = node.textContent, modified = emojione.toImage(original);
            if (original !== modified && (node.nodeType == Node.TEXT_NODE || node.nodeType == Node.ELEMENT_NODE) && original.indexOf('©') < 0) {
                parser = new DOMParser();
                modified = parser.parseFromString(modified, 'text/html');
                i = 0;
                while (modified.body.childNodes[i]) {
                    node.parentNode.insertBefore(modified.body.childNodes[i], node);
                    i++;
                }
                node.parentNode.removeChild(node);
            }
        }
    }
}

emojifi();

document.addEventListener('DOMNodeInserted', function(event) {
    emojifi();
});

var emojifi_lastitem;

document.addEventListener('FocusEvent', function(event) {
    emojifi_lastitem = event.target;
    console.log(emojifi_lastitem);
});