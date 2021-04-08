// pages/sb/wzShow/wzShow.js
const app = getApp()
const gjCommon = require('../../utils/gjCommon.js');
const util = require('../../utils/util.js');
const url = require('../../utils/url.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '地图查询',
    longitude: 118.802089,
    latitude: 32.054057,
    markers: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.starRun == 1) {
      gjCommon.count_down();
      wx.setKeepScreenOn({
        keepScreenOn: true
      })
    }

    var that= this;

    wx.getLocation({
      type: "gcj02",
      success: function (res) {
        var latitude = res.latitude;
        var longitude = res.longitude;
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude
        })
      }, fail: function (e) {
      }
    });

    // var userCode = wx.getStorageSync('userInfo').userCode;
    // util._get(url.ip + "dlxx/caseinfo/getDtShow?userCode=" + userCode,null,
    //  function(res){
    //    var marks = [];
    //    let result = res.data.data;
    //    for (var i in result) {
    //      var iconPath = "";
    //      if (result[i].type == '0') {
    //        iconPath = "../images/qxpc.png";
    //      } else if (result[i].type == '3') {
    //        iconPath = "../images/sbpc.png";
    //      }
    //      var mark = {
    //        id: result[i].id,
    //        latitude: result[i].lat,
    //        longitude: result[i].lng,
    //        iconPath: iconPath,
    //        width:30,
    //        height:40,
    //        callout: {
    //          content: "事件描述：\n" + result[i].meno + "\n业务状态：" + result[i].status,
    //          color: "#2c8df6",
    //          fontSize: 12,
    //          borderRadius: 5,
    //          padding:10,
    //          bgColor: "#fff",
    //          boxShadow: "2px 2px 10px #aaa"
    //        },
    //      }
    //      marks.push(mark);
    //    }

    //    that.setData({
    //      markers: marks
    //    })
       
    //  });

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    app.editTabBar1();    //显示自定义的底部导航
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})