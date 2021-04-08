// pages/login/login.js   ?loginName=admin&userPin=000000
const urlC = require('../../utils/url.js');
const utilC = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userName: '',
    password: '',
    focus: false,
    isDelete: false,
    inpsd: false,
    isShow: false, //运用三目运算法，对最右侧图片进行控制
    show: "password", //初始化input框的类型为password
    items: [{
      text: '记住密码',
      checked: true,
      val: 1
    }
    ],
    savePsd: true,
  },
  //是否记住密码
  savePsd: function (e) {
    var that = this;
    if (e.detail.value.length > 0) {
      that.setData({
        savePsd: true
      })
    } else {
      that.setData({
        savePsd: false
      })
    }
  },
  // 密码输入检测
  getPassWord: function (e) {
    var password = e.detail.value;
    if (password == '') {
      this.setData({
        inpsd: false
      })
    } else {
      this.setData({
        password: password,
        inpsd: true
      })
    }

  },
  showPassword: function () {
    if (this.data.isShow) { //如果this.data.isShow为true,则表示为密码小黑点
      this.setData({
        isShow: false,
        show: "password",
        focus: true,
        naFocus: false,
      })
    } else {
      this.setData({
        isShow: true,
        show: "text",
        focus: true,
        naFocus: false,
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    wx.checkSession({
      success: function () {
        var userInfo = wx.getStorageSync('userInfo');
        var password = wx.getStorageSync('password');
        if ('' != userInfo) {
          that.setData({
            userName: userInfo.userName,
            password: password,
            isDelete: true,
            naFocus: true,
          })
        }

      }
    })
  },
  clear: function (e) {
    this.setData({
      'userName': '',
      'password': '',
      isDelete: false,
      inpsd: false,
      focus: false,
      naFocus: true,
    })
  },
  inName: function (e) {
    var userName = e.detail.value;
    if (userName == '') {
      this.setData({
        isDelete: false,
        naFocus: true,
      })
    } else {
      this.setData({
        isDelete: true,
        userName: userName,
        naFocus: true,
      })
    }
  },
  loginBtn: utilC.throttle(function (options) {
    var HEAD = this;
    if (HEAD.data.userName == '') {
      wx.showToast({
        title: '用户名不能为空',
        icon: 'none',
        duration: 1500
      })

      // setTimeout(function () {
      //   wx.hideToast()
      // }, 2000)
    } else if (HEAD.data.password == '') {
      wx.showToast({
        title: '密码不能为空',
        icon: 'none',
        duration: 1500
      })

      // setTimeout(function () {
      //   wx.hideToast()
      // }, 2000)
    } else {
      var openid = wx.getStorageSync("app_openid");
      // utilC._get(urlC.ip + '/loginController/getTest.do', {
        
        utilC._post(urlC.ip + '/loginController.do?checkuser', {
        userName: HEAD.data.userName,
        password: HEAD.data.password,
        openid: "openid"
      }, function (res) {
        if (res.data.success) {
          
          wx.setStorage({
            key: "userInfo",
            data: JSON.parse(res.data.attributes.userInfo)
          })
          wx.setStorageSync("cookieKey", res.header["Set-Cookie"]);
          if (HEAD.data.savePsd) {
            wx.setStorage({
              key: "password",
              data: HEAD.data.password
            })
          } else { 
            wx.setStorage({
              key: "password",
              data: ""
            })
          }
          wx.redirectTo({
            url: '../index/index'
          })
        } else {
          wx.showToast({
            title: '用户名或密码有误',
            icon: 'none',
            duration: 1500
          })
        }

      },
        function () {
          wx.showToast({
            title: '用户名或密码有误',
            icon: 'none',
            duration: 1500
          })

          // setTimeout(function () {
          //   wx.hideToast()
          // }, 2000)
        })
    }
  }),
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