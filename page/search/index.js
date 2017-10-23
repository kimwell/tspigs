// page/search/index.js
var CONFIG_INTERFACE = require('../../config.js')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        searchVue: '',
        bookList: [],
        musicList: [],
        bookResult: false,
        musicResult: false,
        focus: false,
        noResult: false
    },
    history: function () {
        wx.navigateBack({
        })
    },
    clearTxt: function () {
        this.setData({
            searchVue: null,
            focus: true
        })
    },
    bindInput: function (e) {
        var that = this
        this.setData({
            searchVue: e.detail.value
        })
        wx.showNavigationBarLoading()
        if (this.data.searchVue == '') {
            wx.hideNavigationBarLoading()
            that.setData({
                bookList: [],
                musicList: [],
                bookResult: false,
                musicResult: false,
            })
        } else {
            wx.request({
                url: CONFIG_INTERFACE.interface.searchCourceOrBook,
                data: {
                    keyword: this.data.searchVue,
                    offsetBook: 0,
                    pageSizeBook: 999,
                    offsetCourse: 0,
                    pageSizeCourse: 999
                },
                method: 'GET',
                success: function (res) {
                    wx.hideNavigationBarLoading()
                    that.setData({
                        bookList: res.data.data.books.list,
                        musicList: res.data.data.musics.list,
                        bookResult: true,
                        musicResult: true,
                        noResult: false
                    })
                    if (res.data.data.books.list.length == '0' && res.data.data.musics.list.length == '0') {
                        that.setData({
                            noResult: true,
                        })
                    }
                    if (res.data.data.books.list.length == '0') {
                        that.setData({
                            bookResult: false,
                        })
                    }
                    if (res.data.data.musics.list.length == '0') {
                        that.setData({
                            musicResult: false,
                        })
                    }
                }
            })
        }
    },
    bookDetail: function (e) {
        let id = e.currentTarget.dataset.id;
        let title = e.currentTarget.dataset.title
        let cover = e.currentTarget.dataset.cover
        wx.navigateTo({
            url: '../book/index?bookId=' + id + '&name=' + title + '&cover=' + cover,
        })
    },
    musicDetail: function (e) {
        let id = e.currentTarget.dataset.id;
        let title = e.currentTarget.dataset.title;
        let src = e.currentTarget.dataset.src;
        let pid = e.currentTarget.dataset.pid;
        wx.navigateTo({
            url: '../detail/index?id=' + id + '&musicTitle=' + title + '&videoNormalUrl=' + src + '&pid=' + pid,
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let that = this
        that.setData({
            focus: true
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
     **/
    onShareAppMessage: function () {
        return {
            title: '小猪慢弹',
            path: 'page/index'
        }
    }
})