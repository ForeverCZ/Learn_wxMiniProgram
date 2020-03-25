var app = getApp();
var WxParse = require('../../../wxParse/wxParse.js');
var that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content: {}
  },
  routinecont(routineData) {
    wx.request({
      url: routineData, //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: "GET",
      success: res => {
        console.log("列表详情页数据", res.data)
        var article = res.data.goods_desc
        that.setData({
          content: res.data
        })
        WxParse.wxParse('article', 'html', article, that, 5);
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options.id)
    that = this;
    that.setData({
      getId: options.id
    })
    var routineData = app.globalData.movies + "/film/" + that.data.getId;
    that.routinecont(routineData);
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