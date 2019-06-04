// components/tag/index.js
Component({
  /**
   * 组件的属性列表
   */
  options:{
    // 启用插槽
    multipleSlots:true
  },
  externalClasses:[
    //  启用外部样式->定义外部样式
    'tag-class'
  ],
  properties: {
    text:String,
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onTap(event){
      this.triggerEvent('tapping',{
        text:this.properties.text
      })
    }
  }
})
