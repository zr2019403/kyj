// pages/xckh/khxz/kfxz.js
const urlC = require('../../../utils/url.js');
const utilC = require('../../../utils/util.js');
const gjCommon = require('../../../utils/gjCommon.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    checkIncid: '', //设施考核信息主键
    isSubmit: '',
    nbbh: '',
    bzState: false,
    kfdata: [],
    items: [{
      name: 'selected',
      value: false
    }],
    selected: '',
    kfList: [],
    dfList: [],
    zkf: '', //总扣分
    zdf: '', //总得分
    fs: 0, //分数
    imgState: false, //添加图片按钮显示状态
    index: 0,
    da: {},
    slist: [], //提交时的选中值
    beforeList: [], //载入时的选中值
    delList: [], //需要删除的值
  },


  kffj: function(e) {
    wx.redirectTo({
      url: '../khxq/khxq?nbbh=' + e.currentTarget.dataset.kfobj.nbbh + '&isSubmit=' + this.data.isSubmit + '&incid=' + this.data.checkIncid + '&kf=' + e.currentTarget.dataset.kfobj.kf + '&zbms=' + e.currentTarget.dataset.kfobj.zbms + '&pakhdx=' + e.currentTarget.dataset.kfobj.pakhdx + '&khdx=' + e.currentTarget.dataset.kfobj.khdx + '&khbz=' + e.currentTarget.dataset.kfobj.khbz,
    })
  },
  doprev: utilC.throttle(function(options) {
    //判断是否为新建状态
    var that = this;
    if (that.data.isSubmit == "2" || that.data.isSubmit == null || that.data.isSubmit == "") {

      that.setData({
        ['da.slist']: that.data.slist,
        ['da.delList']: that.data.beforeList,
      });
      var userInfo = wx.getStorageSync('userInfo');
      utilC._post(urlC.ip + 'phone/khLive!updateKfxq.do?checkIncid=' + that.data.checkIncid + '&userCode=' + userInfo.usercode, JSON.stringify(that.data.da), function success(res) {
        wx.reLaunch({
          url: '../xckh/xckh'
        })
      }, function fail() {
        utilC.fail()
      });
    }
  }),
  submit: utilC.throttle(function(options) {
    //判断是否为新建状态
    var that = this;
    if (that.data.isSubmit == "2" || that.data.isSubmit == null || that.data.isSubmit == "") {

      that.setData({
        ['da.slist']: that.data.slist,
        ['da.delList']: that.data.beforeList,
      });
      var userInfo = wx.getStorageSync('userInfo');
      utilC._post(urlC.ip + 'phone/khLive!updateKfxq.do?checkIncid=' + that.data.checkIncid + '&userCode=' + userInfo.usercode +'&type=submit', JSON.stringify(that.data.da), function success(res) {
        wx.reLaunch({
          url: '../xckh/xckh'
        })
      }, function fail() {
        utilC.fail()
      });
    }
  }),
  checkboxChange(e) {
    // console.log('checkboxChange e:', e);
    //判断是否为新建状态
    var that = this;
    if (that.data.isSubmit == "2" || that.data.isSubmit == null || that.data.isSubmit == "") {
      let string = "kfdata[" + e.currentTarget.dataset.index + "].selected"
      this.setData({
        [string]: !this.data.kfdata[e.currentTarget.dataset.index].selected
      });

      let src = "kfdata[" + e.currentTarget.dataset.index + "].src"
      if (!e.currentTarget.dataset.kfse) {
        that.setData({
          [src]: '../../images/checked.png'
        })
      } else {
        that.setData({
          [src]: '../../images/unchecked.png'
        })
      }

      let detailValue = this.data.kfdata.filter(it => it.selected).map(it => it.kf);
      // console.log('所有选中的值为：', detailValue);
      let detail = this.data.kfdata.filter(it => it.selected).map(it => it);
      that.setData({
        slist: detail,
      })
      // console.log('所有选中：', that.data.da);
      var aa = 0;
      for (var i = 0; i < detailValue.length; i++) {
        aa += detailValue[i];
      }
      var that = this;
      that.setData({
        fs: aa
      })
    }

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (app.globalData.starRun == 1) {
      gjCommon.count_down();
      wx.setKeepScreenOn({
        keepScreenOn: true
      })
    }
    var that = this;
    if (typeof(options.checkIncid) != 'undefined' && options.checkIncid != 'underfinded' && options.checkIncid != '') {
      that.setData({
        checkIncid: options.checkIncid,
        isSubmit: options.isSubmit,
        nbbh: options.nbbh,
      });
    }
    //判断是否为新建状态
    if (that.data.isSubmit == "2" || that.data.isSubmit == null || that.data.isSubmit == '') {
      utilC._get(urlC.ip + 'phone/khLive!listAllKfx.do?checkIncid=' + that.data.checkIncid + '&isSubmit=' + that.data.isSubmit + '&nbbh=' + that.data.nbbh, {}, function success(res) {
        that.setData({
          kfdata: res.data.data,
        });
        //添加属性
        let array = [];
        res.data.data.map((item, index) => {
          array.push(
            Object.assign({}, item, {
              src: '../../images/unchecked.png',
            })
          )
        });
        that.setData({
          kfdata: array,
        });
        let df = 0;
        for (var j = 0; j < that.data.kfdata.length; j++) {
          if (that.data.kfdata[j].selected == true) {
            that.data.kfdata[j].src = '../../images/checked.png';
            df += that.data.kfdata[j].kf;
          }
        }

        var aa = that.data.kfdata;
        that.setData({
          kfdata: aa,
          fs: df,
        });
        for (var i = 0; i < that.data.kfdata.length; i++) {
          if (that.data.kfdata[i].selected == true) {
            that.data.beforeList.push(that.data.kfdata[i])
          }
        }
        let before = that.data.beforeList;
        that.setData({
          beforeList: before
        });
      }, function fail() {
        utilC.fail()
      });
      that.setData({
        bzState: true,
      })
    } else {
      utilC._get(urlC.ip + 'phone/khLive!getKfx.do?checkIncid=' + that.data.checkIncid, {}, function success(res) {

        that.setData({
          kfdata: res.data.data,
        });
        //添加属性
        let array = [];
        res.data.data.map((item, index) => {
          array.push(
            Object.assign({}, item, {
              selected: true,
              src: '../../images/checked.png',
            })
          )
        });
        that.setData({
          kfdata: array,
        });
        let bb = 0;
        for (var j = 0; j < array.length; j++) {
          bb += array[j].kf;
        }
        that.setData({
          fs: bb,
        })
      }, function fail() {
        utilC.fail()
      });
    }

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})