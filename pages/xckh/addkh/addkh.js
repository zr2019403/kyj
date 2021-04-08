// pages/qx/list/list.js
const urlC = require('../../../utils/url.js');
const utilC = require('../../../utils/util.js');
const imgsUploadC = require('../../../weui/imgsUpload.js')
const gjCommon = require('../../../utils/gjCommon.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    modleIncid: '', //现场考核样本点-设施内部编号
    inspection: '', //现场考核情况说明
    checkIncid: '', //附件查看,
    basicIncid: '',
    skassessdate: '',
    iscomplete:'',
    skassesstype:'',
    rootState: false,
    biztype: '',
    isSubmit:'',
    array: [],
    khss: [],
    zbsllx: ['完好率及清洁率', '亮灯率'],
    YorN: [{ id: '1', name: '否' }, { id: '2', name:'是'}],
    ZBFL: [
      { nbbh: '72F77B1C09D26017E050007F01006AE0', khdx: '照明'}, 
      { nbbh: '72F77B1C09D46017E050007F01006AE0', khdx: '垃圾中转站'}, 
      { nbbh: '72F77B1C09D56017E050007F01006AE0', khdx: '公共厕所'}, 
      { nbbh: '72F77B1C09D66017E050007F01006AE0', khdx: '废物箱（果皮箱）'}, 
      { nbbh: '72F77B1C09D76017E050007F01006AE0', khdx: '大件垃圾贮存分拣中心'}, 
      { nbbh: '72F77B1C09D86017E050007F01006AE0', khdx: '环卫保洁人员休息场所'}, 
      { nbbh: '72F77B1C09D96017E050007F01006AE0', khdx:'环境卫生车辆停车场'},
      ],
    index: 0,
    khidex: 0,
    zblxindex: 0,
    yorn: 0,
    zbflindex: 0,
    date: '',
    length0: 0,
    confirmState: true,
    filePath: '',
    maxLength: 8, //最多上传图片张数
    imagesList: [], //上传的图片数组-整改事件上传照片组
    da: {},
    groupId: ''
  },
  bindPickerChange: function (e) {
    this.setData({
      index: e.detail.value
    })
  },
  bindKhxxChange: function (e) {
    this.setData({
      khidex: e.detail.value
    })
  },
  bindZbsllxChange: function (e) {
    this.setData({
      zblxindex: e.detail.value
    })
  },
  bindYorNChange: function (e) {
    this.setData({
      yorn: e.detail.value
    })
  },
  bindZBFLChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value);
    this.setData({
      zbflindex: e.detail.value
    })
  },
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  jcsm: function (e) {
    this.setData({
      length0: e.detail.value.length,
      inspection: e.detail.value,
    })
  },
  cancel: function () {
    wx.navigateBack({
      delta: 1
    })
  },
  donext: utilC.throttle(function (options) {
    var that = this;
    if (that.data.date == '') {
      wx.showToast({
        title: '请选择考核日期',
        icon: 'none',
        duration: 1500
      })

      setTimeout(function () {
        wx.hideToast()
      }, 2000);
      return;
    }
    if (that.data.checkIncid == null || that.data.checkIncid == "") {
      if (that.data.inspection == '') {
        wx.showToast({
          title: '请填写备注',
          icon: 'none',
          duration: 1500
        })

        setTimeout(function () {
          wx.hideToast()
        }, 2000);
        return;
      }
    }
  
    if (that.data.iscomplete != "1") {
      that.setData({
        ['da.assesstype']: that.data.ZBFL[that.data.zbflindex].nbbh, //指标分类
        ['da.isquest']: that.data.YorN[that.data.yorn].id, //是否有问题
        ['da.assessdate']: that.data.date, //考核时间
        ['da.inspection']: that.data.inspection,
        ['da.modleIncid']: that.data.incid,
        ['da.basicIncid']: that.data.basicIncid,
        ['da.fjid']: that.data.groupId,
      })
      var userInfo = wx.getStorageSync('userInfo');
      var jsonString = JSON.stringify(that.data.da);
      utilC._post(urlC.ip + 'phone/khLive!editCheckPhone.do?modleIncid=' + that.data.incid + '&userCode=' + userInfo.usercode + '&checkIncid=' + that.data.checkIncid, jsonString, function success(res) {
        //图片上传
        // var filePaths = that.data.imagesList;
        // var length = that.data.imagesList.length;
        // var groupId = res.data.data.fjId;
        // utilC.uploadDIY(filePaths, length, function success() {
        var nbbhId = res.data.data.assessType;
        //var isSubmit = res.data.data.isSubmit;
        if ('' == that.data.checkIncid) {
          that.setData({
            checkIncid: res.data.data.incid,
          });
        }
        if ("null" == that.data.isSubmit) {
          that.setData({
            isSubmit: res.data.data.isSubmit,
          });
        }
        setTimeout(function () {
          wx.redirectTo({
            url: '../kfxz/kfxz?checkIncid=' + that.data.checkIncid + '&isSubmit=' + that.data.isSubmit + '&nbbh=' + nbbhId,
          })

        }, 1500);
        // }, groupId);
      }, function fail() {
        // utilC.fail()
      })

    } else {
      wx.redirectTo({
        url: '../kfxz/kfxz?checkIncid=' + that.data.checkIncid + '&isSubmit=' + that.data.isSubmit + '&nbbh=' + skassesstype,
      })
    }
  }),

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
    if (typeof (options.incid) != 'undefined' && options.incid != 'underfinded' && options.incid != '') {
      this.setData({
        incid: options.incid,
        facilityincid: options.facilityincid,
        inspection: options.inspection,
        checkIncid: options.checkIncid,
      });
    }
    var that = this;
    var userInfo = wx.getStorageSync('userInfo');
    utilC._get(urlC.ip + 'phone/khLive!liveKHList.do?userCode=' + userInfo.usercode + '&incid=' + that.data.incid, {}, function success(res) {
      if (undefined != res.data.objList[0].checkIncid) {
        that.setData({
          groupId: res.data.objList[0].checkIncid
        });
      }

      if (res.data.objList[0].basicName != undefined) {
        that.data.array.push(res.data.objList[0].basicName);
      }
      if (res.data.objList[0].facilityName != undefined) {
        that.data.khss.push(res.data.objList[0].facilityName);
      }


      var array = that.data.array;
      var khss = that.data.khss;

      that.setData({
        array: array,
        khss: khss,

      });
      if (res.data.objList[0].biztype != 'undefined' & res.data.objList[0].biztype != undefined & res.data.objList[0].biztype != '') {
        that.setData({
          biztype: res.data.objList[0].biztype,
        });
      }
      if (res.data.objList[0].checkIncid != 'undefined' & res.data.objList[0].checkIncid != undefined & res.data.objList[0].checkIncid != '') {
        that.setData({
          checkIncid: res.data.objList[0].checkIncid,
        });
      }
      if (res.data.objList[0].basicIncid != 'undefined' & res.data.objList[0].basicIncid != undefined & res.data.objList[0].basicIncid != '') {
        that.setData({
          basicIncid: res.data.objList[0].basicIncid,
        });
      }
      if (res.data.objList[0].iscomplete != 'undefined' & res.data.objList[0].iscomplete != undefined & res.data.objList[0].iscomplete != '') {
        that.setData({
          iscomplete: res.data.objList[0].iscomplete,
        });
      }
      if (res.data.objList[0].issubmit != 'undefined' & res.data.objList[0].issubmit != undefined & res.data.objList[0].issubmit != '') {
        that.setData({
          isSubmit: res.data.objList[0].issubmit,
        });
      }
      if (res.data.objList[0].skassesstype != 'undefined' & res.data.objList[0].skassesstype != undefined & res.data.objList[0].skassesstype != '') {
        that.setData({
          skassesstype: res.data.objList[0].skassesstype,
        });
      }
      if (res.data.objList[0].inspection != 'undefined' & res.data.objList[0].inspection != undefined & res.data.objList[0].inspection != '') {
        that.setData({
          inspection: res.data.objList[0].inspection,
          length0: res.data.objList[0].inspection.length,
        });
      }

      if (res.data.objList[0].zbsllx != undefined) {

        if (res.data.objList[0].zbsllx == '003001') {
          that.setData({
            zblxindex: 0
          });
        } else if (res.data.objList[0].zbsllx == '003002') {
          that.setData({
            zblxindex: 1
          });
        }

      }
      if (res.data.objList[0].isquest != undefined) {
        if (res.data.objList[0].isquest == '1') {
          that.setData({
            yorn: 0
          });
        } else if (res.data.objList[0].isquest == '2') {
          that.setData({
            yorn: 1
          });
        }
      }
      if (res.data.objList[0].skassessdate != undefined) {
        that.setData({
          date: res.data.objList[0].skassessdate.split(" ")[0]
        });
      }
      if (that.data.checkIncid != undefined) {

        for (var i = 0; i < res.data.photosArr.length; i++) {
          let pb = urlC.ip + 'app/samplephoto!viewPhone.do?groupId=' + res.data.photosArr[i].fileid;
          that.data.imagesList.push(pb);
        }
        var bb = that.data.imagesList;
        that.setData({
          imagesList: bb,
        })
      }
      if (res.data.objList[0].modleIncid != undefined & res.data.objList[0].modleIncid != '' & res.data.objList[0].modleIncid != 'undefined') {
        utilC._get(urlC.ip + "app/samassessment!zbflForJson.do", function success(res2) {
          that.setData({
            ZBFL: res2.data.data
          })
        })
      }




      if (that.data.iscomplete == "1") {
        wx.setNavigationBarTitle({
          title: '查看现场考核单',
        })
      } else {
        that.setData({
          rootState: true
        });
        wx.setNavigationBarTitle({
          title: '新增现场考核单',
        })
      }

    }, function fail() {
      utilC.fail()
    });
  },
  //上传图片
  uploader: function () {
    var that = this;
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
    console.log(index);
    console.log(images);
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
    var id = images[0].match('/download\/(.*)');
    if (null != id) {
      utilC._get(urlC.ip + "rcwh/fileList/delete/" + id[1], function () {
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