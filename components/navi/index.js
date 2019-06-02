// components/navi/navi.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title:String,
    first:Boolean,
    latest:Boolean
  },

  /**
   * 组件的初始数据
   */
  data: {
    disLeftSrc:'images/triangle.dis@left.png',
    leftSrc:'images/triangle@left.png',
    disRightSrc:'images/triangle.dis@right.png',
    rightSrc:'images/triangle@right.png',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 设定组件点击左右的不同事件,在页面中的Z-navi组件上绑定点击事件,监听组件点击事件的发生
    onLeft:function (event) {
      if(!this.properties.latest){
        this.triggerEvent('left',{},{})
      }
    },
    onRight:function (event) {
      if(!this.properties.first){
        this.triggerEvent('right',{},{})
      }
    }
  }
})
