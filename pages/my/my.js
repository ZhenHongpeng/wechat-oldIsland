import {ClassicModel} from "../../models/classic";
import {BookModel} from "../../models/book";

const classiModel = new ClassicModel()
const bookModel = new BookModel()
// pages/my/my.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        authorized: false,
        userInfo: null,
        bookCount: 0,
        classics:null
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // wx.getUserInfo({
        //   success:data=>{
        //     console.log(data);
        //   }
        // })
        this.userAuthorized()
        this.getMyBookCount()
        this.getMyFavor()
    },

    getMyFavor(){
        classiModel.getMyfavor(res=>{
            this.setData({
                classics:res
            })
        })
    },

    getMyBookCount() {
        bookModel.getMyBookCount()
            .then(res=>{
                this.setData({
                    bookCount:res.count
                })
            })
    },

    getUserInfo(event) {
        // console.log(event);
    },


    onGetUserInfo(event) {
        const userInfo = event.detail.userInfo
        if (userInfo) {
            this.setData({
                userInfo: userInfo,
                authorized: true
            })
        }
    },

    onJumpToAbout(event) {
        wx.navigateTo({
            url: '/pages/about/about'
        })
    },

    onStudy(event) {
        wx.navigateTo({
            url: '/pages/course/course'
        })
    },


    userAuthorized() {
        wx.getSetting({
            success: data => {
                // console.log(data);
                if (data.authSetting['scope.userInfo']) {
                    // 用户授权过了
                    wx.getUserInfo({
                        success: data => {
                            this.setData({
                                authorized: true,
                                userInfo: data.userInfo
                            })
                        }
                    })
                } else {
                    // 用户没有授权过
                    console.log('用户没有授权');
                }
            }
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