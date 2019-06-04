import {BookModel} from "../../models/book";
import {LikeModel} from "../../models/like";

const bookModel = new BookModel()
const likeModel = new LikeModel()

// pages/book-detail/book-detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    comments:[],
    book:null,
    likeStatus:false,
    likeCount:0,
    posting:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading()
    const bid = options.bid
    const detail = bookModel.getDatail(bid)
    const likeStatus = bookModel.getLikeStatus(bid)
    const comments = bookModel.getComments(bid)

    // 三个请求全部完成之后才会执行.then的回调函数
    Promise.all([detail,comments,likeStatus])
        .then(res=>{
          // console.log(res);
          this.setData({
            book:res[0],
            comments:res[1].comments,
            likeStatus:res[2].like_status,
            likeCount:res[2].fav_nums
          })
          // 三个请求全部完成后,再调用wx.hideLoading
          wx.hideLoading()
        })


    // detail.then(res=>{
    //   this.setData({
    //     book:res
    //   })
    //   wx.hideLoading()
    // })
    //
    // comments.then(res=>{
    //   this.setData({
    //     comments:res.comments
    //   })
    // })
    //
    // likeStatus.then(res=>{
    //   this.setData({
    //     likeStatus:res.like_status,
    //     likeCount:res.fav_nums
    //   })
    // })
  },

  onLike(event){
    const like_or_cancel = event.detail.behavior
    likeModel.like(like_or_cancel,this.data.book.id,400)
  },


  onFakePost(event){
    this.setData({
      posting:true
    })
  },

  onCancel(event){
    this.setData({
      posting:false
    })
  },

  onPost(event){
                    // 用户点击标签        input输入框内容
    const comment = event.detail.text || event.detail.value
    if(!comment){
      wx.showToast({
        title:'请输入评论内容~',
        icon:'none'
      })
      return
    }
    // 客户端检测短评长度
    if (comment.length>12) {
        wx.showToast({
          title:'短评最多为12个字~',
          icon:''
        })
      return
    }

    // 发送请求
    bookModel.postComment(this.data.book.id,comment)
        .then(res=>{

          // 用户提示
          wx.showToast({
            title:'+1',
            icon:'none'
          })

          // 添加到comments数组中
          this.data.comments.unshift({
            content:comment,
            nums:1
          })

          // 更新数据
          this.setData({
            comments:this.data.comments,
            posting:false
          })
        })

  },
























  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})