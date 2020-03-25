// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // data:[{
    //   img: 'https://m.360buyimg.com/mobilecms/s750x750_jfs/t1/49957/23/5465/178081/5d325502Eafbcaf7b/16f5dafced4ef54f.jpg!q80.dpg.webp',
    //   name: '青春衣服',
    //   price: "￥999.9"
    // }]
        

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var data = JSON.parse(options.data  );
    for(var i=0;i<data.length;i++){
      data[i].img=decodeURIComponent(data[i].img);
    }
    // 不在data里定义直接在这
    this.setData({
      data:data
    });

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