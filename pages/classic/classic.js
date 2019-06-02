
// 发送请求获取数据到组件中步骤4.导入ClassicModel类
import {ClassicModel} from '../../models/classic.js'
import {LikeModel} from '../../models/like.js'
// 发送请求获取数据到组件中步骤5.创建ClassicModel实例
let classicModel = new ClassicModel()
let likeModel =new LikeModel()
// pages/classic.js
Page({


  data: {
    classicData:null,
    latest:true,
    first:false,
    likeCount:0,
    likeStatus:false
  },


  onLoad: function (options) {
    // 发送请求获取数据到组件中步骤6.通过创建的classic实例对象调用getLastest方法发送请求
    classicModel.getLatest((res)=>{ //通过箭头函数可以让this的指向不发生改变
      // // 发送请求获取数据到组件中步骤7.通过回调函数获取res数据
      // // 发送请求获取数据到组件中步骤8.获取到回调函数中的res后,使用setData方法同步数据到classicData中
      this.setData({
        classicData:res,
        likeCount: res.fav_nums,
        likeStatus: res.like_status,
      })
      // latestClassicData     currentclassicData
    })
  },


  onLike:function(event){
    // console.log(event)
    let behavior = event.detail.behavior
    likeModel.like(
        behavior,
        this.data.classicData.id,
        this.data.classicData.type
        )
  },

  onNext:function(){
    this._updateClassic('next')
  },

  onPrevious:function(){
    this._updateClassic('previous')
  },

  _updateClassic:function(nextOrPrevious){
    let index = this.data.classicData.index
    classicModel.getClassic(index,nextOrPrevious,(res)=>{
      this._getLikeStatus(res.id,res.type)
      this.setData({
        classicData:res,
        latest:classicModel.isLatest(res.index),
        first:classicModel.isFirst(res.index)
      })
    })
  },

  _getLikeStatus:function (artId,category) {
    likeModel.getClassicLikeStatus(artId,category,(res)=>{
      this.setData({
        likeCount: res.fav_nums,
        likeStatus: res.like_status,
      })
    })
  }

})