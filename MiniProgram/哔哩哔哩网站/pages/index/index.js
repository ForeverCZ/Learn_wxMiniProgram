Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 被点击的首页导航菜单索引
    currentIdexNav: 0,
    // 导航数据
    navList: [],
    // 轮播图数据
    swiperList: [],
    // 视频列表数据
    videoList: []
  },
  getNavList: function() {
    let that = this;
    wx.request({
      url: 'https://easy-mock.com/mock/5c1dfd98e8bfa547414a5278/bili/navList',
      success: function(e) {
        console.log("导航数据")
        console.log(e)
        if (e.data.code === 0) {
          that.setData({
            navList: e.data.data.navList
          })
        }
      }
    })
  },
  swiperList: function() {
    var self = this;
    wx.request({
      url: 'https://easy-mock.com/mock/5c1dfd98e8bfa547414a5278/bili/swiperList',
      success: function(e) {
        console.log("轮播图数据");
        console.log(e);
        self.setData({
          swiperList: e.data.data.swiperList
        })
      },
    })

  },
  //获取视屏列表
  getVedioList: function() {
    let self=this;
    wx.request({
      url: 'https://easy-mock.com/mock/5c1dfd98e8bfa547414a5278/bili/videosList',
      success:function(e){
        console.log("视屏数据");
        console.log(e);
        self.setData({
          videoList: e.data.data.videosList
        });
      },
    })
  },
  // 点击首页导航按钮
  activeNav: function(e) {
    console.log("点击导航按钮");
    console.log(e);
    this.setData({
      currentIdexNav: e.currentTarget.dataset.index,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //获取首页导航数据
    this.getNavList();
    // 获取轮播图
    this.swiperList();
    // 获取视屏数据
    this.getVedioList();
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