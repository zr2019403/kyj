//index.js
//获取应用实例
const app = getApp()
const urlC = require('../../utils/url.js')
const utilC = require('../../utils/util.js')
const network = require('../../utils/network.js')
const gjCommon = require('../../utils/gjCommon.js')

Page({
  data: {
    testda: {},
    objFirst: {},
    num1: 0,//待办数字
    num2: 0,//巡查数字
    num3: 0,//抢险数字
    flag1: false,
    flag2: false,
    flag3: false,
    buttonClicked: false,
    pageParam: '',
    text: "开启",
    unitType: '',
    unitCode: '',
    pageState: false,//是否为日巡夜巡人员
    imgSrc: 'btn_on.png',//默认显示开启状态图片\
    // systemInfo: true,//iOS或Android(true)
  },
  // frist: function () {
  //   var that = this;
  //   if (that.data.objFirst.nodeName != null) {
  //     var objFirst = that.data.objFirst;
  //     wx.navigateTo({
  //       url: '../../' + objFirst.extendMethod + '?flowInstId=' + objFirst.flowInstId + '&nodeCode=' + objFirst.nodeCode + '&nodeName=' + objFirst.nodeName + '&nodeInstId=' + objFirst.nodeInstId + '&userCode=' + objFirst.userCode + '&rescueid=' + objFirst.rescueid,
  //     })
  //   }
  // },
  onShow: function () {
    app.editTabBar(); //显示自定义的底部导航
  },
  //待办事项总条数跳转至列表
  // xq: utilC.throttle(function (options) {
  //   wx.reLaunch({
  //     url: '../daiBan/list/list'
  //   });
  // }),
  //设施查询
  // clickrw: utilC.throttle(function (options) {
  //   var that = this;
  //   if (that.data.unitCode != 'D00005') {
  //     wx.reLaunch({
  //       url: '../rw/list/list'
  //     })
  //   }
  // }
  // ),
  
  //上报
  clicksb: utilC.throttle(function (options) {
     var openid = wx.getStorageSync("app_openid");
     
     utilC._post('http://192.168.1.196:8082/jeecg/zttController.do?toListenPage', {
        userName: '',
        password: '',
        openid:'openid'
      },function(res){

      },function(){

      })
  },10000),
  //现场考核
  clickkh: utilC.throttle(function (options) {
    wx.reLaunch({
      url: '../xckh/xckh/xckh'
    })
  }),

  //抢修
  
  //地图查询
  clickdt: utilC.throttle(function (options) {
    wx.reLaunch({
      url: '../dtShow/dtShow'
    })
  }),
  queryEquList: utilC.throttle(function (options) {
    wx.navigateTo({
      url: '../equipment/list/equipmentInfo'
    })
  }),
  sbclick: function () {
    wx.reLaunch({
      url: '../sf/list/equipmentInfo'
    })
  },
 
  onLoad: function (options) {
    if (app.globalData.starRun == 1) {
      if (this.data.pageState) {
        this.setData({
          imgSrc: 'btn_off.png',
        });
      } else {
        this.setData({
          text: "关闭",
        });
      }
      gjCommon.count_down();
      wx.setKeepScreenOn({
        keepScreenOn: true
      })
    }
    var that = this;
    // wx.getSystemInfo({
    //   success: function (res) {
    //     if (res.platform == "devtools") {
    //                   //PC
    //     } else if (res.platform == "ios") {
    //       that.setData({
    //         systemInfo: false, 
    //       })
    //     } else if (res.platform == "android") {
    //       that.setData({
    //         systemInfo: true,
    //       })
    //     }
    //   }
    // });
    if (typeof (options.pageParam) != 'undefined') {
      let pageParam = options.pageParam;
      if (pageParam != null || pageParam != '') {
        that.setData({
          pageParam: pageParam,
        })
      }
    }
    var userInfo = wx.getStorageSync('userInfo');
    if (userInfo != 'undefined' && userInfo != '') {
      that.setData({
        unitType: "",
        unitCode: ""
      })
      if (userInfo.userRYman != undefined) {
        if (userInfo.userRYman) {
          that.setData({
            pageState: true,
          })
        }
      }
    }

  }
})