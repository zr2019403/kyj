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
    title: '已完成考核样本查看',
    objList: [],
    currentSize: 0,
    words: [],
    pageDesc: {},
    pageNo: 1,
    roadname: '',
    filldate: '',
    url: '',
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
    HEAD.doLoadData(0, 7);
  },
  road: function (e) {
    this.setData({
      roadname: e.detail.value,
    })
  },
  roadSelect: function () {
    if (app.globalData.starRun == 1) {
      gjCommon.count_down();
    }
    this.setData({
      words: [],
      pageNo: 1
    })
    register.register(this);
    //获取objList
    this.doLoadData(0, 7);
  },

  doLoadData(currendSize, PAGE_SIZE) {
    wx.showLoading({
      title: 'loading...',
    });
    var that = this;
    var url;
    var userInfo = wx.getStorageSync('userInfo');
    setTimeout(function () {
      var length = currendSize + PAGE_SIZE;
      if (that.data.roadname == '') {
        url = urlC.ip + 'phone/khLive!liveYwcKHList.do?userCode=' + userInfo.usercode + '&pageSize=7&pageNo=' + that.data.pageNo;
      } else if (that.data.roadname != '') {
        url = urlC.ip + 'phone/khLive!liveYwcKHList.do?roadname=' + that.data.roadname + '&userCode=' + userInfo.usercode + '&pageSize=7&pageNo=' + that.data.pageNo;
      }
      utilC._get(utilC.replaceSpecialChar(url), {}, function success(res) {
        let r = that.data.pageNo * PAGE_SIZE;
        if (res.data != '') {
          let n = res.data.objList[0];
          if (length <= r && n != null && n != undefined && n != '') {
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
        that.data.currentSize += PAGE_SIZE;

        that.setData({
          words: words,
        });

        wx.hideLoading();
        register.loadFinish(that, true);
      }, function fail() {
        utilC.fail()
      })

    }, 0);
  },
  //模拟刷新数据
  refresh: function () {

    this.setData({
      words: [],
      currentSize: 0,
      noMore: false,
      pageNo: 1
    });
    this.doLoadData(0, 7);
  },
  //模拟加载更多数据
  loadMore: function () {
    this.doLoadData(this.data.currentSize, 7);
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
    app.editTabBar1(); //显示自定义的底部导航
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
    //   url: '/pages/index/index',
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