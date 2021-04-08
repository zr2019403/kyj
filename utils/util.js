const urlC = require('url.js')
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatDate = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  return [year, month, day].map(formatNumber).join('-')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function fail() {
  wx.showToast({

    title: '页面出错',

    icon: 'none',

    duration: 2000

  })

  setTimeout(function () {

    wx.hideToast()

  }, 2000)
}

function failRq() {
  wx.showToast({

    title: '页面出错',

    icon: 'none',

    duration: 2000

  })

  setTimeout(function () {

    wx.hideToast()

  }, 2000)
  wx.hideLoading();
  requestHandler.fail();
}

function scs() {
  wx.showToast({

    title: '保存成功',

    icon: 'success',

    duration: 2000

  })

  setTimeout(function () {

    wx.hideToast()

  }, 2000)
}

/**
 * get请求
 */
function _get(url, data, success, fail) {
  if (typeof data == "function") {
    fail = success
    success = data
    data = {}
  }
  wx.request({
    url: url,
    header: {'content-type': 'application/x-www-form-urlencoded',
    'Cookie': wx.getStorageSync('cookieKey')},
    data: data,
    success: success,
    fail: fail,
  })
}
/**
 * post请求
 */
function _post(url, data, success, fail) {
  if (typeof data == "function") {
    data = {}
    success = data
    fail = success
  }

  wx.request({
    url: url,
    // header: { 'content-type': 'application/json' },
    header: {'content-type': 'application/x-www-form-urlencoded',
             'Cookie': wx.getStorageSync('cookieKey')},
    method: 'post',
    data: data,
    success: success,
    fail: fail,
  })
}

function buttonClicked(self) {
  self.setData({
    buttonClicked: true
  })
  setTimeout(function () {
    self.setData({
      buttonClicked: false
    })
  }, 1000)
}

function throttle(fn, gapTime) {
  if (gapTime == null || gapTime == undefined) {
    gapTime = 2000
  }

  let _lastTime = null

  // 返回新的函数
  return function () {
    let _nowTime = + new Date()
    if (_nowTime - _lastTime > gapTime || !_lastTime) {
      fn.apply(this, arguments)   //将this和参数传给原函数
      _lastTime = _nowTime
    }
  }
}

function uploadImg(filePaths, length, success, groupId){
  var fileId = "";
  if (null != groupId && "" != groupId && undefined != groupId){
    fileId = groupId;
  }
    _get(urlC.ip + 'rcwh/fileGroup/mobileGroupId?groupId=' + fileId, null, function (result) {
    uploadDIY(filePaths, 0, length, result.data.data);
    fileId = result.data.data;
    success(fileId);
  });
}

function uploadDIY(filePaths, i, length, groupId, successUp, failUp) {
  if (length>0){
    wx.uploadFile({
      url: urlC.ip + 'formdata/mobileUpload?groupId=' + groupId,
      filePath: filePaths[i],
      name: 'file',
      success: (res) => {
        successUp++;
        
      },
      fail: (res) => {
        failUp++;
      },
      complete: () => {
        i++;
        if (i == length) {

        } else { //递归调用uploadDIY函数
          uploadDIY(filePaths, i, length, groupId, successUp, failUp);
        }
      }
    });
  }
}
//替换URL中特殊字符
function replaceSpecialChar(url) {
  url = url.replace(/"/g, '"');
  url = url.replace(/&/g, '&');
  url = url.replace(/</g, '<');
  url = url.replace(/>/g, '>');
  url = url.replace(/ /g, ' ');
  url = url.replace(/#/g, '');
  
  return url;
}

module.exports = {
  formatTime: formatTime,
  formatDate: formatDate,
  scs: scs,
  fail: fail,
  failRq: failRq,
  _get: _get,
  _post: _post,
  buttonClicked: buttonClicked,
  throttle: throttle,
  uploadDIY: uploadImg,
  replaceSpecialChar: replaceSpecialChar,
  
}