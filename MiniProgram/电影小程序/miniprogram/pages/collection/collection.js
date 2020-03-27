var app = getApp();
var that, wxuser, jwt;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    collect: []
  },
  // 请求收藏数据
  collectData(collect) {
    wx.request({
      url: collect,
      method: "GET",
      header: {
        'content-type': 'application/json', // 默认值
        "Authorization": `JWT ${jwt}`
      },
      success: res => {
        console.log("收藏的数据", res)
        wx.hideLoading()
        that.setData({
          collect: res.data
        })
      },
      fail: err => {
        console.log(err)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.showLoading({
      title: '加载中',
    })
    wxuser = wx.getStorageSync("openIs")
    jwt = JSON.parse(wxuser)
    that = this;
    var collect = app.globalData.movies + "/userfavs"
    that.collectData(collect)
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
    this.onLoad()
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