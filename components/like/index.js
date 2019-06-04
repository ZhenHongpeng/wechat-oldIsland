

// components/like/index.js
Component({
  // 发送请求获取数据到组件中步骤10.接收传递过来的数据时,要定义在properties中,不能定义在data私有属性中
  properties: {
    like: { type: Boolean, value: false },
    // 为什么页面中可以直接显示count呢?
    // 因为在主页面的onload生命周期函数中,就调用了getlastest方法,将count同步到组件中了
    count: { type: Number},
    readOnly:Boolean
  },
  /**
   * 页面的初始数据
   */
  data: {
    likeSrc: './images/like.png',
    dislikeSrc: './images/like@dis.png'
  },
  methods:{
    onLike: function (event) {
      if (this.properties.readOnly) {
          return
      }
      // 发送请求获取数据到组件中步骤11. 触发点击事件时,改变数据
      let like = this.properties.like
      let count = this.properties.count

      count = like ? count - 1 : count + 1
      this.setData({
        count: count,
        like: !like
      })

      // 自定义事件1. 定义一个状态标签用来区分用户是点赞还是取消点赞
      let behavior = this.properties.like?'like':'cancel'
      // 自定义事件2.激活一个自定义事件
      this.triggerEvent(
          'like',
          {behavior:behavior},
          {})
    }
  }
})