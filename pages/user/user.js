//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
  },
  gotoSettings:function(){
    wx.navigateTo({
      url: 'setting/setting'
    })
  }
})
