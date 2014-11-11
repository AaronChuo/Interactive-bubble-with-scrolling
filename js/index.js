(function(w, d) {
  
  //TODO: 效能需要再調整
  //抓取所有泡泡
  var nodeList = d.querySelectorAll('#container li');
  //設定魚眼邊界
  var bound = {
    top: nodeList[0].offsetHeight/2,
    left: nodeList[0].offsetWidth/2,
    bottom: w.innerHeight - nodeList[0].offsetHeight/2,
    right: w.innerWidth - nodeList[0].offsetWidth/2
  };
  
  fishEyeEffect();
  
  //監聽頁面捲動
  d.addEventListener('scroll', fishEyeEffect);
  d.addEventListener('touchmove', fishEyeEffect);
  
  //模擬魚眼效果
  function fishEyeEffect() {
    for(var i=0; i<nodeList.length; i++) {
      var node = nodeList[i];
      var nodeRect = getRect(node);
      var thisNode = node.getElementsByTagName('span')[0];
      
      thisNode.className = '';
      thisNode.className = getScaleType(nodeRect);
      
    }
  }
  
  //判斷邊界回傳對應的CSS類別
  function getScaleType(objRect) {
    var rect = objRect;
    var w = rect.width,    //泡泡寬度
        h = rect.height,   //泡泡高度
        rt = rect.top,     //泡泡至魚眼上邊界的距離
        rb = rect.bottom,  //泡泡至魚眼下邊界的距離
        rl = rect.left,    //泡泡至魚眼左邊界的距離
        rr = rect.right,   //泡泡至魚眼右邊界的距離
        bt = bound.top,    //魚眼上邊界
        bb = bound.bottom, //魚眼下邊界
        bl = bound.left,   //魚眼左邊界
        br = bound.right;  //魚眼右邊界
    //各個大小的判斷式
    var condition = [
      {className: 'smaller',
       judge: (rt < bt || rl < bl || rb > bb || rr > br)},
      {className: 'medium',
       judge: (rt < (bt+h) && (rl < (bl+w) || rr > (br-w)) ||
               rb > (bb-h) && (rl < (bl+w) || rr > (br-w)))}
    ];
    
    for(var i=0; i<condition.length; i++) {
      if(condition[i].judge) {
        return condition[i].className;
      }
    }
  }
  
  //取得元素與視窗邊界的相對距離
  function getRect(element) {
    var el = element;
    return el.getBoundingClientRect();
  }
  
})(window, document);







//從iTune API撈資料測試
/*var icons = [];
var terms = ['yahoo', 'facebook', 'google', 'line', 'twitter'];

for(var i=0; i<terms.length; i++) {
  var uri = 'https://itunes.apple.com/search?term='+terms[i]+'&country=tw&entity=software&attribute=softwareDeveloper&sort=popular&limit=100';
  getAppIcons(uri);
}

var uri = 'https://itunes.apple.com/search?term='+terms[0]+'&country=tw&entity=software&attribute=softwareDeveloper&sort=popular&limit=100';
getAppIcons(uri);

function getAppIcons(apiUrl) {
  $.ajax({
    type: 'GET',
    dataType: 'JSONP',
    url: apiUrl,
    success: function(data) {
      var res = data.results;
      for(var i=0; i<res.length; i++) {
        d.getElementsByTagName('span')[i].style.background = 'url('+res[i].artworkUrl100+') center no-repeat';
        d.getElementsByTagName('span')[i].style.backgroundSize = '100% 100%';
      }
    }
  });
}*/