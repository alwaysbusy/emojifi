//Copyright (c) Owen Hurford 2015

//Set emoji to also replace ascii and use SVG for sake of loveliness
emojione.ascii = true;
emojione.imageType = 'png';
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
            if (original !== modified && (node.nodeType == Node.TEXT_NODE || node.nodeType == Node.ELEMENT_NODE)) {
                parser = new DOMParser();
                modified = parser.parseFromString(modified, 'text/html');
                if(modified.body.childNodes.length > 1) {
                    for(i = 0; i < modified.body.childNodes.length; i++) {
                        node.parentNode.insertBefore(modified.body.childNodes[i], node);
                    }
                    node.parentNode.removeChild(node);
                } else {
                    node.parentNode.replaceChild(modified.body.firstChild, node);
                }
            }
        }
    }
}

emojifi();

document.addEventListener('DOMNodeInserted', function(event) {
    emojifi();
});