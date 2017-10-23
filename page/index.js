// page/index.js
const CONFIG_INTERFACE = require('../config.js')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        books: [],
    },
    goSearch: function () {
        wx.navigateTo({
            url: 'search/index',
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    detailView: function (e) {
        let id = e.currentTarget.dataset.id;
        let title = e.currentTarget.dataset.title
        let album = e.currentTarget.dataset.album
        wx.navigateTo({
            url: 'book/index?bookId=' + id + '&name=' + title + '&cover=' + album,
        })
    },
    onLoad: function (e) {
        wx.showLoading({
            title: '正在加载...',
        })
        let that = this
        wx.request({
            url: CONFIG_INTERFACE.interface.libBookList,
            data: {
                offsetBook: 0,
                pageSize: 100
            },
            headers: {
                'Content-Type': 'application/json'
            },
            success(res) {
                wx.hideLoading()
                that.setData({
                    books: res.data.data.list,
                    showLoading: false
                })
            },
            fail: {

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
        return {
            title: '小猪慢弹',
            path: 'page/index'
        }
    }
})