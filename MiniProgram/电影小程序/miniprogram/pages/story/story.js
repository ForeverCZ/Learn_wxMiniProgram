// pages/story/story.js
var app = getApp();
var that, video;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    storyDeData: [],
    loding: true
  },
  // 进入详情页
  jumpToData(event) {
    console.log(event.currentTarget.id)
    wx.navigateTo({
      url: '/pages/details/details-list/details-list?id=' + event.currentTarget.id,
      success: res => {
        console.log(res)
      }
    })
  },
  // 获取电影故事列表数据
  getVideoData(video) {
    wx.request({
      method: "GET",
      url: video, //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: res => {
        console.log("电影故事列表页的数据", res.data)
        that.setData({
          storyDeData: res.data,
          loding: false
        })
        wx.stopPullDownRefresh();
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    that = this;
    video = app.globalData.movies + "/video/";
    that.getVideoData(video);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    that.getVideoData(video);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})