// Component({
//   options: {
//     multipleSlots: true // 在组件定义时的选项中启用多slot支持
//   },
//   properties: { /* ... */ },
//   methods: { /* ... */ }
// })
Component({
	options: {
  	multipleSlots: true // 在组件定义时的选项中启用多slot支持
	},
  properties: {  
  	lists: {
  		type: Object,
  		value: {}
  	},
    inputTitle: {  
      type: String,  
      value: ''  
    }, //这里定义了modalHidden属性，属性值可以在组件使用时指定.写法为modal-hidden  
    placeholder: {  
      type: String,  
      value: '',  
    }  
  }
  // data: {  
  //   // 这里是一些组件内部数据  
  //   text: "text",  
  // },  
  // methods: {  
  //   // 这里放置自定义方法  
  //   modal_click_Hidden: function () {  
  //     this.setData({  
  //       modalHidden: true,  
  //     })  
  //   },  
  //   // 确定  
  //   Sure: function () {  
  //     console.log(this.data.text)  
  //   }  
  // }  
}) 