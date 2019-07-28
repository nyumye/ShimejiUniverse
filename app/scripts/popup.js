let changeColor = document.getElementById('changeColor');

chrome.storage.sync.get('color', function(data) {
    changeColor.style.backgroundColor = data.color;
    changeColor.setAttribute('value', data.color);
});

changeColor.onclick = function(element) {
  let color = element.target.value;
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.executeScript(
        tabs[0].id,
        {code: 'document.body.style.backgroundColor = "' + color + '";'});
  });
};


var elem = document.getElementsByClassName('range-slider');
var rangeValue = function (elem, target) {
  return function(evt){
    target.innerHTML = elem.value;
  }
}
for(var i = 0, max = elem.length; i < max; i++){
  bar = elem[i].getElementsByTagName('input')[0];
  target = elem[i].getElementsByTagName('span')[0];
  bar.addEventListener('input', rangeValue(bar, target));
}