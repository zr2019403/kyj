// pages/changePas/changePas.js
const gjCommon = require('../../utils/gjCommon.js')
const urlC = require('../../utils/url.js');
const utilC = require('../../utils/util.js');
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    password:'',
    newPassword:'',
    confirmPassword:'',
    userCode:'',
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
    this.setData({
      userCode: userInfo.usercode,
    })
  },
  old:function(e){
    var that=this;
    that.setData({
      password:e.detail.value
    });
    console.log(that.data.password)
  },
  newm: function (e) {
    var that = this;
    that.setData({
      newPassword: e.detail.value
    });
  },
  confirm: function (e) {
    var that = this;
    that.setData({
      confirmPassword: e.detail.value
    });
  },
  save:function(){
    var that=this;
    if (that.data.password==''){
      wx.showToast({
        title: '原密码不能为空',
        icon: 'none',
        duration: 1500
      })

      setTimeout(function () {
        wx.hideToast()
      }, 2000);
      return;
    }
    if (that.data.newPassword == '' || that.data.confirmPassword=='') {
      wx.showToast({
        title: '新密码不能为空',
        icon: 'none',
        duration: 1500
      })

      setTimeout(function () {
        wx.hideToast()
      }, 2000);
      return;
    }
    if (that.data.newPassword != that.data.confirmPassword){
      wx.showToast({
        title: '输入的新密码不一致',
        icon: 'none',
        duration: 1500
      })

      setTimeout(function () {
        wx.hideToast()
      }, 2000);
      return;
    }
    utilC._post(urlC.ip + 'phone/phone!changepwd.do?password=' + that.data.password + '&newPassword=' + that.data.newPassword + '&userCode=' + that.data.userCode,{},function success(res){
      if(res.data.flag){
        wx.navigateBack({
          delta: 1
        })
        wx.showToast({
          title: '密码修改成功',
          icon: 'none',
          duration: 1500
        })
      }else{
        wx.showToast({
          title: '输入的原密码不正确',
          icon: 'none',
          duration: 1500
        })

        setTimeout(function () {
          wx.hideToast()
        }, 2000);
        return;
      }
     
    },function fail(){utilC.fail()});
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