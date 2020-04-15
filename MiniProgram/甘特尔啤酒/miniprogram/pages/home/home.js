const db = wx.cloud.database()
var that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 广播数据
    broadData: [],
    bannerData: [],
    listData: [],
    // 遮罩层
    ismask: false,
    isfade: false,
    // 授权按钮
    isauthor: true,
    // 添加到我的小程序
    isAdd: false
  },
  // 预览banner
  previewBanner(event) {
    console.log(event.currentTarget.dataset.index)
    let currentIndex = event.currentTarget.dataset.index
    let dataImage = that.data.bannerData.map(function(currentValue, index) {
      return currentValue.image
    })
    console.log(dataImage)
    wx.previewImage({
      current: dataImage[currentIndex], // 当前显示图片的http链接
      urls: dataImage // 需要预览的图片http链接列表
    })
  },
  // 打电话
  phone() {
    wx.makePhoneCall({
      phoneNumber: '18863965552' //仅为示例，并非真实的电话号码
    }).then(res => {
      console.log("拨打成功")
    }).catch(err => {
      console.log(err)
    })
  },
  // 加我微信
  wx() {
    that.setData({
      ismask: true
    })
  },
  // 打开设置页面
  openSeting() {
    wx.openSetting({
      success: res => {
        that.setData({
          isauthor: true,
        })
      }
    })
  },
  // 取消遮罩层
  cancelMask() {
    that.setData({
      ismask: false,
      isauthor: true
    })
  },
  // 不让swipper手动滑动
  //   stopTouchMove(event){
  // even.
  //   },
  // 请求banner数据
  banner() {
    db.collection('banner').get().then(res => {
      console.log("banner数据", res.data)
      that.setData({
        bannerData: res.data
      })
    })
  },
  // 请求商品列表数据
  listMerchandise() {
    db.collection('list').get().then(res => {
      console.log("商品列表", res.data)
      that.setData({
        listData: res.data
      })
    })
  },
  // 请求广播数据
  broad() {
    db.collection('broad').get().then(res => {
      console.log("广播数据", res.data)
      that.setData({
        broadData: res.data
      })
    })
  },
  // 长按保存图片
  savePicture() {
    wx.getSetting({
      success: res => {
        if (!res.authSetting['scope.writePhotosAlbum']) {
          wx.authorize({
            scope: 'scope.writePhotosAlbum',
            success: () => {
              that.saveFunction()
            },
            fail: () => {
              wx.showToast({
                title: '请先获取权限',
                icon: 'none'
              }).then(res => {
                setTimeout(function() {
                  that.setData({
                    isauthor: false,
                  })
                }, 1000)
              })
            }
          })
        } else {
          that.saveFunction()
        }
      },
      fail: err => {
        wx.showToast({
          title: '请重试',
          icon: 'none'
        })
      }
    })


  },
  // 保存到相册
  saveFunction() {
    wx.saveImageToPhotosAlbum({
      filePath: "/image/wxcode.jpg"
    }).then(res => {
      wx.showToast({
        title: '保存到相册成功',
      }).then(() => {
        that.setData({
          isfade: true
        })
        setTimeout(function() {
          that.setData({
            ismask: false,
            isfade: false
          })
        }, 2000)
      })
    }).catch(err => {
      console.log(err)
      wx.showToast({
        title: '保存失败,请重试',
        icon: 'none',
      })
    })
  },
  // 预览所有图片
  showAll(event) {
    console.log(event.currentTarget.dataset.index)
    let currentIndex = event.currentTarget.dataset.index
    wx.previewImage({
      current: that.data.listData[currentIndex].images[0], // 当前显示图片的http链接
      urls: that.data.listData[currentIndex].images // 需要预览的图片http链接列表
    })
  },
  // 取消添加到我的小程序
  cancelAddPro() {
    that.setData({
      isAdd: true
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    that = this;
    that.banner();
    that.listMerchandise();
    that.broad();
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

  // 滚动事件
  onPageScroll: function(event) {
    // console.log(event.scrollTop)
    let scrollTop = event.scrollTop
    if (scrollTop > 150) {
      that.setData({
        isAdd: true
      })
    } else {
      that.setData({
        isAdd: false
      })
    }
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
      title: '甘特尔啤酒厂家直销，火爆招聘代理中~',
      path: 'pages/home/home'
    }
  }
})