//index.js
//获取应用实例
const app = getApp()
var swiper = function(opt){
  // 保存设置
  this.opt =opt
  // 当前 移动块停留索引
  this.currentDirection  = 0
  
  // 盒子容器总偏移量
  this.boxTranslateX = 0 
  // 每移动一张图会增加的偏移量
  this.singleOffsetX = -610
  // 触摸
  this._x_start = 0 
  this._y_start = 0 
  // 移动
  this._x_move = 0 
  // 偏移量
  this._x_offset = 0
  // move 过程中真实偏移
  this._x_realOffset = 0
  // 离开
  this._x_end = 0 
  this.screenWidth = 750
  this.screenHeight = 1210
  this.pixelRatio = 2
  // rpx
  this.maxTranX = this.singleOffsetX * (this.opt.imgLength -1  ) 
  // 容器宽度 width 100 是两边靠墙
  this.width = 100 * 2 + (this.opt.imgLength - 1) *60 + 550 * this.opt.imgLength

  this.swiperIndex = 0
  // 计算宽转换比例
  this.computedScreenRatio(opt.systemInfo)
}
// 计算宽转换比例
swiper.prototype.computedScreenRatio = function (systemInfo){
  this.pixelRatio = systemInfo.pixelRatio
  this.screenWidth = systemInfo.screenWidth
  this.screenHeight = systemInfo.screenHeight  
  //this.singleOffsetX = -610
  // 奇怪的i5 按照算法会 多偏移2 px
  if (systemInfo.model.indexOf('iPhone 5') > -1 ){
    this.singleOffsetX = -(610 * (this.screenWidth / 750) -2  ).toFixed()
  }
  else{
    this.singleOffsetX = -610 * (this.screenWidth / 750)
  }
  this.maxTranX = this.singleOffsetX * (this.opt.imgLength - 1) 
  // 回调绑定vm ,渲染盒子宽度
  this.opt.success && this.opt.success(this.width)
}
// bindtouchstart
swiper.prototype.keepStartX = function(e, callback){
  this._x_start = e.touches[0].pageX
  this._y_start = e.touches[0].pageY
  callback && callback()
}
// bindtouchmove
/*
  函数说明 moveBox
  @params e  事件
  @params {function} callback 图片盒子的偏移量改变，绑定到vm 上面，视图发生变化
*/
swiper.prototype.moveBox = function (e, callback) {
  this._x_move = e.touches[0].pageX 
  this._x_offset = this._x_move - this._x_start 
  var lastTranX = this.computedTranX(this._x_offset)
  
  callback && callback(lastTranX)
}
// 根剧移动偏移量临界值计算出真实位移
swiper.prototype.computedTranX = function ( offsetX ){
    // 滑向上一张
    if( offsetX > 0  ){
      return offsetX + this.boxTranslateX 
    }
    // 滑动下一张
    else if (offsetX < 0 ){ 
      if ( Math.abs(offsetX - this.boxTranslateX) > Math.abs(this.maxTranX - 50) ){
        return this.maxTranX
      }else{
        return offsetX + this.boxTranslateX 
      }
    }
}
// bindtouchend 
swiper.prototype.ontouchEnd = function(e, callback){

  // 记录手指离开屏幕的坐标
  this._x_end = e.changedTouches[0].pageX
  this._x_realOffset = this._x_end - this._x_start
  // 判断滑动距离超过 指定值 轮播一张图
  var canExchangeImgFromOffset = Math.abs(this._x_realOffset) >= 50 ? true : false
  // 滑动距离达到 换图的要求
  if ( canExchangeImgFromOffset ){
    // 变量说明 计算总偏移
    var lastTotalTranlateX ;
    //  滑向上一张
    if (this._x_offset > 0) {
      console.log('//  滑向上一张')
      // 判断是否已经在第一张图，若不是，则滑动上一张
      if (Math.abs(this.boxTranslateX) > 0) {
        // lastTotalTranlateX 递增
        // this.singleOffsetX 为负数 -- 得 +
        this.swiperIndex -= 1
        lastTotalTranlateX = this.boxTranslateX - this.singleOffsetX
      } 
      else {
        // 已在第一张图 ，动画恢复原位
        this.swiperIndex = 0
        lastTotalTranlateX = 0
      }
    }
    //  滑向下一张
    else {
      console.log('//  滑向下一张')
      if ( Math.abs(this.boxTranslateX) < Math.abs(this.maxTranX) ) {
        // lastTotalTranlateX 递增
        this.swiperIndex += 1
        lastTotalTranlateX = this.boxTranslateX + this.singleOffsetX
      } else {
        console.log('到底图了')
        this.swiperIndex = this.opt.imgLength -1
        lastTotalTranlateX = this.maxTranX 
      }  
    }
    this.boxTranslateX = lastTotalTranlateX
    /* callback 说明
      @参数1  是否执行动画
      @参数2  若参数1为true, 则盒子的tranX 应该变成 lastTotalTranlateX，动画飞到对应的图 
       小程序 执行 wx.createAnimation 
    */
    callback && callback(true, lastTotalTranlateX)
    // reset 所有 与touch 相关参数
    this.resetParams()
  }
  else{
    callback && callback(false)
    // reset 所有 与touch 相关参数
    this.resetParams()
  }
}
swiper.prototype.resetParams = function(){
  // 触摸
  this._x_start = 0
  this._y_start = 0
  // 移动
  this._x_move = 0
  // 偏移量
  this._x_offset = 0
  // move 过程中正式偏移
  this._x_realOffset = 0
  // 离开
  this._x_end = 0
}
// 实际实例
var Swiper  

