// components/classic/essay/index.js

// 导入classicBeh组件->注册到自身组件中
import {classicBeh} from "../classic-beh";

Component({
  /**
   * 组件的属性列表
   */
  // 注册(如果有多个组件,可以使用 , 连接)
  // 注意:属性冲突的话,继承来的属性或方法,会被组件自身的属性或方法所覆盖!!!
  behaviors:[
      classicBeh
  ],
  properties: {

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

  }
})
