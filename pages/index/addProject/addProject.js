//index.js
//获取应用实例
const app = getApp()
const uploadFileUrl = require('../../../config').uploadFileUrl
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
    submitAllData: [],
    startTime: '',
    endTime: ''
  },
  getInputVal: function(e) {
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
  },
  startTimedataChange: function(e) {
    console.log('picker发送选择改变，携带值为', e)
    this.setData({
      startTime: e.detail.value
    })
  },
  endTimedataChange: function(e) {
    console.log('picker发送选择改变，携带值为', e)
    this.setData({
      endTime: e.detail.value
    })
  },
  addNewStage:function(){
    wx.navigateTo({
      url: 'stage/stage'
    })
  },
  chooseImage:function(){
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album'],
      success: function(res) {
        console.log('chooseImage success, temp path is', res.tempFilePaths[0])

        var imageSrc = res.tempFilePaths[0]

        wx.uploadFile({
          url: uploadFileUrl,
          filePath: imageSrc,
          name: 'data',
          success: function(res) {
            console.log('uploadImage success, res is:', res)

            wx.showToast({
              title: '上传成功',
              icon: 'success',
              duration: 1000
            })

            self.setData({
              imageSrc
            })
          },
          fail: function({errMsg}) {
            console.log('uploadImage fail, errMsg is', errMsg)
          }
        })

      },
      fail: function({errMsg}) {
        console.log('chooseImage fail, err is', errMsg)
      }
    })
  }
})
