Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  properties: {  
    listsForPicker: {
      type: Object,
      value: {}
    },
    date: {
      type: String,
      value: ''
    }
  },
  // data: {  
  //   // 这里是一些组件内部数据  
  //   text: "text",  
  // },  
  methods: {  
    // 这里放置自定义方法  
    dataChange: function(e) {
      console.log('dataChange')
      console.log(e)
      this.triggerEvent('dataChange',e.detail.value, {bubbles:false})
    }
  }  
}) 
