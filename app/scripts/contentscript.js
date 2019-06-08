'use strict';

var imgSrc = chrome.extension.getURL(
    [
        'images', 'shimeji', '0.png'
    ].join('/')
);

function playPoyo(img, imgSize){
    $(img).animate(
        {
            height: '-=3%'
        },
        {
            duration: "fast", easing: "linear",
        }
    ).animate(
        {
            height: '+=6%'
        },
        {
            duration: "fast", easing: "linear",
        }
    ).animate(
        {
            height: '-=3%'
        },
        {
            duration: "fast", easing: "linear",
        }
    );
}


$(document).ready(function(){
    //for (var i = 0; i < 20; i++) {
        var img = $('<img>').attr('src', imgSrc).attr('id', 'shimejiSetter');
        //画像の読み込みが終わった後にちゃんと実行する
        img.bind("load", function(){
            let hight = img.hight;
            let width = img.width;

            //画像のサイズがちゃんと読み込まれているかのテスト
            console.log(hight,width);

        });
        $('body').append(img);
        img.css('height', '10%');
        console.log(img.naturalHeight);
        img.css('left', Math.floor(Math.random(200)*900));
        img.click(function(){
            $(this).animate(
                {
                    height: '-=3%'
                },
                {
                    duration: "fast", easing: "linear",
                }
            ).animate(
                {
                    height: '+=6%'
                },
                {
                    duration: "fast", easing: "linear",
                }
            ).animate(
                {
                    height: '-=3%'
                },
                {
                    duration: "fast", easing: "linear",
                }
            );
        });
    //}
    
});