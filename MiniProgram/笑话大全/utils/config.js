var appid = 102561;
var securit = "b9fc0dfe88b040caac5ec3ef8373ef44";
var param = "?showapi_appid=" + appid + "&showapi_sign=" + securit;
var textJoke = "https://route.showapi.com/341-1" + param;
var imgjoke = "https://route.showapi.com/341-2" + param;
// 把数据暴露出去
module.exports = {
  textJoke: textJoke,
  imgjoke: imgjoke,
};
