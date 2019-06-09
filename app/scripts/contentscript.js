'use strict';

//高さの下限。pxですよ。これを基に拡大比率を求める。
var minHeight = 100;

//高さの下限にどれだけ数値を足すか。散らばり
var extraHeight = 90;

//ぽよぽよさせる際にどれだけ圧縮するか
var changeValueRate = .1;

//今のしめじの数
var numShimeji = 0;

//生やすしめじの最大数
var maxNumShimeji = 15;

var imgSrc = chrome.extension.getURL(
    [
        'images', 'shimeji', '0.png'
    ].join('/')
);

//しめじの画像を適切なサイズにする
function registerShimejiSize(img){
    
    let height = img.height();
    let width = img.width();

    //拡大比率(どれだけShimejiを縮小するか)
    let expansionRate = (minHeight + Math.floor(Math.random() * extraHeight)) / height;

    //Shimejiのサイズを適正にし，登録
    img.css("height", Math.floor(height * expansionRate));
    img.css("width", Math.floor(width * expansionRate));
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

function pickShimeji(img, changeValue){
    //imgに登録されたリスナーをすべて削除
    img.off();

    //現在行われているアニメーションをすべて消す。
    while(img.is(':animated')){
        img.stop();
    }

    let shimejiHeight = img.height();

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
            left: ('+=' + Math.floor(changeValue)),
            bottom: ('+=' + changeValue * 2 + 'px')
        },
        {
            duration: "fast", easing: "easeOutCirc",
        }
    ).animate(//上がったのを戻す
        {
            height: ('-=' + changeValue + 'px'),
            width: ('+=' + changeValue + 'px'),
            left: ('-=' + Math.floor(changeValue/2)),
            bottom: ('-' + ( changeValue * 2 + shimejiHeight) + 'px')
        },
        {
            duration: "normal", easing: "easeInCubic",
            complete: function(){ numShimeji--; }
        }
    );
}

//しめじが成長する
function growShimeji(img, changeValue){
    //しめじの画像の長さを保持する。
    let shimejiHeight = img.height();
    
    //しめじの画像の長さを0にする
    img.css('height', '0px');
    //しめじの縦を縮めた分だけしめじの横の長さを長くする
    img.css('width', (img.width() + shimejiHeight) + 'px');
    //長くした分だけ左にずらす
    img.css('left', (img.css('left')-(Math.floor(shimejiHeight/2))) + 'px');

    //しめじを表面に出す
    img.css("bottom", "-15px");

    img.animate(//圧縮されたしめじを戻すと思いきや行き過ぎて伸びる
        {
            height: ('+=' + (shimejiHeight + changeValue) + 'px'),
            width: ('-=' + (shimejiHeight + changeValue) + 'px'),
            left: ('+=' + ((Math.floor(shimejiHeight/2)) + changeValue))
        },
        {
            duration: '1000', easing: "easeOutCirc"
        }
    ).animate(//上がったのを戻す
        {
            height: ('-=' + changeValue + 'px'),
            width: ('+=' + changeValue + 'px'),
            left: ('-=' + Math.floor(changeValue/2))
        },
        {
            duration: "fast", easing: "easeInOutBack",
        }
    );
}

//しめじをセットする
function putOutShimeji(){
    let img = $('<img>').attr('src', imgSrc).attr('id', 'shimejiSetter');

    $('body').append(img);

    //画像がちゃんとロードされてから。そうしないと高さが0になる。
    img.bind("load", function(){
        
        //しめじの画像を適切なサイズにする
        registerShimejiSize(img);

        //ぽよぽよさせるときのピクセル変更値
        let changeValue = img.height() * changeValueRate;
        
        //しめじをひょうじさせるぞー
        img.css('left', Math.floor(Math.random() * (window.innerWidth - img.width())));
        //img.css("bottom", "-15px");

        //しめじを成長させよう！
        growShimeji(img, changeValue);
        
        //リスナーに登録
        img.mouseover(function(){ playPoyo(img, changeValue); });
        img.mouseout(function(){ playPoyo(img, changeValue); });
        img.click(function(){ pickShimeji(img, changeValue); });
        
    });
}

$(document).ready(function(){
    setInterval(function(){
        //しめじ生えすぎてないか
        if(numShimeji < maxNumShimeji){
            numShimeji++;
            putOutShimeji();
        }
    }, 10000);
});