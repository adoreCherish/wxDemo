//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
  	userInfoImg: ''
  },
  onLoad:function(){
  	console.log(app.globalData.userInfo.avatarUrl)
  	this.setData({
  		userInfoImg:app.globalData.userInfo.avatarUrl
  	})
  },
  gotoSettings:function(){
    wx.navigateTo({
      url: 'setting/setting'
    })
  }
})
