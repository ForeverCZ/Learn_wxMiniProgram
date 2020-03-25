var that;
// 引入域名
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    containshow: true,
    banners: [],
    recommens: [],
    hongKongs: []
  },
  // 跳转到banner详情页
  jumpTBannerDetail: function(event) {
    console.log("当前banner图片的id:", event.currentTarget.id)
    var jumpId = event.currentTarget.id;
    wx.navigateTo({
      url: '/pages/banner/banner-page/banner-page?id=' + jumpId,
      success: res => {
        console.log(res)
      }
    })
  },
  // 跳转到recommnet详情页
  jumpTRommentDetail: function(event) {
    var jumpId = event.currentTarget.id;
    console.log("当前点击推荐电影的id", jumpId)
    wx.navigateTo({
      url: '/pages/video/recomend/recomend?id=' + jumpId,
      success: res => {
        console.log(res)
      }
    })
  },
  // 跳转到香港电影详情页
  jumpTHongKongDetail(event) {
    var jumpId = event.currentTarget.id;
    console.log("当前点击香港电影的id", jumpId)
    wx.navigateTo({
      url: '/pages/classc/hong/hong?id=' + jumpId,
      success: res => {
        console.log(res)
      }
    })
  },
  // 轮播图数据
  getmoviesData: function(banner) {
    wx.request({
      url: banner, //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: res => {
        // console.log(res.data)
        console.log("banner数据：", res.data)
        that.setData({
          banners: res.data
        })
      },
      fail: err => {
        console.log(err)
      }
    })
  },
  // 推荐页数据
  recomenndData: function(recomennd) {
    wx.request({
      url: recomennd, //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: res => {
        // console.log(res.data)
        console.log("recommens数据：", res.data)
        that.setData({
          recommens: res.data
        })
      },
      fail: err => {
        console.log(err)
      }
    })
  },
  // 香港电影数据
  hongKongData(hongKong) {
    wx.request({
      url: hongKong,
      header: {
        "content-type": "application/json"
      },
      success: res => {
        console.log("香港电影数据：", res.data)
        that.setData({
          hongKongs: res.data
        })
      },
      fail: err => {
        console.log(err)
      }
    })
  },
  // 实时获取数据
  getText: function(e) {
    // console.log(e.detail.value)
  },
  // 搜索框聚焦
  onbindfocus: function(e) {
    console.log("聚焦数据", e);
    that.setData({
      containshow: false
    })
  },
  // 显示轮播图
  containshow: function() {
    that.setData({
      containshow: !that.data.containshow
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    that = this;
    var banner = app.globalData.movies + "/banner/";
    var recomennd = app.globalData.movies + "/recommend/";
    var hongKong = app.globalData.movies + "/daily/";
    //请求banner数据
    this.getmoviesData(banner);
    // 请求recommen数据
    this.recomenndData(recomennd);
    // 请求香港电影数据
    this.hongKongData(hongKong);
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
    return {
      title: '电影大全',
      path: 'pages/index/index'
    }
  }
})