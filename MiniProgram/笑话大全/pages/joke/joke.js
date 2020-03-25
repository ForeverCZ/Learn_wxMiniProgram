// pages/joke/joke.js
var url = require("../../utils/config.js");
console.log(url);
var junmpFlage = true;
var pageNum = 1;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag: false,
    data: [],
    lodingMore: false,
    lodingOverAll: false,
    color: ['one', 'two', 'three'],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.showLoading({
      title: '正在加载..',
    });
    this.request();
  },
  //网络请求
  request: function() {
    var self = this;
    var time = new Date().getTime();
    wx.request({
      url: url.textJoke,
      data: {
        showapi_timestamp: time,
        page: pageNum,
        maxResult: 40,
      },
      success: function(e) {
        console.log(e);
        var data = e.data.showapi_res_body.contentlist;
        var length = data.length;
        if (length == 0) {
          self.setData({
            lodingMore: false,
            lodingOverAll: true,
          });
          return;
        }

        // 数组的拼接
        var list = self.data.data.concat(data);

        for (var i = 0; i < data.length; i++) {
          data[i].text = self.removeHtml(data[i].text);
        }
        console.log(e);
        self.setData({
          data: list,
          flag: true,
          lodingMore: false,

        });
        wx.hideLoading();

        //手动关闭下拉刷新
        wx.stopPullDownRefresh();
      }
    })
  },
  jump: function(e) {
    if (junmpFlage) {
      junmpFlage = false;
      var id = e.currentTarget.id;

      //js语句转化成json对象
      var temp = JSON.stringify(this.data.data[id]);

      // 调到详情页病传带数据 data
      wx.navigateTo({
        url: '../text/text?data=' + temp,
      })
    }

  },


  //正则表达式去除html代码
  removeHtml: function(str) {
    return str.replace(/<[^>]+>/g, '');
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },
  // uper: function() {
  //   wx.startPullDownRefresh({

  //   })
  // },
  // lower: function() {
  //   this.setData({
  //     lodingMore: true,
  //     lodingOverAll: false,
  //   })
  //   pageNum++;
  //   this.request();
  // },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    junmpFlage = true;
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
    this.request();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    this.setData({
      lodingMore: true,
      lodingOverAll: false,
    })
    pageNum++;
    this.request();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})