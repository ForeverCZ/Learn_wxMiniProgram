var url = require("../../utils/config.js");
var jumpFlag = true;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img: {
      swiperImg: ["../../img/1.jpg", "../../img/2.jpg", "../../img/3.jpg", "../../img/4.jpg", "../../img/5.jpg"],
      ridImg: [
        'https://m.360buyimg.com/mobilecms/jfs/t14281/4/2001573997/14338/5a719a2b/5a67003dN05690911.png',
        'https://m.360buyimg.com/mobilecms/jfs/t11425/73/2288282326/13451/e11c7697/5a14d167Ne5414496.png',
        'https://m.360buyimg.com/mobilecms/jfs/t17845/159/515473608/17969/e0532ed1/5a90d78bNa4e52c4c.png',
        'https://m.360buyimg.com/mobilecms/jfs/t5707/83/1407890143/14681/29321e2c/59263c71Nc7d16503.png',
        'https://m.360buyimg.com/mobilecms/jfs/t9511/185/243002105/6399/cfe6874b/59ca07dcN9b1c275e.png',
        'https://m.360buyimg.com/mobilecms/jfs/t12511/281/1452079175/21296/781a499e/5a1fdc7cN6aad5b38.png',
        'https://m.360buyimg.com/mobilecms/s126x126_jfs/t2758/175/4146829331/10078/d6a3aa98/57aacab9N98edf989.png',
        'https://m.360buyimg.com/mobilecms/jfs/t5872/340/146804759/11154/f4ae1409/591d94c4N79a488cc.png',
        'https://m.360buyimg.com/mobilecms/jfs/t5824/248/156712927/7215/1ad6be5f/591d94c6Nc4711ad2.png',
        'https://m.360buyimg.com/mobilecms/jfs/t5842/205/151189300/13247/a6de2d/591d94edNc42fb94d.png'

      ],
      gridTitle: [
        '京东超市',
        '全球购',
        '京东服饰',
        '京东生鲜',
        '排行榜',
        '充值缴费',
        '领京豆',
        '领券',
        '赚钱到家',
        '物流查询'

      ]
    },
    interval: 3000,
    duration: 1500,
    activeColor: "#fff",
    contentImg: 'https://m.360buyimg.com/mobilecms/jfs/t19615/365/373374172/60028/e3517eb1/5a6f0c94Nf100693c.jpg!q70.jpg',
    opacity: 0,
    search: [
      "../../img/jd.png",
      "../../img/search.png"
    ],
    winHeight: 0,
    cid: ["9215", "9218", "9219", "9228", "9234"],
  },
  bindscroll: function(e) {
    var height = e.detail.scrollTop;
    console.log(e);
    if (height > 200) {
      return;
    }
    var opacityNum = height / 200;
    this.setData({
      opacity: opacityNum,
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var self = this;
    wx.getSystemInfo({
      success: function(res) {
        self.setData({
          winHeight: res.windowHeight,
        })
      },
    })
  },
  confirm: function(e) {
    wx.showLoading({
      title: '正在加载...',
    })
    var value = e.detail.value;
    wx.request({
      url: url.search,
      data: {
        cid: '',
        page: 1,
        keyword: value,
      },
      success: function(e) {
        console.log(e);
        var data = e.data.showapi_res_body.pageBean.contentlist;
        for (var i = 0; i < data.length; i++) {
          data[i].img = encodeURIComponent(data[i].img);
        }
        var temp = JSON.stringify(data);
        wx.navigateTo({
          url: '../detail/detail?data=' + temp,
          success: function() {
            wx.hideLoading();
          }
        })
      }
    })
  },
  swiper: function(e) {
    var id = e.currentTarget.id;
    console.log(e);
    var param = {
      cid: this.data.cid[id],
      page: 1,
      keyword: ''
    }
    var jumpUrl = '../detail/detail';
    // 封装request请求
    this.request(url.search, jumpUrl, param);
  },
  request: function(url, jumpUrl, param) {
    if (!jumpFlag) {
      return
    }
    jumpFlag = false;
    wx.showLoading({
      title: '正在加载...',
    })
    wx.request({
      url: url,
      data: param,
      success: function(e) {
        console.log(e);
        var data = e.data.showapi_res_body.pageBean.contentlist;
        for (var i = 0; i < data.length; i++) {
          data[i].img = encodeURIComponent(data[i].img);
        }
        var temp = JSON.stringify(data);
        wx.navigateTo({
          url: jumpUrl+'?data=' + temp,
          success: function() {
            wx.hideLoading();
          }
        })
      }
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
    jumpFlag = true;
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