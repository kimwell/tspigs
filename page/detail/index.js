var CONFIG_INTERFACE = require('../../config.js')
var app = getApp()
var offset = 1;
var pageSize = 15;
var pid = '';
//获取列表
var GetList = function (that) {
    that.setData({
        hidden: false,
        showLoading: true,
    });
    wx.request({
        url: CONFIG_INTERFACE.interface.libMusicList + '?bookId=' + pid,
        data: {
            offset: offset,
            pageSize: pageSize,
        },
        success: function (res) {
            if (!res.data.data.list.length) {
                that.setData({
                    showLoading: false
                });
                return
            }
            var list = that.data.list;
            for (var i = 0; i < res.data.data.list.length; i++) {
                list.push(res.data.data.list[i]);
            }
            that.setData({
                list: list
            });
            offset++;
            that.setData({
                hidden: true,
                showLoading: false
            });
        }
    });
}
Page({

    /**
     * 页面的初始数据
     */
    data: {
        list: [],
        showLoading: false,
        scrollTop: 0,
        scrollHeight: 0,
        hasMore: true,
    },
    getMore: function () {
        var that = this;
        GetList(that);
    },
    scroll: function (event) {
        this.setData({
            scrollTop: event.detail.scrollTop
        });
    },
    playVideo: function (e) {
        let that = this
        let src = e.currentTarget.dataset.src;
        let title = e.currentTarget.dataset.title;
        this.videoCtx.seek(0)
        that.setData({
            src: src,
            videoName: title
        })
    },
    onLoad: function (options) {
        let that = this
        pid = options.pid
        wx.getSystemInfo({
            success: function (res) {
                that.setData({
                    scrollHeight: res.windowHeight - 255
                });
            }
        });
        that.setData({
            src: options.videoNormalUrl,
            videoName: options.musicTitle,
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    refresh: function (event) {
        offset = 1;
        this.setData({
            list: [],
            scrollTop: 0
        });
        GetList(this)
    },
    onReady: function (e) {
        this.videoCtx = wx.createVideoContext('video')
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        offset = 1;
        var that = this;
        that.setData({
            list: []
        })
        GetList(that);
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