// components/component/component.js
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    innerText: {
      type: String,
      value: 'default value',
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    statusBarHeight: app.globalData.statusBarHeight,
    someData: {}
  },

  /**
   * 组件的方法列表
   */
  methods: {
    customMethod: function () { }
  }
})
