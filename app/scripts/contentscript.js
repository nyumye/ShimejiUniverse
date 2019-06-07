'use strict';

var imgSrc = chrome.extension.getURL(
    [
        'images', 'shimeji', '0.png'
    ].join('/')
);



$(document).ready(function(){
    for (var i = 0; i < 20; i++) {
        var img = $('<img>').attr('src', imgSrc).attr('id', 'shimejiSetter');
        $('body').append(img);
        img.css('left', Math.floor(Math.random(200)*900));
    }
    
});