// pages/tongji/list/list.js
var wxCharts = require('../../../utils/wxcharts.js');
var app = getApp();
const utilC = require('../../../utils/util.js');
const urlC = require('../../../utils/url.js');
const gjCommon = require('../../../utils/gjCommon.js');
var pieChart = null;
var pieChart1 = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:"统计分析"
  },
  touchHandler: function (e) {
    console.log(pieChart.getCurrentDataIndex(e));
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
    var windowWidth = 320;
    try {
      var res = wx.getSystemInfoSync();
      windowWidth = res.windowWidth;
    } catch (e) {
      console.error('getSystemInfoSync failed!');
    }

    // utilC._get(urlC.ip +"dlxc/home/searchallroadBydepno",null,function(res){
    //   var zlist = new Array();
    //   var jlist = new Array();
    //   for (var i = 0; i < res.data.data.length; i++) {
    //     var objdata = res.data.data[i];
    //     var obj = {};
    //     obj.name = objdata.cityname;
    //     obj.data = objdata.totalroad;
    //     obj.format = function(val) {
    //       return this.data;
    //     }
    //     if (objdata.cityname == "鼓楼区" || objdata.cityname == "建邺区" || objdata.cityname == "栖霞区" || objdata.cityname == "玄武区"
    //       || objdata.cityname == "秦淮区" || objdata.cityname == "雨花台区") {
    //       zlist.push(obj)
    //     } else {
    //       jlist.push(obj)
    //     }
    //   }
    //   pieChart = new wxCharts({
    //     animation: true,
    //     canvasId: 'pieCanvas',
    //     type: 'pie',
    //     series: zlist,
    //     width: windowWidth-20,
    //     height: 270,
    //     dataLabel: true,
    //   });
    //   pieChart1 = new wxCharts({
    //     animation: true,
    //     canvasId: 'pieCanvas1',
    //     type: 'pie',
    //     series: jlist,
    //     width: windowWidth-20,
    //     height: 270,
    //     dataLabel: true,
    //   });
    // })
   
   
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