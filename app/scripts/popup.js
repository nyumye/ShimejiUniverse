$(document).ready(function(){

  //しめじ発生間隔
  let shimejiOccurrenceInterval;

  //しめじの最大数
  let maxNumShimeji;

  //しめじが自動で収穫されるか
  let isPickedAuto;

  //GANしめじを存在させるか
  let ganShimejiExists;

  let settingData = {};


  chrome.storage.sync.get(
    [
      'shimejiOccurrenceInterval',
      'maxNumShimeji',
      'isPickedAuto',
      'ganShimejiExists'
    ], function (value) {
      if(typeof value.shimejiOccurrenceInterval === 'undefined'){
        //設定が保存されていないならばデフォルト値を代入する
        shimejiOccurrenceInterval = 60;
        maxNumShimeji = 15;
        isPickedAuto = true;
        ganShimejiExists = true;
        console.log('undefinedでした');
      }else{
        //保存済みの設定があるならばそれを代入する。
        shimejiOccurrenceInterval = value.shimejiOccurrenceInterval;
        maxNumShimeji = value.maxNumShimeji;
        isPickedAuto = value.isPickedAuto;
        ganShimejiExists = value.ganShimejiExists;
      }

      //設定データのうち数値のものを配列に格納
      let settingData = [shimejiOccurrenceInterval, maxNumShimeji];
      console.log(settingData[0]);
      
      //スライダーを取得し，スライダーが動かされた時にspan内部の数値が変えられるようにする
      var elem = document.getElementsByClassName('range-slider');
      var rangeValue = function (elem, target) {
        return function(evt){
          target.innerHTML = elem.value;
        }
      }
      for(var i = 0, max = elem.length; i < max; i++){
        bar = elem[i].getElementsByTagName('input')[0];
        target = elem[i].getElementsByTagName('span')[0];
        bar.value = settingData[i];//保存したデータを適用させる
        target.innerHTML = settingData[i];//保存したデータを適用させる
        bar.addEventListener('input', rangeValue(bar, target));
      }

      //保存したデータを適用させる
      document.getElementById('isPickedAuto').checked = isPickedAuto;
      document.getElementById('ganShimejiExists').checked = ganShimejiExists;

      //設定を保存ボタンを押したときの処理を設定
      document.getElementById('storeSetting').addEventListener('click', storeSetting);

      });

});

function storeSetting(){
  //しめじ発生間隔
  let shimejiOccurrenceInterval
    = document.getElementById('shimejiOccurrenceInterval').value;

  //しめじの最大数
  let maxNumShimeji
    = document.getElementById('maxNumShimeji').value;

  //しめじが自動で収穫されるか
  let isPickedAuto
    = document.getElementById('isPickedAuto').checked;

  //GANしめじを存在させるか
  let ganShimejiExists
    = document.getElementById('ganShimejiExists').checked;
  
  console.log(ganShimejiExists);

  //ストレージに保存
  chrome.storage.sync.set(
    {
      'shimejiOccurrenceInterval': shimejiOccurrenceInterval,
      'maxNumShimeji': maxNumShimeji,
      'isPickedAuto': isPickedAuto,
      'ganShimejiExists': ganShimejiExists
    },function(){});
  
}