const conf = {
  data: {
    userInfo: {},
    hasUserInfo: false,
    hasProject: true,
    /*** 图片区域****/
    // swiper 容器宽度
    swiperContainWidth: 10000,
    // 手指移动时的偏移量
    swiperTranX: 0,
    // 轮播动画控制变量
    swiperAnimationData:{} ,
    // 跳转到的图片索引 swiperIndex
    swiperIndex: 0 ,
    swiperImgUrls: [{
      'text':'知识分享',
      'time':'3.14',
      'status': '0'
      },{
        'text':'时间管理',
        'time':'3.15',
        'status': '1'
      },{
        'text':'疯狂学习',
        'time':'3.16',
        'status': '1'
    }],
    processData: [{
      name: '知识分享',
      start: '#fff',
      end: '#EFF3F6'
    },
    {
      name: '时间管理',
      start: '#EFF3F6',
      end: '#fff'
    }],
    fixation:[0,1,2],
    bindPunchCard:false,
    bindPunchCardList:[],
    mustChoise: true,
    editbindPunchCard:false,
    sliderNumber:'5'
  },
  onLoad(){
    this.initSwiper()
    var self = this
    wx.getUserInfo({
      success: function(res) {
        // userInfo,nickName,avatarUrl,gender,province,city,country
        self.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      console.log('this.data.canIUse:' + this.data.canIUse)
      // this.getUserInfo()
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        console.log('*************')
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    } 
  },
  getUserInfo: function(e) {
    console.log('*******getUserInfo*******')
    // console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  addProjectFunc: function() {
    wx.navigateTo({
      url: 'addProject/addProject'
    })
  },
  addNew: function (){
    wx.navigateTo({
      url: 'addPunchCard/addPunchCard'
    })
  },
  historyPunchCardFunc:function(){
    wx.navigateTo({
      url: 'historyPunchCard/historyPunchCard'
    })
  },
  sliderChange: function(e){
    console.log(e)
    this.setData({
      sliderNumber:e.detail.value
    })
  },
  editFinshFunc: function(e){
    this.setData({
      editbindPunchCard:false
    })
  },
  //进度条的状态
  setPeocessIcon: function () {
    var index = 0//记录状态为1的最后的位置
    var processArr = this.data.processData
    // console.log("progress", this.data.detailData.progress)
    for (var i = 0; i < this.data.detailData.progress.length; i++) {
      var item = this.data.detailData.progress[i]
      processArr[i].name = item.word
      if (item.state == 1) {
        index = i
        processArr[i].icon = "../../img/process_3.png"
        processArr[i].start = "#45B2FE"
        processArr[i].end = "#45B2FE"
      } else {
        processArr[i].icon = "../../img/process_1.png"
        processArr[i].start = "#EFF3F6"
        processArr[i].end = "#EFF3F6"
      }
    }
    processArr[index].icon = "../../img/process_2.png"
    processArr[index].end = "#EFF3F6"
    processArr[0].start = "#fff"
    processArr[this.data.detailData.progress.length - 1].end = "#fff"
    this.setData({
      processData: processArr
    })
  },
  //打卡
  bindPunchCard: function () {
    this.setData({
      bindPunchCard:true
    })
  },
  editPunchCard: function () {
    console.log('here')
    this.setData({
      editbindPunchCard:true
    })
  },
  onShow(){
    var that = this
    // 同步 系统信息
    var systemInfo = wx.getSystemInfoSync()
    // Swiper.computedScreenRatio(systemInfo)

    Swiper = new swiper({
      imgLength: this.data.swiperImgUrls.length ,
      success: function(width){
        that.setData({
          swiperContainWidth : width
        })
      },
      systemInfo: systemInfo
     })
  },
  initSwiper(){
    var animation = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease'
    })
    this.swiperAnimation = animation
    var fastAnimation = wx.createAnimation({
      duration: 10,
      timingFunction: 'ease'
    })
    this.swiperFastAnimation = fastAnimation
  },
  newSwiperAnimation( tranX ){
    // 通过算法获取 偏移量
    // tranY 已带 rpx 单位
    var _tranX = tranX 
    this.swiperAnimation.translateX( _tranX ).step()
    this.setData({
      swiperAnimationData: this.swiperAnimation.export()
    })
    
  },
  newFastSwiperAnimation(tranX) {
    // 通过算法获取 偏移量
    // tranY 已带 rpx 单位
    var _tranX = tranX + 'px'
    this.swiperFastAnimation.translateX(_tranX).step()
    this.setData({
      swiperAnimationData: this.swiperFastAnimation.export()
    })
  },
  swiperTouchStart(e){
    Swiper.keepStartX(e,function(){})
  },
  swiperTouchMove(e){

    var swiper_endX, swiper_endY
    swiper_endX = e.changedTouches[0].pageX
    swiper_endY = e.changedTouches[0].pageY
    //根据起点和终点返回方向 1：向上，2：向下，3：向左，4：向右,0：未滑动 
    var touch_angel_result = this.GetSlideDirection(Swiper._x_start, Swiper._y_start, swiper_endX, swiper_endY)
    if( touch_angel_result == 1 ){
      this.closeCalendar()
    } else if (touch_angel_result == 2){
      this.openCalender()
    } else if (touch_angel_result == 3 || touch_angel_result == 4 ){
      var that = this
      Swiper.moveBox(e, function (tranX) {
        that.newFastSwiperAnimation(tranX)
      })
    }
  },
  swiperTouchEnd(e){
    var that = this 
    Swiper.ontouchEnd(e, function(canExchange, tranX){
      if(canExchange){
        that.setData({
          swiperIndex : Swiper.swiperIndex 
        })
        that.newSwiperAnimation( tranX )
      }
      else{
        that.newSwiperAnimation( Swiper.boxTranslateX )
      }
    }) 
  },
  //返回角度  
  GetSlideAngle(dx, dy) {
    return Math.atan2(dy, dx) * 180 / Math.PI
  },
  //根据起点和终点返回方向 1：向上，2：向下，3：向左，4：向右,0：未滑动  
  GetSlideDirection(startX, startY, endX, endY) {
    var dy = startY - endY;
    var dx = endX - startX;
    var result = 0;
    //如果滑动距离太短  
    if (Math.abs(dx) < 2 && Math.abs(dy) < 2) {
      return result;
    }
    var angle = this.GetSlideAngle(dx, dy);
    var littleAngle = 60
    var biggerAngle = 180 - 60 // 120
    if (angle >= -littleAngle && angle < littleAngle) {
      result = 4;
    } else if (angle >= littleAngle && angle < biggerAngle) {
      result = 1;
    } else if (angle >= -biggerAngle && angle < -littleAngle) {
      result = 2;
    }
    else if ((angle >= biggerAngle && angle <= 180) || (angle >= -180 && angle < -biggerAngle)) {
      result = 3;
    }
    return result;
  }  

};

Page(conf);
