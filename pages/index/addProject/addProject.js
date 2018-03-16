//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    lists: [{
      "name" : "CN",
    	"inputTitle" : '公司名称',
    	"placeholder" : "请输入公司名称",
      "maxlength" : "5",
      "type": "text"
    },{
      "name" : "PN",
    	"inputTitle" : '项目名称',
    	"placeholder" : "请输入项目名称",
      "maxlength" : "10",
      "type": "text"
    }],
    time: [{
      "name" : "CN",
      // "inputTitle" : '公司名称',
      "placeholder" : "请选择开始时间",
      // "maxlength" : "5",
      "type": "text",
      "hasArrow": true
    },{
      "name" : "PN",
      // "inputTitle" : '项目名称',
      "placeholder" : "请选择结束时间",
      // "maxlength" : "10",
      "type": "text",
      "hasArrow": true
    }],
    submitAllData: []
  },
  getInputVal: function(e) {
    console.log(e.detail)
    this.data.submitAllData.push(e.detail)
  },
  formSubmit: function (){
    var dataLength = this.data.submitAllData.reduce((p, k) =>(p[k.name]++ || (p[k.name] = 1), p), {})
    var index = ''
    var submitData = []
    for(var key in dataLength){
      console.log(key)
      if(dataLength[key]>1){
        console.log(key)
        for (var i=0;i<this.data.submitAllData.length;i++) {
          if(this.data.submitAllData[i].name === key ){
            index = i
          }
        }
        submitData.push({'name':this.data.submitAllData[index].name,'value':this.data.submitAllData[index].value})
      }
      else {
        for (var i=0;i<this.data.submitAllData.length;i++) {
          if(this.data.submitAllData[i].name === key){
            submitData.push({'name':this.data.submitAllData[i].name,'value':this.data.submitAllData[i].value})
          }
        }
      }
    }
    console.log(submitData)
  }
})
