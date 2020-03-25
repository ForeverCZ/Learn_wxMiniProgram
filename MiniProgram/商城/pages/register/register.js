// pages/register/register.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    phoneNum: '',
    psd: '',
    userCode: '',
    trueCode: '',
    toastTest: '',
    showToast: false,
    gainFlage: false,
    key: '获取',
    loImg: "../../img/logo.jpg"
  },
  phoneBlur: function(e) {
    var phoneNum = e.detail.value;
    var len = phoneNum.length;
    if (len != 11 || phoneNum.charAt(0) != '1') {
      this.setData({
        toastTest: "号码格式不正确",
      })
      this.showToast();
      return;
    }
    this.setData({
      phoneNum: phoneNum,
    })
  },
  psdBlur: function(e) {
    var psd = e.detail.value;
    this.setData({
      psd: psd,
    });
  },
  code: function(e) {
    var userCode = e.detail.value;
    if (userCode.length != 6) {
      this.setData({
        toastTest: '验证码格式不正确',
      });
      this.showToast();
      return;
    }
    this.setData({
      userCode: userCode,
    })
  },
  gain: function() {
    var phoneNum = this.data.phoneNum;
    if (phoneNum == '') {
      this.setData({
        toastTest: '手机号不正确',
      })
      this.showToast();
      return;
    }
    var second = 30;
    this.countDown(second);
    // 产生六位随机数[100000-999999]
    var ran = Math.random() * 899999 + 100000;
    var num = Math.floor(ran);
    this.setData({
      trueCode: num,
    });
    wx.request({
      url: 'https://v.juhe.cn/sms/send',
      data: {
        mobile: this.data.phoneNum,
        tpl_id: '179881',
        tpl_value: encodeURI('#code#=') + num,
        key: 'a2c643294741a5ae2b81fec4a8d706c9'
      },
      success: function(e) {
        console.log(e);
      },
    })
  },
  countDown: function(num) {
    this.setData({
      gainFlage: true,
      key: num,
    })
    if (num <= 0) {
      this.setData({
        key: "获取",
        gainFlage: false,
      })
      return;
    }
    setTimeout(() => {
      var temp = num - 1;
      this.countDown(temp);
    }, 1000)
  },
  showToast: function() {
    this.setData({
      showToast: true
    });
    setTimeout(() => {
      this.setData({
        showToast: false,
      })
    }, 1500)
  },
  register: function() {
    var {
      userCode,
      trueCode
    } = this.data;
    if (userCode != trueCode) {
      this.setData({
        toastTest: '验证码不正确'
      });
      this.showToast();
      return;
    }
    wx.navigateTo({
      url: '../index/index',
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