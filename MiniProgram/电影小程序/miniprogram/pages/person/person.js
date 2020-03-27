// pages/person/person.js
var that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    hasuserinfo: true,
    userinfo: {},
  },

  login() {
    wx.login({
      success: res => {
        console.log(res.code)
        if (res.code) {
          //发起网络请求
          wx.getUserInfo({
            success: userinfo => {
              console.log(userinfo)
              wx.request({
                url: 'http://www.thexxdd.cn/program/',
                method: "POST",
                data: {
                  code: res.code
                },
                header: {
                  'content-type': 'application/json' // 默认值
                },
                success: res => {
                  console.log(res)
                  var token = JSON.stringify(res.data.token)
                  wx.setStorageSync("openIs", token)
                  // 判断登录态是否存在
                  var wxuser = wx.getStorageSync("openIs")
                  if (wxuser) {
                    that.setData({
                      userinfo: userinfo.userInfo,
                      hasuserinfo: false
                    })
                  } else {
                    that.setData({
                      hasuserinfo: true
                    })
                    wx.showToast({
                      title: '服务器错误',
                      duration: 2000,
                      icon: 'none'
                    })
                  }
                },
                fail: err => {
                  console.log(err)
                }
              })
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }

      },
      fail: err => {
        console.log("用户拒绝了登录")
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    that = this;
    var wxuser = wx.getStorageSync("openIs")
    if (wxuser) {
      wx.getUserInfo({
        success: res => {
          that.setData({
            userinfo: res.userInfo,
            hasuserinfo: false
          })
        },
        fail: err => {
          console.log("获取用户信息失败")
        }
      })
    }else{
      console.log("没有登录态")
      that.setData({
        hasuserinfo:true
      })
    }
  },
// 我的收藏
  toClection(){
    wx.navigateTo({
      url: '/pages/collection/collection',
    })
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