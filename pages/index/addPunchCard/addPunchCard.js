//index.js
//获取应用实例
const app = getApp()
const uploadFileUrl = require('../../../config').uploadFileUrl
Page({
  data: {
    lists: [{
      "name" : "name",
    	"inputTitle" : '活动名称:',
    	"placeholder" : "请输入活动标题",
      "maxlength" : "5",
      "type": "text"
    },{
      "name" : "intro",
    	"inputTitle" : '打卡介绍:',
    	"placeholder" : "请输入活动主题",
      "maxlength" : "10",
      "type": "text"
    }],
    submitInput: [],
    // startTime: '',
    // endTime: '',
    punchCardFrequency: ['天', '周', '月'],
    punchCardRequire:['无','必须音频','必须图片','必须视频'],
    punchCardMust:['必选','不必选'],
    punchCardChose:['阶段一'],
    // punchCardFrequencyIndex: 0,
    // punchCardRequireIndex: 0,
    // punchCardMustIndex:0,
    // punchCardChoseIndex:0,
    dataLists:{
      name:'',
      intro:'',
      partyMainImg:'',
      beginTime:'',
      endTime:'',
      cycle:'0',
      type:'0',
      necessary:'0',
      stageOrder:'0',
      remark:'',
      projectName:''
    }
  },
  onLoad:function(option) {
    console.log(option.projectName)
    console.log(option.id)
    this.setData({
      'dataLists.projectName': option.projectName
    })
    // 发送请求 id
  },
  getInputVal: function(e) {
    this.data.submitInput.push(e.detail)
  },
  formSubmit: function (e){
    console.log(e)
    var dataLength = this.data.submitInput.reduce((p, k) =>(p[k.name]++ || (p[k.name] = 1), p), {})
    var index = ''
    // var submitData = {}
    for(var key in dataLength){
      console.log(key)
      if(dataLength[key]>1){
        console.log(key)
        for (var i=0;i<this.data.submitInput.length;i++) {
          if(this.data.submitInput[i].name === key ){
            index = i
          }
        }
        var key = 'dataLists.'+this.data.submitInput[index].name
        this.setData({
          [key] : this.data.submitInput[index].value
          
        })
      }
      else {
        for (var i=0;i<this.data.submitInput.length;i++) {
          if(this.data.submitInput[i].name === key){
            var key = 'dataLists.'+this.data.submitInput[i].name
            this.setData({
              [key] : this.data.submitInput[i].value
              
            })
          }
        }
      }
    }
    this.setData({'dataLists.partyMainImg':this.data.dataLists.partyMainImg})
    this.setData({'dataLists.beginTime':this.data.dataLists.beginTime})
    this.setData({'dataLists.cycle':this.data.dataLists.cycle})
    this.setData({'dataLists.type':this.data.dataLists.type})
    this.setData({'dataLists.necessary':this.data.dataLists.necessary})
    this.setData({'dataLists.stageOrder':this.data.dataLists.stageOrder})
    this.setData({'dataLists.remark':e.detail.value.textarea})
    this.setData({'dataLists.endTime':this.data.dataLists.endTime})
    console.log(this.data.dataLists)
    // 发送ajax
    // 成功后跳转
    wx.switchTab({
      url: '/pages/index/index'
    })
  },
  beginTimedataChange: function(e) {
    console.log('picker发送选择改变，携带值为', e)
    this.setData({
      'dataLists.beginTime': e.detail.value
    })
  },
  endTimedataChange: function(e) {
    console.log('picker发送选择改变，携带值为', e)
    this.setData({
      'dataLists.endTime': e.detail.value
    })
  },
  addNewStage:function(){
    wx.navigateTo({
      url: 'stage/stage'
    })
  },
  bindpunchCardFrequency: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      'dataLists.cycle': e.detail.value
    })
  },
  bindpunchCardRequire:function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      'dataLists.type': e.detail.value
    })
  },
  bindpunchCardMust:function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      'dataLists.necessary': e.detail.value
    })
  },
  bindpunchCardChose:function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      'dataLists.stageOrder': e.detail.value
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
  },
  gotoIndex:function(){
    // wx.switchTab({
    //   url: '/pages/index/index'
    // })
  }
})
