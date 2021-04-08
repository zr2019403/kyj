const urlC = require('../../../utils/url.js');
const utilC = require('../../../utils/util.js');
var register = require('../../../scroll/refreshLoadRegister.js');
const gjCommon = require('../../../utils/gjCommon.js');
const util = require('../../../utils/util.js');
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    words: [],
    title: '实时数据',
    loading: ''
  },

  onLoad:function(options){
    var that = this;
    var equId = options.equId;

    wxRealData(equId,that);

    // console.log('123')

    that.setData({
      loading : setInterval(function(){
        wxRealData(equId,that);
        // var url = urlC.ip + '/zttController.do?wxRealData&equId=' + equId;
        // utilC._get(utilC.replaceSpecialChar(url), {}, function success(res) {
        //   if (res.data != '') {
        //     var words = res.data;
        //   that.setData({
        //     words: words,
        //   });
        //   } 
        // }, function fail() {
        //   utilC.fail()
        // })
      },2000)
    })
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
    // console.log("123");
    let loading = this.data.loading;
    // console.log(loading);
    clearInterval(loading)
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

  },

  startEqu: function (options) {
    debugger;
    var that = this;
    var equId = that.options.equId
    var url = urlC.ip + '/zttController.do?wxCtrlModel&equId=' + equId;
    utilC._post(utilC.replaceSpecialChar(url), {}, function success(res) {
    if (res.data != '') {
      if (res.data.controlModel !== "0") {
        wx.showModal({
          title: '当前不是手动模式，无法手动控制设备！',     
        })
      } else {
        var urls = urlC.ip + '/messageController/wxsend.do?equId=' + equId+'&cmd=1';
        wx.showModal({
          title: '是否启动！', 
          success: function (res) {
            if (res.confirm) {//这里是点击了确定以后
              utilC._post(utilC.replaceSpecialChar(urls), {}, function success(res) {
                if (res.data.message == '1') {
                  wx.showModal({
                    title: '命令下发成功！', 
                    content: '',
                    showCancel: false
                  })
              } else if (res.data.message == '0') {
                wx.showModal({
                  title: '设备正处于启动或运行状态，请不要重复启动', 
                  content: '',
                  showCancel: false
                })
              } else if (res.data.message == 'f') {
                wx.showModal({
                  title: '当前设备正处于故障状态，您不能进行该操作！', 
                  content: '',
                  showCancel: false
                })
              }
              }, function fail() {
                utilC.fail()
              });
            } else {//这里是点击了取消以后
    
            }
          }   
        })
      }
    } 
  }, function fail() {
    utilC.fail()
  });
  },  
  stopEqu: function (options) {
    var that = this;
    var equId = that.options.equId

    var url = urlC.ip + '/zttController.do?wxCtrlModel&equId=' + equId;
    utilC._post(utilC.replaceSpecialChar(url), {}, function success(res) {
    if (res.data != '') {
      if (res.data.controlModel !== 0) {
        wx.showModal({
          title: '当前不是手动模式，无法手动控制设备！',     
        })
      } else {
        var urls = urlC.ip + '/messageController/wxsend.do?equId=' + equId+'&cmd=2';
        wx.showModal({
          title: '是否停止！', 
          success: function (res) {
            if (res.confirm) {//这里是点击了确定以后
              utilC._post(utilC.replaceSpecialChar(urls), {}, function success(res) {
                if (res.data.message == '1') {
                  wx.showModal({
                    title: '命令下发成功！', 
                    content: '',
                    showCancel: false
                  })
              } else if (res.data.message == '0') {
                wx.showModal({
                  title: '设备正处于停止状态，请不要重复停止', 
                  content: '',
                  showCancel: false
                })
              } else if (res.data.message == 'f') {
                wx.showModal({
                  title: '当前设备正处于故障状态，您不能进行该操作！', 
                  content: '',
                  showCancel: false
                })
              }
              }, function fail() {
                utilC.fail()
              });
            } else {//这里是点击了取消以后
      
            }
          }   
        })
      }
    } 
  }, function fail() {
    utilC.fail()
  }); 

  },
  jzEqu: function (options) {
    var that = this;
    var equId = that.options.equId
    var url = urlC.ip + '/zttController.do?wxCtrlModel&equId=' + equId;
    utilC._post(utilC.replaceSpecialChar(url), {}, function success(res) {
    if (res.data != '') {
      if (res.data.controlModel !== 0) {
        wx.showModal({
          title: '当前不是手动模式，无法手动控制设备！',     
        })
      } else {
        var urls = urlC.ip + '/messageController/wxsend.do?equId=' + equId+'&cmd=3';
        wx.showModal({
          title: '是否加载！', 
          success: function (res) {
            if (res.confirm) {//这里是点击了确定以后
              utilC._post(utilC.replaceSpecialChar(urls), {}, function success(res) {
                if (res.data.message == '1') {
                  wx.showModal({
                    title: '命令下发成功！', 
                    content: '',
                    showCancel: false
                  })
              } else if (res.data.message == 'f') {
                wx.showModal({
                  title: '当前设备正处于故障状态，您不能进行该操作！', 
                  content: '',
                  showCancel: false
                })
              }
              }, function fail() {
                utilC.fail()
              });
            } else {//这里是点击了取消以后
    
            }
          }   
        })
      }
    } 
  }, function fail() {
    utilC.fail()
  });  
   
  },
  xzEqu: function (options) {
    var that = this;
    var equId = that.options.equId
    var url = urlC.ip + '/zttController.do?wxCtrlModel&equId=' + equId;
    utilC._post(utilC.replaceSpecialChar(url), {}, function success(res) {
    if (res.data != '') {
      if (res.data.controlModel !== 0) {
        wx.showModal({
          title: '当前不是手动模式，无法手动控制设备！',     
        })
      } else {
        var urls = urlC.ip + '/messageController/wxsend.do?equId=' + equId+'&cmd=4';
    wx.showModal({
      title: '是否卸载！', 
      success: function (res) {
        if (res.confirm) {//这里是点击了确定以后
          utilC._post(utilC.replaceSpecialChar(urls), {}, function success(res) {
            if (res.data.message == '1') {
              wx.showModal({
                title: '命令下发成功！', 
                content: '',
                showCancel: false
              })
          } else if (res.data.message == 'f') {
            wx.showModal({
              title: '当前设备正处于故障状态，您不能进行该操作！', 
              content: '',
              showCancel: false
            })
          }
          }, function fail() {
            utilC.fail()
          });
        } else {//这里是点击了取消以后

        }
      }   
    })
      }
    } 
  }, function fail() {
    utilC.fail()
  }); 
  },  
  fwEqu: function (options) {
    var that = this;
    var equId = that.options.equId
    var url = urlC.ip + '/zttController.do?wxCtrlModel&equId=' + equId;
    utilC._post(utilC.replaceSpecialChar(url), {}, function success(res) {
    if (res.data != '') {
      if (res.data.controlModel !== 0) {
        wx.showModal({
          title: '当前不是手动模式，无法手动控制设备！',     
        })
      } else {
        var urls = urlC.ip + '/messageController/wxsend.do?equId=' + equId+'&cmd=5';
    wx.showModal({
      title: '是否复位！', 
      success: function (res) {
        if (res.confirm) {//这里是点击了确定以后
          utilC._post(utilC.replaceSpecialChar(urls), {}, function success(res) {
            if (res.data.message == '1') {
              wx.showModal({
                title: '命令下发成功！', 
                content: '',
                showCancel: false
              })
          } else if (res.data.message == 'f') {
            wx.showModal({
              title: '当前设备正处于故障状态，您不能进行该操作！', 
              content: '',
              showCancel: false
            })
          }
          }, function fail() {
            utilC.fail()
          });
        } else {//这里是点击了取消以后

        }
      }   
    })
      }
    } 
  }, function fail() {
    utilC.fail()
  }); 
  }
})

function getCtrlModel(equId) {
  
}

function wxRealData(equId,that) {
  var url = urlC.ip + '/zttController.do?wxRealData&equId=' + equId;
  var words;
  utilC._get(utilC.replaceSpecialChar(url), {}, function success(res) {
    if (res.data != '') {
      var words = res.data;
    that.setData({
      words: words,
    });
    } 
  }, function fail() {
    utilC.fail()
  })
}