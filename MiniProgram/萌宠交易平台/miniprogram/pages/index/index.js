// miniprogram/pages/index/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    longitude: null,
    latitude: null,
    controls: [{
      id: 1,
      iconPath: '../../image/flag.png',
      position: {
        left: app.globalData.windowWidth / 2 - 11,
        top: (app.globalData.windowHeight - 40) / 2 - 40,
        width: 50,
        height: 50
      }
    }, {
      id: 2,
      iconPath: '../../image/back.png',
      position: {
        left: 15,
        top: app.globalData.windowHeight - 80,
        width: 40,
        height: 40
      },
      clickable: true
    }]
  },
  controltap: function(e) {
    console.log(e)
    // if (e.controlId == 2) {
    //   this.getlocation();
    // }
    this.mapCtx.moveToLocation({
      longitude: this.data.longitude,
      latitude: this.data.latitude,
    })
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
    this.mapCtx = wx.createMapContext("map");

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.getlocation();
  },
  getlocation: function() {
    wx.getLocation({
      type: 'gcj02',
      success: res => {
        console.log(res)
        this.setData({
          longitude: res.longitude,
          latitude: res.latitude
        })
      },
    })
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
    console.log("出发了底部事件")
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    return {
      title: '萌宠交易平台',
      path: '/pages/index/index'
    }
  }
})