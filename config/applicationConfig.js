var applicationConfig = {};

applicationConfig.openFDA = {};
applicationConfig.database = {};
applicationConfig.google = {};
applicationConfig.captcha = {};
applicationConfig.searchResults = {};
applicationConfig.application = {};

var apiKey = process.env.openFDAAPIKey || "1RsGQW3DxtW2AdUK1LXOUPnFaNU3DiEcdX7kBTD3";
var mongoDbServer = process.env.databaseServer || 'localhost';
var searchResultLimit = process.env.searchResultLimit || 50;
var applicationMode = process.env.applicationMode || "develop";
var captchaUrl = process.env.captchaUrl || "https://www.google.com/recaptcha/api/siteverify";
var captchSecretKey = process.env.captchaSecretKey || "6Lf3GgkTAAAAAOSkHedz_ys5RI8-vzeJgrqYRSyR";
var captchSiteKey = process.env.captchaSecretKey || "6Lf3GgkTAAAAAM-KwKq3KxS4-7g40bbLA7jWEyBv";

applicationConfig.openFDA.url = "https://api.fda.gov/drug/label.json?api_key=" + apiKey + "&search=effective_time:[20090601+TO+20140731]+AND+openfda.substance_name:";
applicationConfig.database.server = mongoDbServer;
applicationConfig.captcha.url =  captchaUrl;
applicationConfig.captcha.secretKey = captchSecretKey;
applicationConfig.captcha.siteKey = captchSiteKey;
applicationConfig.openFDA.searchResultLimit = 50;
applicationConfig.application.mode = applicationMode;
applicationConfig.application.enableCaptcha = false;

module.exports = applicationConfig;

