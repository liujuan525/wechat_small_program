function convertToStarsArray(stars) {
	var fullNum = stars.toString().substring(0,1);
    var halfNum = stars.toString().substring(1,2);
    var array = [];
    for (var i = 1; i <= 5; i++) {
      if (i <= fullNum) {
        array.push(1); // 整颗星
      }
    }
    if (halfNum >= 5) {
      array.push(5); // 半颗星
    }
    while(array.length < 5) {
      array.push(0); // 无星
    }
	return array;
}

/**
 * 根据URL回调信息
 */
function http(url,callback,method) {
  wx.request({
    url: url,
    method: method,
    header: {
      "Content-Type": ""
    },
    success: function (res) {
      callback(res.data);
    },
    fail: function (error) {
      console.log(error);
    }
  })
}
/**
 * 获取演员名称
 */
function convertToCastString(casts) {
  var castsjoin = "";
  for (var idx in casts) {
    castsjoin = castsjoin + casts[idx].name + " / ";
  }
  return castsjoin.substring(0, castsjoin.length - 2); // 减掉一个空格和/
}
/**
 * 获取演员详细信息
 */
function convertToCastInfos(casts) {
  var castsArray = [];
  for (var idx in casts) {
    var cast = {
      name: casts[idx].name,
      img: casts[idx].avatars ? casts[idx].avatars.large : "", 
    }
    castsArray.push(cast);
  }
  return castsArray;
}

module.exports = {
	convertToStarsArray: convertToStarsArray,
  http: http,
  convertToCastString: convertToCastString,
  convertToCastInfos: convertToCastInfos
}