const urlC = require('../utils/url.js');

/**
 * 上传图片预览插件
 * context 为调用页面
 * json为注册回调事件
 */

//图片上传
function uploader(context, json) {
  
  let imagesList = context.data.imagesList;
  let maxLength = context.data.maxLength;
  let maxSize = context.data.maxSize;
  let flag = context.data.flag;
  if (imagesList == null || imagesList == '' || imagesList == undefined) {
    imagesList = [];
  }
  if (maxSize==null||maxSize==''||maxSize==undefined){
    maxSize = 1024 * 1024;
  }
  if (typeof (flag)!=undefined){
    flag=true;
  }
  context.setData({
    imagesList: imagesList,
    maxSize: maxSize,
    maxLength: maxLength,
    flag : flag,
  });
  wx.chooseImage({
    count: 6, //最多可以选择的图片总数
    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
    success: function(res) {

      for (let i = 0; i < res.tempFiles.length; i++) {
        if (res.tempFiles[i].size > maxSize) {
          flag = false;
         
          wx.showModal({
            content: '图片太大，不允许上传',
            showCancel: false,
            success: function(res) {
              if (res.confirm) {
               
              }
            }
          });
        }
      }

      if (res.tempFiles.length > maxLength) {
        
        wx.showModal({
          content: '最多能上传' + maxLength + '张图片',
          showCancel: false,
          success: function(res) {
            if (res.confirm) {
              
            }
          }
        })
      }
      if (context.data.imagesList.length >= maxLength) {
        
        wx.showModal({
          content: '最多能上传' + maxLength + '张图片',
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
             
            }
          }
        })
      }
      if (flag == true && res.tempFiles.length <= maxLength && context.data.imagesList.length<maxLength) {
        // context.data.imagesList.push(res.tempFilePaths)
        var myca = new Array()
        for (var i=0;i< context.data.imagesList.length;i++){
          if (context.data.imagesList[i].length!=0){
            res.tempFilePaths.push(context.data.imagesList[i])
          }
        }
        
        myca = res.tempFilePaths;
        context.setData({
          imagesList: myca
        })
        for (let j = 0; j < res.tempFiles.length; j++) {
        wx.uploadFile({
          url: urlC.ip + 'phone/formData!mobileUpload.do?groupId=' + context.data.groupId + '&incid=' + context.data.incid + '&objectype=KH-KFXZ' ,
          filePath: res.tempFiles[j].path,
          name: 'file',
          success: (res) => {
            console.log("上传成功！");

          },
          fail: (res) => {
            console.log("上传失败！");
          }
        })
        }
        
      }
     
    },
    fail: function(res) {
      
    }
  })

}

module.exports = {
  uploader: uploader,
}