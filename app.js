//app.js

App({
  onLaunch: function () {
    var _this = this;
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.globalData.platform = res.platform
        let totalTopHeight = 68
        if (res.model.indexOf('iPhone X') !== -1) {
          totalTopHeight = 88
        } else if (res.model.indexOf('iPhone') !== -1) {
          totalTopHeight = 64
        }
        that.globalData.statusBarHeight = res.statusBarHeight
        that.globalData.titleBarHeight = totalTopHeight - res.statusBarHeight
      },
      failure() {
        that.globalData.statusBarHeight = 0
        that.globalData.titleBarHeight = 0
      }
    });
    
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if (res.code) {
     
          wx.request({
            // url: "http://127.0.0.1:8080/zgoa/phone/phone!getOpenId.do?code=" + res.code,
            // url: "http://192.168.1.101:8082/jeecg/loginController.do?login&code=" + res.code,
            url: "http://192.168.1.196:8082/jeecg/loginController.do?login&code=" + res.code,
            method: 'post',
            header: { 'Content-Type': 'application/x-www-form-urlencoded'},
            success: function (response) {
              wx.setStorageSync('sessionKey', response.data.session_key);
              wx.setStorageSync('app_openid', response.data.openid)
            }
          })

        } else {
          wx.showToast({
            title: '登录失败',
            icon: 'none',
            duration: 1500
          })

          setTimeout(function () {
            wx.hideToast()
          }, 2000)
        }
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              console.log(this.globalData)
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  //第一种底部  
  editTabBar: function () {
    //使用getCurrentPages可以获取当前加载中所有的页面对象的一个数组，数组最后一个就是当前页面。

    var curPageArr = getCurrentPages();    //获取加载的页面
    var curPage = curPageArr[curPageArr.length - 1];    //获取当前页面的对象
    var pagePath = curPage.route;    //当前页面url
    if (pagePath.indexOf('/') != 0) {
      pagePath = '/' + pagePath;
    }

    var tabBar = this.globalData.tabBar;
    for (var i = 0; i < tabBar.list.length; i++) {
      tabBar.list[i].active = false;
      if (tabBar.list[i].pagePath == pagePath) {
        tabBar.list[i].active = true;    //根据页面地址设置当前页面状态    
      }
    }
    curPage.setData({
      tabBar: tabBar
    });
  },
  //第二种底部，原理同上
  editTabBar1: function () {
    var curPageArr = getCurrentPages();
    var curPage = curPageArr[curPageArr.length - 1];
    var pagePath = curPage.route;
    if (pagePath.indexOf('/') != 0) {
      pagePath = '/' + pagePath;
    }
    var tabBar = this.globalData.tabBar1;
    for (var i = 0; i < tabBar.list.length; i++) {
      tabBar.list[i].active = false;
      if (tabBar.list[i].pagePath == pagePath) {
        tabBar.list[i].active = true;
      }
    }
    curPage.setData({
      tabBar: tabBar
    });
  },
  globalData: {
    //第一种底部导航栏显示
    tabBar: {
      "color": "#9E9E9E",
      "selectedColor": "#0079D6",
      "backgroundColor": "#F6F6F6",
      "list": [
        {
          "pagePath": "/pages/index/index",
          "text": "首页",
          "iconPath": "/pages/images/home.png",
          "selectedIconPath": "/pages/images/homeClick.png",
          "clas": "menu-item",
          "selectedColor": "#0079D6",
          active: false
        },
        {
          "pagePath": "/pages/mine/mine",
          "text": "我的",
          "iconPath": "/pages/images/me.png",
          "selectedIconPath": "/pages/images/meClick.png",
          "selectedColor": "#0079D6",
          "clas": "menu-item1",
          active: false
        }
      ],
      "position": "bottom"
    },
    //第二种底部导航栏显示
    tabBar1: {
      "color": "#9E9E9E",
      "selectedColor": "#0079D6",
      "backgroundColor": "#F6F6F6",
      "list": [
        {
          "pagePath": "/pages/index/index",
          "text": "首页",
          "iconPath": "/pages/images/home.png",
          "selectedIconPath": "/pages/images/homeClick.png",
          "selectedColor": "#0079D6",
          "clas": "menu-item",
          active: false
        },
        {
          "pagePath": "/pages/mine/mine",
          "text": "我的",
          "iconPath": "/pages/images/me.png",
          "selectedIconPath": "/pages/images/meClick.png",
          "selectedColor": "#0079D6",
          "clas": "menu-item1",
          active: false
        }
      ],
      "position": "bottom"
    },
    userInfo: null,
    countTooGetLocation: 0,
    starRun: 0,
    time: 0,
    points: [],
    statusBarHeight: 0
  }
})