var that;
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hiddenName: true,
    xuanfu: true,
    recomentDetailsData: {},
    images: []
  },
  recomingCont: function (recomentData) {
    wx.request({
      url: recomentData,
      method: "GET",
      header: {
        "content-type": "application/json"
      },
      success: res => {
        console.log("轮播页详细数据:", res.data)
        that.setData({
          recomentDetailsData: res.data,
          images: res.data.images
        })
      }
    })
  },
  // 简介显示与隐藏
  videotou: function () {
    that.setData({
      hiddenName: !that.data.hiddenName
    })
  },
  // 评论框的显示隐藏
  clickComment: function () {
    that.setData({
      xuanfu: !that.data.xuanfu
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("通过点击首页传递过来的数据", options.id)
    that = this;
    that.setData({
      getId: options.id
    })
    var recomentData = app.globalData.movies + "/broadcast/" + that.data.getId;
    that.recomingCont(recomentData);
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
    console.log(this.tt)
    return {
      title: "我在看" + that.data.recomentDetailsData.curriculum + "，你也来看吧",
      path: 'pages/banner/banner-page/banner-page?id=' + that.data.getId
    }
  }
})