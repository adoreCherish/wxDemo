//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
  	checked:true,
  	changeSetting:true,
  	lists: [{
      "name" : "CN",
    	"inputTitle" : '公司名称:',
    	"placeholder" : "请输入公司名称",
      "maxlength" : "5",
      "type": "text"
    },{
      "name" : "PN",
    	"inputTitle" : '项目名称:',
    	"placeholder" : "请输入项目名称",
      "maxlength" : "10",
      "type": "text"
    }]
  },
  checkCode:function(){
  	this.data.checked = !this.data.checked
  	this.setData({
  		checked:this.data.checked
  	})
  },
  changeSetting:function(){
  	this.setData({
  		changeSetting:true
  	})
  },
  finishFunc:function(){
  	this.setData({
  		changeSetting:false
  	})
  }
})
