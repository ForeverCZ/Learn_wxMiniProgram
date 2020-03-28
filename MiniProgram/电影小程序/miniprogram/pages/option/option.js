var app = getApp();
var that, wxuser, jwt;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    messages: []
  },
  // 提交留言
  submit: function(event) {
    console.log(event.detail.value.textarea)
    if (event.detail.value.textarea == ""){
      wx.showToast({
        title: '亲,还没输入内容呢',
        icon:"none"
      })
      return
    }
      
    var message = event.detail.value.textarea
    that.setData({
      message: message
    })
    that.toSubmit()
  },
  // 表单重置
  reset(event){
    console.log(event)
  },
  // 提交留言函数
  toSubmit() {
    wx.request({
      url: app.globalData.movies + "/messages/",
      method: "POST",
      header: {
        'content-type': 'application/json', // 默认值
        "Authorization": `JWT ${jwt}`
      },
      data: {
        message: that.data.message
      },
      success: res => {
        console.log("提交成功", res)
        wx.showToast({
          title: '提交成功',
          success:res=>{
            that.getSubmit()
          }
        })

      },
      fail: err => {
        console.log(err)
      }
    })
  },
  // 获取留言函数
  getSubmit() {
    wx.request({
      url: app.globalData.movies + "/messages/",
      method: "GET",
      header: {
        'content-type': 'application/json', // 默认值
        "Authorization": `JWT ${jwt}`
      },
      success: res => {
        console.log("获取留言成功", res.data)
        that.setData({
          messages: res.data.reverse()
        })
      },
      fail: err => {
        console.log(err)
      }
    })
  },
  // 检查登录态
  checklogin() {
    wxuser = wx.getStorageSync("openIs")
    jwt = JSON.parse(wxuser)
    if (wxuser) {
      wx.getUserInfo({
        success: res => {
          console.log(res)
          that.setData({
            userInfo: res.userInfo
          })
        },
        fail: err => {
          console.log(err)
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 取出登录态
    that = this;
    that.checklogin();
    // 获取留言
    that.getSubmit();
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