//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    nodeName:'',
    beginTime:'',
    endTime:'',
    submitAllData:[]
  },
  publishFunc:function(){
    wx.navigateBack({
      delta: 1
    })
  },
  bindKeyInput:function(e){
    console.log(e)
    var key = 'submitAllData.stage['+ e.target.dataset.stage +'].node['+ e.target.dataset.index +'].name'
    this.setData({
      [key]: e.detail.value
    })
  },
  onLoad(option){
    console.log('here')
    console.log(option.submitData)
    option.submitData = JSON.parse(option.submitData)
    // submitData={"companyName":"1","name":"2","beginTime":"2018-05-23","endTime":"2018-06-23","intro":"","mediaIds":1,"createBy":"apart"}
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
          'name':this.data.nodeName,
          'beginTime':this.data.beginTime,
          'endTime':this.data.endTime,
          'clockNeed':'1',
          'orderNum':'1',
          'part':'课前'
        }]
      },
      {
        'name':'阶段二',
        'ordernum':'1',
        'node':[{
          'name':this.data.nodeName,
          'beginTime':this.data.beginTime,
          'endTime':this.data.endTime,
          'clockNeed':'1',
          'orderNum':'1',
          'part':'课中'
        }]
      },
      {
        'name':'阶段三',
        'ordernum':'1',
        'node':[{
          'name':this.data.nodeName,
          'beginTime':this.data.beginTime,
          'endTime':this.data.endTime,
          'clockNeed':'1',
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
  addNode:function(){
    var nodes = this.data.submitAllData.stage[0].node;
    console.log(nodes)
    nodes.push({
      'name':'',
      'beginTime':'',
      'endTime':'',
      'clockNeed':'1',
      'orderNum':'2',
      'part':'课前'
    });
    this.setData({'submitAllData.stage[0].node':nodes});
  },
  publishFunc:function(e){
    console.log(e.submitData)
    console.log(this.data.submitAllData)
  }
})
