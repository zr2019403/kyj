// pages/xckh/khxq/khxq.js
const utilC = require('../../../utils/util.js');
const urlC = require('../../../utils/url.js')
const imgsUploadC = require('../../../weui/imgsUpload.js')
const gjCommon = require('../../../utils/gjCommon.js')
const app = getApp()
Page({
  

  /**
   * 页面的初始数据
   */
  data: {
    nbbh:'',
    incid:'',
    biztype:'',
    kf: '',
    zbms: '',
    zbmc: '',
    khdx: '',
    khbz: '',
    memo: '',
    da:{},
    state:false,
    imagesList: [], //图片载入数组
    maxLength: 8, //最多上传图片张数
    groupId: ''
    
  },

  jcsm: function (e) {
    this.setData({
      length0: e.detail.value.length,
      memo: e.detail.value,
    })
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
    var that=this;
    if (typeof (options.isSubmit) != 'undefined' && options.isSubmit != 'underfinded' && options.isSubmit != '') {
      that.setData({
        isSubmit: options.isSubmit,
      });
    }
    if (that.data.isSubmit == "2" || that.data.isSubmit == null || that.data.isSubmit == "") {
      that.setData({
        state: true,
      });
    }
    if (typeof (options.nbbh) != 'undefined' && options.nbbh != 'underfinded' && options.nbbh != '') {
      that.setData({
        nbbh: options.nbbh,
      });
    }
    if (typeof (options.incid) != 'undefined' && options.incid != 'underfinded' && options.incid != '') {
      that.setData({
        incid: options.incid,
        kf: options.kf,
        zbms: options.zbms,
        pakhdx: options.pakhdx,
        khdx: options.khdx,
        khbz: options.khbz,
      });
    }
    var userInfo = wx.getStorageSync('userInfo');
    utilC._post(urlC.ip + 'phone/khLive!fjByNbbh.do?incid=' + that.data.incid + '&nbbh=' + that.data.nbbh + '&userCode=' + userInfo.usercode,JSON.stringify(that.data.da),function success(res){
      if (res.data!= "") {
      
          if (undefined != res.data.memo) {
            that.setData({
              memo: res.data.memo
            });
          }
          if (undefined != res.data.fjid) {
            that.setData({
              groupId: res.data.fjid
            });
          }
          if (res.data.photosArr != undefined) {

            for (var i = 0; i < res.data.photosArr.length; i++) {
              let pa = urlC.ip + 'phone/fileGroup!download.do?fileid=' + res.data.photosArr[i].fileid;
              that.data.imagesList.push(pa);
            }
            var aa = that.data.imagesList;
            that.setData({
              imagesList: aa,
            })
          }
        
      }

    },function fail(){utilC.fail()})
  },
  doprev:function(){
    var that=this;
    that.setData({
      ['da.incid']: that.data.incid,
      ['da.kf']: that.data.kf,
      ['da.zbms']: that.data.zbms,
      ['da.khdx']: that.data.khdx,
      ['da.khbz']: that.data.khbz,
      ['da.memo']: that.data.memo,
      ['da.fjid']: that.data.groupId,
    });
    var userInfo = wx.getStorageSync('userInfo');
    utilC._post(urlC.ip + 'phone/khLive!khxzFjSave.do?incid=' + that.data.incid + '&nbbh=' + that.data.nbbh + '&userCode=' + userInfo.usercode, JSON.stringify(that.data.da), function success(res) {
      // console.log(res.data);
      // that.setData({
      //   fjid: res.data.data
      // })
      //图片上传
      // var filePaths = that.data.imagesList;
      // var length = that.data.imagesList.length;
      // var groupId = that.data.fjid;
      // utilC.uploadDIY(filePaths, length, function success() {
      //   wx.showToast({
      //     title: '保存成功',
      //   })
        setTimeout(function () {

          wx.hideToast();
          wx.navigateBack({
            delta: 1
          })

        }, 1500);
      // }, groupId);
    }, function fail() { utilC.fail() })
    
  },

  //上传图片
  uploader: function () {
    var that = this;
    var userInfo = wx.getStorageSync('userInfo');
    if ('' == that.data.groupId || undefined == that.data.groupId) {
      utilC._get(urlC.ip + "phone/fileGroup!createMGroupId.do", function success(res) {
       
        that.setData({
          groupId: res.data.groupId
        })
      })
    }
    imgsUploadC.uploader(this);
  },
  //预览图片
  previewImage: function (e) {
    var index = e.currentTarget.dataset.index;
    var images = this.data.imagesList;
    wx.previewImage({
      current: images[index],
      urls: this.data.imagesList
    })
  },
  //删除图片
  delete: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    var images = that.data.imagesList;
    var id = images[0].match(/\?fileid=(.*)/);
    if (null != id) {
      utilC._get(urlC.ip + "phone/fileGroup!deletePic.do?fileid=" + id[1], function () {
        images.splice(index, 1);
        that.setData({
          imagesList: images
        });
      })
    } else {
      images.splice(index, 1);
      that.setData({
        imagesList: images
      });
    }
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