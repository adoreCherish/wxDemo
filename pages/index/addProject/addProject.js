//index.js
//获取应用实例
const app = getApp()
const uploadFileUrl = require('../../../config').uploadFileUrl
Page({
  data: {
    lists: [{
      "name" : "companyName",
    	"inputTitle" : '公司名称',
    	"placeholder" : "请输入公司名称",
      "maxlength" : "5",
      "type": "text"
    },{
      "name" : "name",
    	"inputTitle" : '项目名称',
    	"placeholder" : "请输入项目名称",
      "maxlength" : "10",
      "type": "text"
    }],
    submitAllData: [],
    beginTime: '',
    endTime: '',
    intro:'',
    submitData:[]
  },
  getInputVal: function(e) {
    this.data.submitAllData.push(e.detail)
    this.setData({
      'submitAllData':this.data.submitAllData
    })
  },
  formSubmit: function (e){
    var dataLength = this.data.submitAllData.reduce((p, k) =>(p[k.name]++ || (p[k.name] = 1), p), {})
    var index = ''
    // var submitData = {}
    for(var key in dataLength){
      console.log(key)
      if(dataLength[key]>1){
        console.log(key)
        for (var i=0;i<this.data.submitAllData.length;i++) {
          if(this.data.submitAllData[i].name === key ){
            index = i
          }
        }
        // submitData.push({'name':this.data.submitAllData[index].name,'value':this.data.submitAllData[index].value})
        // this.data.submitData[this.data.submitAllData[index].name] = this.data.submitAllData[index].value
        var key = 'submitData.'+this.data.submitAllData[index].name
        this.setData({
          [key] : this.data.submitAllData[index].value
          
        })
      }
      else {
        for (var i=0;i<this.data.submitAllData.length;i++) {
          if(this.data.submitAllData[i].name === key){
            // submitData.push({'name':this.data.submitAllData[i].name,'value':this.data.submitAllData[i].value})
            // this.data.submitData[this.data.submitAllData[i].name] = this.data.submitAllData[i].value
            var key = 'submitData.'+this.data.submitAllData[i].name
            this.setData({
              [key] : this.data.submitAllData[i].value
              
            })
          }
        }
      }
    }
    // this.data.submitData['beginTime'] = this.data.beginTime
    // this.data.submitData['endTime'] = this.data.endTime
    // this.data.submitData['intro'] = e.detail.value.textarea
    // this.data.submitData['mediaIds'] = ''
    // this.setData({
    //   submitData:{
    //     'beginTime':this.data.beginTime,
    //     "endTime":this.data.endTime,
    //     'intro':e.detail.value.textarea,
    //     'mediaIds':1
    //   }
    // })
    this.setData({'submitData.beginTime':this.data.beginTime})
    this.setData({'submitData.endTime':this.data.endTime})
    this.setData({'submitData.intro':e.detail.value.textarea})
    this.setData({'submitData.mediaIds':1})
    this.setData({'submitData.createBy':app.globalData.userInfo.nickName})
    
    
    console.log(JSON.stringify(this.data.submitData))
    wx.navigateTo({
      url: 'stage/stage?submitData=' + JSON.stringify(this.data.submitData),
      success:function(res){
        console.log('success:')
        console.log(res)
      },
      fail:function(res){
        console.log('fail:' + res)
      },
    })
  },
  startTimedataChange: function(e) {
    console.log('picker发送选择改变，携带值为', e)
    this.setData({
      beginTime: e.detail.value
    })
  },
  endTimedataChange: function(e) {
    console.log('picker发送选择改变，携带值为', e)
    this.setData({
      endTime: e.detail.value
    })
  },
  addNewStage:function(){
    // console.log('获取阶段值')
    // wx.navigateTo({
    //   url: 'stage/stage?submitData=' + this.data.submitData
    // })
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
