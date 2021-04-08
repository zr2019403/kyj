const urlC = require('../../../utils/url.js');
const utilC = require('../../../utils/util.js');
var register = require('../../../scroll/refreshLoadRegister.js');
const gjCommon = require('../../../utils/gjCommon.js')
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '设备信息',
    objList: [],
    currentSize: 0,
    words: [],
    pageDesc: {},
    pageNo: 1,
    equipmentName: '',
    filldate: '',
    url: '',
    customB:'',
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
    var HEAD = this;
    register.register(HEAD);
    //获取objList
    HEAD.doLoadData(0, 14);
  },
  querySsData: utilC.throttle(function (options) {
    wx.navigateTo({
      url: '../realData/equRealData?equId='+options.currentTarget.dataset.id
    })
  }),
  customB: function (e) {
    this.setData({
      customB: e.detail.value,
    })
  },
  customSelect: function () {
    if (app.globalData.starRun == 1) {
      gjCommon.count_down();
    }
    this.setData({
      words: [],
      pageNo: 1
    })
    register.register(this);
    //获取objList
    this.doLoadData(0, 14);
  },

  doLoadData(currendSize, PAGE_SIZE) {
    wx.showLoading({
      title: 'loading...',
    });
    var that = this;
    var url;
    var userInfo = wx.getStorageSync('userInfo');
    var sessionKey = wx.getStorageSync('cookieKey');

      if (that.data.customB == '') {
        url = urlC.ip + '/equipmentController.do?wxEquList&openid=openid&pageSize=14&pageNo=' + that.data.pageNo+'&orgId='+userInfo.departid;
      } else if (that.data.customB != '') {
        url = urlC.ip + '/equipmentController.do?wxEquList&pageSize=14&pageNo=' + that.data.pageNo + '&customB=' + that.data.customB+'&orgId='+userInfo.departid;
      }
      utilC._get(utilC.replaceSpecialChar(url), {}, function success(res) {
        if (res.data != '') {
         
          let n = res.data.objList[0];
          var length = res.data.objList.length;
          if (n != null && n != undefined && n != '') {
            for (var i = 0; i < length; i++) {
              that.data.words.push(res.data.objList[i]);
            }
            that.data.pageNo = that.data.pageNo + 1;
            that.setData({
              pageNo: that.data.pageNo,
            });
          } else {
            wx.showToast({
              title: '暂无更多',
              icon: 'none',
              duration: 1000,
              mask: true
            })
          }
        } 
        var words = that.data.words;
        that.data.currentSize += res.data.objList.length;

        that.setData({
          words: words,
        });

        wx.hideLoading();
        register.loadFinish(that, true);
      }, function fail() {
        utilC.fail()
      });

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

  refresh: function () {
    this.setData({
      words: [],
      currentSize: 0,
      noMore: false,
      pageNo: 1
    });
    this.doLoadData(0, 14);
  },

  loadMore: function () {
    this.doLoadData(this.data.currentSize, 14);
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
      let a = "sdf";
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})