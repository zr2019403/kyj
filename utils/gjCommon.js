const app = getApp()
const urlC = require('url.js')
const util = require('util.js')

/* 毫秒级倒计时 */
function count_down() {

  if (app.globalData.starRun == 0) {
    return;
  }

  if (app.globalData.countTooGetLocation >= 5000) { //1000为1s
    getLocation();
    app.globalData.countTooGetLocation = 0;
  }

  if (app.globalData.time >= 180000) { //1000为1s
    var openid = wx.getStorageSync("app_openid");
    util._post(urlC.ip + "dlxx/trackrecord/createMobileRecord/" + openid, app.globalData.points, function (result) { 
      app.globalData.points=[];
      })
    app.globalData.time = 0;
  }

  setTimeout(function () {
    app.globalData.countTooGetLocation += 10;
    app.globalData.time += 10;
    count_down();
  }
    , 10
  )
}

function getLocation() {
  var that = this
  wx.getLocation({

    type: 'gcj02', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
    success: function (res) {
      //make datas 
      var newCover = {
        lat: res.latitude,
        lng: res.longitude,
        speed:res.speed,
        postime:new Date(),
        userCode: wx.getStorageSync('userInfo').userCode
      };
      let oriCovers = app.globalData.points;
      oriCovers.push(newCover);
      app.globalData.points = oriCovers;
    },
  })
}

module.exports = {
  count_down: count_down,
  getLocation: getLocation
}