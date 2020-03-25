##一、写项目初衷
为了打造自己的专属多功能小程序，此小程序包括AI识别、花草、动物、菜品、车型、垃圾、文字，各种实用小功能，平时旅游遇到不知道的花、草、动物，拿起手机扫一扫就知道了。

##二、项目介绍
爱识物是一个可以将手机相册里的照片（或拍照的照片）上传，并调用api实现对图片的分析，并将结果呈现给用户观看，该项目主要使用了腾讯AI、百度AI、京东AI。

##三、项目简介
爱存储小程序使用的是小程序的云开发，云开发自带免费的云存储、云数据库，开始时不需要涉及服务器的搭建及运维，也不需要进行域名注册与备案，只需要通过一些简单的API就能实现一个完整项目的业务逻辑，免费而且无需后端，开发成本非常低，因此这个小程序从创建到发布都是免费的，非常适合新手。

##四、项目准备
在云数据库中flowerUserInfo集合用来存储用户信息

##五、功能介绍与项目的目标
下面将会围绕以下几个比较核心的功能进行分析。

###解码图片base64(花草识别、动物识别、菜品识别、车型识别)
在调用api对图片实现ai分析时需要使用图片的base64编码，因此需要解码图片。

 		//专用解码接口wx.getFileSystemManager().readFileSync
        var imgbase = wx.getFileSystemManager().readFileSync(res.tempFilePaths[0], "base64");

###以花草识别为例调用云函数
通过调用云函数完成后端代码的实现，通过云函数可以获取到图片分析后的结果。

	lowerCloud: function(imgbase) {
    let self = this;
    wx.cloud.callFunction({
      name: "flower",
      data: {
        image: imgbase
      }
    }).then(res => {
      console.log("调用云函数去除的原始数据")
      console.log(res)
      console.log(res.result.flower.result)
      let botanyimg = res.result.flower.result;

      //map()返回一个新数组  取小数点
      let botanydata = botanyimg.map(item => {
        let name = item.name;
        let score = item.score.toFixed(3);
        let baike = item.baike_info;
        return {
          name,
          score,
          baike
        }
      })
      console.log(botanydata)
      this.setData({
        animition: false,
        botanyimg: botanydata,
        btnOpen: true,

      })

    }).catch(err => {
      console.log(err)
      // 请求出现错误
      console.log("222")
      self.setData({
        loadMsg: true,
        animition: false,
        btnOpen: true
      })
    })
  },

###后端函数以花草识别为例
配置了APP_ID、API_KEY、SECRET_KEY，这些都是使用百度AI产品的基本配置，需要在百度AI官网 注册一个账号就有这些信息。

	//云函数入口文件
	const cloud = require('wx-server-sdk')


	var AipImageClassifyClient = require("baidu-aip-sdk").imageClassify;
	cloud.init()


	// 设置APPID/AK/SK
	var APP_ID = "17071630";
	var API_KEY = "hG1EXHGkP39lt4fYGVxXpNVq";
	var SECRET_KEY = "5Oo6IEn70GeXf0CdCx088bNTHGcYpUUd";

	// 新建一个对象，建议只保存一个对象调用服务接口
	var client = new AipImageClassifyClient(APP_ID, API_KEY, SECRET_KEY);

	//如果有可选参数
	var options = {};
	options["baike_num"] = "5";
	// 云函数入口函数
	exports.main = async(event, context) => {
	  let flower = await aiFlower()
 	 console.log(flower);
 	 return {
 	   flower
	  }

 	 //调用函数
 	 //event.image的图片必须是base64
 	 	function aiFlower() {
    	return new Promise((resolve, reject) => {
     	 client.plantDetect(event.image, options).then(res => {
      	  resolve(res)
    	  }).catch(err => {
      	  console.log(err)
   	   })
  	  })
 	 }
	}
###MD5加密
在垃圾识别中使用到了MD5加密，京东AI要求在调用api时对数据进行相应的加密，MD5加密太过于复杂于是我去csdn找了一下这方面资料，找到了相应的代码实现了对数据的加密。

	//引入MD5 js核心代码
	const md5 = require('../../public/md5.js');
	//对数据进行加密
	let sign = md5.hexMD5(SecretKey + time);
###车型识别、垃圾识别、文字识别
这几个功能和前面逻辑基本差不多，也是通过调用api实现对图片的分析，只不过小程序UI和数据渲染有多不同。


##七、总结