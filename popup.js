var emoji;
var emojiCats = {};

function changeTabClickListener() {
    for(var i = 0; i < window.document.getElementsByClassName('sect').length; i++) {
        window.document.getElementsByClassName('sect')[i].style.display = 'none';
    }
    window.document.getElementById(this.id + 'sect').style.display = 'block';
}

function emojiClickListener() {
    chrome.tabs.query({"active":true,"currentWindow":true}, function(tabs) {chrome.tabs.executeScript(tabs[0].id, {code: 'if(emojifi_lastitem.value){emojifi_lastitem.value += "\u' + this.id + '"}'});console.log(tabs);});
}

function buildKeyboard() {
    var ajax = new XMLHttpRequest();
    ajax.open('GET', 'emojione/emoji.json', false);
    ajax.send(null);
    emoji = JSON.parse(ajax.responseText);
    var emojiKeys = Object.keys(emoji);
    for (var i = 0; i < emojiKeys.length; i++) {
        var currEmoji = emoji[emojiKeys[i]];
        if(emojiCats[currEmoji.category] == null){
            emojiCats[currEmoji.category] = {};
        }
        emojiCats[currEmoji.category][currEmoji.category_order] = currEmoji;
    }
    
    var emojiCatsKeys = Object.keys(emojiCats);
    for (var i = 0; i < emojiCatsKeys.length; i++) {
        //Add to navigation
        var navElem = document.createElement('li');
        navElem.setAttribute('id',emojiCatsKeys[i]);
        navElem.appendChild(document.createTextNode(emojiCats[emojiCatsKeys[i]][1].shortname));
        navElem.addEventListener('click',changeTabClickListener);
        window.document.getElementById('headingsul').appendChild(navElem);
        //Iterate through each emoji
        var section = document.createElement('section');
        section.setAttribute('id', emojiCatsKeys[i] + 'sect');
        section.setAttribute('class', 'sect');
        for (var j = 1; j < Object.keys(emojiCats[emojiCatsKeys[i]]).length + 1; j++) {
            var emoj = document.createElement('div');
            var anchor = document.createElement('a');
            anchor.setAttribute('id', emojiCats[emojiCatsKeys[i]][j].unicode);
            anchor.setAttribute('title', emojiCats[emojiCatsKeys[i]][j].name);
            anchor.addEventListener('click', emojiClickListener);
            var img = document.createElement('img');
            img.setAttribute('src', 'emojione/assets/png/' + emojiCats[emojiCatsKeys[i]][j].unicode + '.png');
            img.setAttribute('alt', emojiCats[emojiCatsKeys[i]][j].unicode);
            anchor.appendChild(img);
            emoj.appendChild(anchor);
            section.appendChild(emoj);
        }
        window.document.getElementById('keyboard').appendChild(section);
    }
}

window.onload = function() {
    buildKeyboard();
    window.document.getElementById('recent').addEventListener('click', changeTabClickListener);
    window.document.getElementById('recentsect').style.display = 'block';
};