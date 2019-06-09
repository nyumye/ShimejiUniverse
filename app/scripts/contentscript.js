'use strict';

//高さの下限。pxですよ。これを基に拡大比率を求める。
var minHeight = 100;

//高さの下限にどれだけ数値を足すか。散らばり
var extraHeight = 90;

//ぽよぽよさせる際にどれだけ圧縮するか
var changeValueRate = .1;

var imgSrc = chrome.extension.getURL(
    [
        'images', 'shimeji', '0.png'
    ].join('/')
);

function setShimejiSize(img, imgHight, imgWidth){

}

function playPoyo(img, changeValue){
    if(img.is(':animated')){ return; }
    
    $(img).animate(//下がる
        {
            height: ('-=' + changeValue + 'px'),
            width: ('+=' + changeValue + 'px'),
            left: ('-=' + Math.floor(changeValue/2))
        },
        {
            duration: "fast", easing: "linear",
        }
    ).animate(//上がる
        {
            height: ('+=' + changeValue * 2 + 'px'),
            width: ('-=' + changeValue * 2 + 'px'),
            left: ('+=' + Math.floor(changeValue))
        },
        {
            duration: "fast", easing: "linear",
        }
    ).animate(//上がったのを戻す
        {
            height: ('-=' + changeValue + 'px'),
            width: ('+=' + changeValue + 'px'),
            left: ('-=' + Math.floor(changeValue/2))
        },
        {
            duration: "fast", easing: "linear",
        }
    );
}


$(document).ready(function(){
    for (var i = 0; i < 20; i++) {

    
    let img = $('<img>').attr('src', imgSrc).attr('id', 'shimejiSetter');

    $('body').append(img);

    //画像がちゃんとロードされてから。そうしないと高さが0になる。
    img.bind("load", function(){
        let height = img.height();
        let width = img.width();

        //拡大比率(どれだけShimejiを縮小するか)
        let expansionRate = (minHeight + Math.floor(Math.random() * extraHeight)) / height;

        //Shimejiのサイズを適正にし，登録
        img.css("height", Math.floor(height * expansionRate));
        img.css("width", Math.floor(width * expansionRate));

        //ぽよぽよさせるときのピクセル変更値
        let changeValue = img.height() * changeValueRate;

        
        img.css('left', Math.floor(Math.random(200)*1200));
        img.mouseover(function(){playPoyo(img, changeValue)});
        img.mouseout(function(){playPoyo(img, changeValue)});
        img.css("bottom", "-10px");
    });
    


        //設置された際にぽよぽよさせる
        //playPoyo(img);

    
    /*
        
        img.css('height', '10%');
        console.log(img.naturalHeight);
        */
    }
    
});