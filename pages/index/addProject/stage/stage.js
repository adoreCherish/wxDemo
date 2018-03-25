//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    nodeName:'',
    beginTime:'',
    endTime:'',
    // clockNeed:'',
    submitAllData:[]
  },
  formSubmit:function(e){
    console.log('formSubmit here')
    console.log(this.data.submitAllData.name)
    // console.log('项目名称:' + )
    wx.reLaunch({
      url: '/pages/index/index?projectName='+this.data.submitAllData.name,
      success:function(res){
        console.log(res)
      },
      fail:function(err){
        console.log(err)
      }
    })
  },
  bindKeyInput:function(e){
    console.log(e)
    var key = 'submitAllData.stage['+ e.target.dataset.stage +'].node['+ e.target.dataset.index +'].name'
    this.setData({
      [key]: e.detail.value
    })
  },
  radioChange:function(e){
    console.log(e.detail.value)
    var key = 'submitAllData.stage['+ e.target.dataset.stage +'].node['+ e.target.dataset.index +'].clockNeed'
    console.log(key)
    this.setData({
      [key]: e.detail.value
    })
  },
  onLoad(option){
    console.log('here')
    console.log(option.submitData)
    option.submitData = JSON.parse(option.submitData)
    // submitData={"companyName":"1","name":"2","beginTime":"2018-05-23","endTime":"2018-06-23","intro":"","mediaIds":1,"createBy":"apart"}
    this.setData({'submitAllData.companyName':option.submitData.companyName})
    this.setData({'submitAllData.name':option.submitData.name})
    this.setData({'submitAllData.beginTime':option.submitData.beginTime})
    this.setData({'submitAllData.endTime':option.submitData.endTime})
    this.setData({'submitAllData.intro':option.submitData.intro})
    this.setData({'submitAllData.mediaIds':1})
    this.setData({'submitAllData.createBy':option.submitData.createBy})
    this.setData({'submitAllData.stage':[
      {
        'name':'阶段一',
        'ordernum':'1',
        'node':[{
          'name':'',
          'beginTime':'',
          'endTime':'',
          'clockNeed':'0',
          'orderNum':'1',
          'part':'课前'
        }]
      },
      {
        'name':'阶段二',
        'ordernum':'2',
        'node':[{
          'name':'',
          'beginTime':'',
          'endTime':'',
          'clockNeed':'0',
          'orderNum':'1',
          'part':'课中'
        }]
      },
      {
        'name':'阶段三',
        'ordernum':'3',
        'node':[{
          'name':'',
          'beginTime':'',
          'endTime':'',
          'clockNeed':'0',
          'orderNum':'1',
          'part':'课后'
        }]
      }
    ]
    })
  },
  startTimedataChange: function(e) {
    var key = 'submitAllData.stage['+ e.target.dataset.stage +'].node['+ e.target.dataset.index +'].beginTime'
    this.setData({
      [key]: e.detail.value
    })
  },
  endTimedataChange: function(e) {
    var key = 'submitAllData.stage['+ e.target.dataset.stage +'].node['+ e.target.dataset.index +'].endTime'
    this.setData({
      [key]: e.detail.value
    })
  },
  addNode:function(e){
    // console.log(e.target.dataset.addstage)
    // var index = +e.target.dataset.addstage+1
    var length = e.target.dataset.length
    var nodes = this.data.submitAllData.stage[e.target.dataset.addstage].node;
    // console.log(nodes)
    nodes.push({
      'name':'',
      'beginTime':'',
      'endTime':'',
      'clockNeed':'',
      'orderNum':e.target.dataset.length + 1,
      'part':e.target.dataset.part
    });
    var key = 'submitAllData.stage['+ e.target.dataset.addstage + '].node'
    this.setData({
      [key]:nodes
    });
    var stagekey1 = 'submitAllData.stage[1].node[0].orderNum'
    this.setData({[stagekey1]:this.data.submitAllData.stage[0].node.length+1})
    var stagekey2 = 'submitAllData.stage[2].node[0].orderNum'
    this.setData({[stagekey2]:this.data.submitAllData.stage[0].node.length+this.data.submitAllData.stage[1].node.length+1})
    console.log()
  }
})
