// pages/countDown/countDown.js
var allMI = 1000000;

function format(mil) {
  var allSecond = Math.floor(mil / 1000);
  var h = Math.floor(allSecond / 3600);
  var m = Math.floor((allSecond - h * 3600) / 60);
  var s = Math.floor(allSecond - h * 3600 - m * 60);
  return h + ":" + m + ":" + s;
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    time: '',
  },
  bigein: function() {
    var self=this;
    var temp;
    setInterval(function() {
      temp = format(allMI);
      allMI = allMI-1000;
      self.setData({
        time: temp,
      })
      if (allMI < 0) {
        self.setData({
          time: '本次活动已结束',
        })
        return;
      }
    }, 1000)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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