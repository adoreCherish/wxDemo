// var customFormControls = require('../form/custom-form-controll')
Component({
  // behaviors: [customFormControls],
  // relations: {
  //   '../form/form': {
  //     type: 'ancestor', // 关联的目标节点应为祖先节点
  //   }
  // },
	options: {
  	multipleSlots: true // 在组件定义时的选项中启用多slot支持
	},
  properties: {  
  	lists: {
  		type: Object,
  		value: {}
  	},
    hasArrow: {
      type: Boolean,
      value: false
    }
  },
  // data: {  
  //   // 这里是一些组件内部数据  
  //   text: "text",  
  // },  
  methods: {  
    // 这里放置自定义方法  
    bindKeyInput: function(e){
      var myEventDetail = {
        'name': e.target.dataset.id,
        'value': e.detail.value
      } // detail对象，提供给事件监听函数
      this.properties.inputValues = myEventDetail
      var myEventOption = {bubbles:false} // 触发事件的选项
      this.triggerEvent('inputValue', myEventDetail, myEventOption)
    }
  }  
}) 
