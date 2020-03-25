
var appid = 57274;
var secret = "66d747c81d04439ea7afd48ed652f2d8";
var param = "?showapi_appid=" + appid + "&showapi_sign=" + secret;

var types = "https://route.showapi.com/907-1" + param;
var search = "https://route.showapi.com/907-2" + param;
var today = "https://route.showapi.com/907-4" + param;

module.exports = {
  types: types,
  search: search,
  today: today
}