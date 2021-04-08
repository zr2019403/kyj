// pages/mine/mine.js
const app = getApp()
const urlC = require('../../utils/url.js');
const utilC = require('../../utils/util.js');
const gjCommon = require('../../utils/gjCommon.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    userName:'',
    unitName:'',
    dataValue:'',
  },
  changePas: function () {
    wx.redirectTo({
      url: '../changePas/changePas'
    })
  },
  tc: function () {
    // wx.clearStorage({
    //   success: function (res) {
        wx.reLaunch({
          url: '/pages/login/login',
        });
    //   }
    // });
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
    var userInfo = wx.getStorageSync('userInfo');
    if (userInfo!=""){
      this.setData({
        userName: userInfo.username,
        unitName: userInfo.unitName,
      });
    }
    
    // var that=this;
    // var s = urlC.ip;
    // var url = s.substring(0, s.length - 8) + 'system/userunit/userunits/' + userInfo.usercode;
    // utilC._get(url,{},function success(res){
    //   if (res.data.data != undefined && res.data.data.objList != undefined){
    //     if (res.data.data.objList.length>0){
    //       for (var i = 0; i < res.data.data.objList.length;i++){
    //         if (res.data.data.objList[i].isPrimary=="T"){
    //           that.setData({
    //             dataValue: res.data.data.objList[i].userRankText,
    //           })
    //         }
    //       }
    //     }
        
    //   }
    // },function fail(){utilC.fail()})
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
    // wx.reLaunch({
    //   url: '../../index/index'
    // })
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