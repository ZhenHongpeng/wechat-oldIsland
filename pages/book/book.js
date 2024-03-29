import {BookModel} from '../../models/book'
import {random} from "../../util/common";
// pages/book/book.js
const bookModel = new BookModel()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        //promise优势: 1.有助于代码风格  2.多个异步等待合并,不需要蹭蹭传递callback
        books:[],
        searching:false,
        more:''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        bookModel.getHotList()
            .then(res => {
                this.setData({
                    books:res
                })
                return bookModel.getMyBookCount()
            })
    },

    onSearching(event){
      this.setData({
          searching:true
      })
    },

    onCancel(event){
      this.setData({
          searching:false
      })
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        this.setData({
            more:random(16)
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
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})