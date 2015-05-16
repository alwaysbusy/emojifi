//Copyright (c) Owen Hurford 2015

//Set emoji to also replace ascii and use SVG for sake of loveliness
emojione.ascii = true;
emojione.imageType = 'png';
emojione.imagePathSVG = chrome.extension.getURL('emojione/assets/svg/');
emojione.imagePathPNG = chrome.extension.getURL('emojione/assets/png/');

function emojifi() {
    var original = window.document.getElementsByTagName('body')[0].innerHTML;
    var modified = emojione.toImage(original);
    if(original != modified) window.document.getElementsByTagName('body')[0].innerHTML = modified;
}

emojifi();