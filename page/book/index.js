// page/book/index.js
var CONFIG_INTERFACE = require('../../config.js')
var app = getApp()
var offset = 1;
var pageSize = 15;
var pid = '';
//获取列表
var GetList = function (that) {
    that.setData({
        showLoading: true,
    });
    wx.request({
        url: CONFIG_INTERFACE.interface.libMusicList + '?bookId=' + pid,
        data: {
            offset: offset,
            pageSize: pageSize,
        },
        success: function (res) {
          console.log(res)
            var len = res.data.data.list.length;
            if (!len) {
                that.setData({
                    showLoading: false,
                });
                return
            }
            var list = that.data.list;
            for (var i = 0; i < len; i++) {
                list.push(res.data.data.list[i]);
            }
            that.setData({
                list: list,
            });
            offset++;
            that.setData({
                showLoading: false,
            });
        }
    });
}
Page({

    /**
     * 页面的初始数据
     */
    data: {
        showLoading: true,
        list: [],
        scrollTop: 0,
        scrollHeight: 0,
          
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
    videoView: function (e) {
        let id = e.currentTarget.dataset.id
        let src = e.currentTarget.dataset.src
        let title = e.currentTarget.dataset.title
        let pid = e.currentTarget.dataset.pid
        wx.navigateTo({
            url: '../detail/index?id=' + id + '&musicTitle=' + title + '&videoNormalUrl=' + src + '&pid=' + pid,
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let that = this
        pid = options.bookId;
        that.setData({
            pid: options.boodId,
            album: options.cover,
            title: options.name,
            list: [],

        })
        wx.getSystemInfo({
            success: function (res) {
                that.setData({
                    scrollHeight: res.windowHeight
                });
            }
        });
    },
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