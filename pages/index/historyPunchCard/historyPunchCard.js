//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
  	historyList:[]
  },
  onLoad:function(){
  	this.setData({
  		historyList:[{
  			'stageContentName':'我是活动打卡名1',
  			'stageContentContent':'我是介绍1',
  			'stageMustChoose':false
  		},{
  			'stageContentName':'我是活动打卡名2',
  			'stageContentContent':'我是介绍2',
  			'stageMustChoose':true
  		},{
        'stageContentName':'我是历史',
        'stageContentContent':'我是介绍1',
        'stageMustChoose':false
      }]
  	})
  },
  deleteFunc:function(e){
  	console.log('删除第' + e.target.dataset.index + '个')
  }
})
