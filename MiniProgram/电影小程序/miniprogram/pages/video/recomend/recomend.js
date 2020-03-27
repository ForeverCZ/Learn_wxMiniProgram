var that, wxuser, jwt;
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hiddenName: true,
    xuanfu: true,
    recomentDetailsData: {},
    images: [],
    No: true
  },
  recomingCont: function(recomentData) {
    wx.request({
      url: recomentData,
      method: "GET",
      header: {
        "content-type": "application/json"
      },
      success: res => {
        console.log("推荐页详细数据:", res.data)
        that.setData({
          recomentDetailsData: res.data,
          images: res.data.images
        })
      }
    })
  },
  // 简介显示与隐藏
  videotou: function() {
    that.setData({
      hiddenName: !that.data.hiddenName
    })
  },
  // 评论框的显示隐藏
  clickComment: function() {
    that.setData({
      xuanfu: !that.data.xuanfu
    })
  },
  // 点击收藏
  collectioncont() {
    if (!wxuser) {
      wx.showToast({
        title: '3s后跳转登录',
        icon: "none",
        success: res => {
          setTimeout(function() {
            wx.switchTab({
              url: '../../person/person',
            })
          }, 3000)

        }
      })
      return
    }
    // 转换成对象
    // JWT不用管 后端的
    wx.request({
      url: app.globalData.movies + "/userfavs/",
      method: "POST",
      data: {
        goods: that.data.getId
      },
      header: {
        'content-type': 'application/json', // 默认值
        "Authorization": `JWT ${jwt}`
      },
      success: res => {
        that.setData({
          No: false
        })
        wx.showToast({
          title: '收藏成功',
          duration: 1400
        })
        console.log(res)
      },
      fail: err => {
        console.log(err)
      }
    })
  },
  // 取消收藏
  cancelcollectioncont: function() {
    wx.request({
      url: app.globalData.movies + "/userfavs/" + that.data.getId,
      method: "DELETE",
      header: {
        'content-type': 'application/json', // 默认值
        "Authorization": `JWT ${jwt}`
      },
      success: res => {
        console.log(res)
        that.setData({
          No: true
        })
        wx.showToast({
          title: '取消成功',
          duration: 1400
        })
      },
      fail: err => {
        console.log(err)
      }
    })
  },
  // 判断是否收藏
  judeCont(judeData) {
    wx.request({
      url: judeData,
      method: "GET",
      header: {
        'content-type': 'application/json', // 默认值
        "Authorization": `JWT ${jwt}`
      },
      success: res => {
        console.log("是否收藏:", res)
        if (res.statusCode == 404) {
          that.setData({
            No: true
          })
        } else {
          that.setData({
            No: false
          })
        }
      },
      fail: err => {
        console.log(err)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log("通过点击首页传递过来的数据", options.id)
    that = this;
    that.setData({
      getId: options.id
    })
    var recomentData = app.globalData.movies + "/details/" + that.data.getId;
    that.recomingCont(recomentData);
    // 获取token
    wxuser = wx.getStorageSync("openIs")
    jwt = JSON.parse(wxuser)
    var judeData = app.globalData.movies + "/userfavs/" + that.data.getId;
    that.judeCont(judeData)
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
    console.log(this.tt)
    return {
      title: "我在看" + that.data.recomentDetailsData.curriculum + "，你也来看吧",
      path: 'pages/video/recomend/recomend?id=' + that.data.getId
    }
  }
})