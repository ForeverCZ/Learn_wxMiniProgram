// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 视屏详情
    videoInfo: [],
    //推荐视屏
    otherList: [],
    commenData: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options);
    let videoId = options.id;
    this.getCurrentVideo(videoId);
    this.getOtherList(videoId);
    this.getCommenList(videoId);
  },
  // 获取视屏详情
  getCurrentVideo: function(videoId) {
    let self = this;
    wx.request({
      url: 'https://easy-mock.com/mock/5c1dfd98e8bfa547414a5278/bili/videoDetail?id=' + videoId,
      success: function(e) {
        console.log("获取视屏详情");
        console.log(e)
        if (e.data.code === 0) {
          self.setData({
            videoInfo: e.data.data.videoInfo
          })
        }
      }
    })
  },
  // 获取推荐视屏
  getOtherList: function(videoId) {
    let self = this;
    wx.request({
      url: 'https://easy-mock.com/mock/5c1dfd98e8bfa547414a5278/bili/othersList?id=' + videoId,
      success: function(e) {
        console.log("视屏推荐");
        console.log(e);
        self.setData({
          otherList: e.data.data.othersList
        })
      },
    })
  },
  // 获取评论数据
  getCommenList: function(videoId) {
    let self = this;
    wx.request({
      url: 'https://easy-mock.com/mock/5c1dfd98e8bfa547414a5278/bili/commentsList?id=' + videoId,
      success: function(e) {
        console.log("评论数据");
        console.log(e);
        self.setData({
          commenData: e.data.data.commentData
        })
      }
    })
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