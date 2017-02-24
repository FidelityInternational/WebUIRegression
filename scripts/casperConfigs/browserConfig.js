/**
 * http://usejsdoc.org/
 */

var browserConfigs = {
  "iPhone4_h" : {
    "userAgent" : "Mozilla/5.0 (iPhone; CPU iPhone OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A5376e Safari/8536.25",
    "width" : 480,
    "height" : 320
  },
  "iPhone4_v" : {
    "userAgent" : "Mozilla/5.0 (iPhone; CPU iPhone OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A5376e Safari/8536.25",
    "width" : 320,
    "height" : 480
  },
  "iPhone5_h" : {
    "userAgent" : "Mozilla/5.0 (iPhone; CPU iPhone OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A5376e Safari/8536.25",
    "width" : 568,
    "height" : 320
  },
  "iPhone5_v" : {
    "userAgent" : "Mozilla/5.0 (iPhone; CPU iPhone OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A5376e Safari/8536.25",
    "width" : 320,
    "height" : 568
  },
  "iPhone6_h" : {
    "userAgent" : "Mozilla/5.0 (iPhone; CPU iPhone OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A5376e Safari/8536.25",
    "width" : 667,
    "height" : 375
  },
  "iPhone6_v" : {
    "userAgent" : "Mozilla/5.0 (iPhone; U; CPU OS 4_3_2 like Mac OS X; en-us) AppleWebKit/533.17.9 (KHTML, like Gecko) Mobile",
    "width" : 375,
    "height" : 667
  },
  "iPhone6p_h" : {
    "userAgent" : "Mozilla/5.0 (iPhone; CPU iPhone OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A5376e Safari/8536.25",
    "width" : 736,
    "height" : 414
  },
  "iPhone6p_v" : {
    "userAgent" : "Mozilla/5.0 (iPhone; CPU iPhone OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A5376e Safari/8536.25",
    "width" : 414,
    "height" : 736
  },
  "iPad_h" : {
    "userAgent" : "Mozilla/5.0 (iPad; U; CPU OS 4_3_2 like Mac OS X; en-us) AppleWebKit/533.17.9 (KHTML, like Gecko) Mobile",
    "width" : 1024,
    "height" : 768
  },
  "iPad_v" : {
    "userAgent" : "Mozilla/5.0 (iPad; CPU OS 7_0 like Mac OS X) AppleWebKit/537.51.1 (KHTML, like Gecko) CriOS/30.0.1599.12 Mobile/11A465 Safari/8536.25 (3B92C18B-D9DE-4CB7-A02A-22FD2AF17C8F)",
    "width" : 768,
    "height" : 1024
  },
  "GalaxyS5_h" : {
    "userAgent" : "Mozilla/5.0 (Linux; Android 5.0; SM-G900P Build/LRX21T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.23 Mobile Safari/537.36",
    "width" : 640,
    "height" : 360
  },
  "GalaxyS5_v" : {
    "userAgent" : "Mozilla/5.0 (Linux; Android 5.0; SM-G900P Build/LRX21T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.23 Mobile Safari/537.36",
    "width" : 360,
    "height" : 640
  },
  "Nexus7_h" : {
    "userAgent" : "Mozilla/5.0 (Linux; Android 4.3; Nexus 7 Build/JSS15Q) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.23 Safari/537.36",
    "width" : 960,
    "height" : 600
  },
  "Nexus7_v" : {
    "userAgent" : "Mozilla/5.0 (Linux; Android 4.3; Nexus 7 Build/JSS15Q) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.23 Safari/537.36",
    "width" : 600,
    "height" : 960
  },
  "IE11" : {
    "userAgent" : "Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; WOW64; Trident/7.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; .NET CLR 1.1.4322; .NET4.0C; .NET4.0E; InfoPath.3)",
    "width" : 1280,
    "height" : 962
  },
  "desktopMozilla" : {
    userAgent : "Mozilla/5.0 (Windows NT 6.1; WOW64; rv:42.0) Gecko/20100101 Firefox/42.0",
    width : 1280,
    height : 962
  },
  "desktopSafari" : {
	    userAgent : "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_3) AppleWebKit/537.75.14 (KHTML, like Gecko) Version/7.0.3 Safari/7046A194A",
	    width : 1280,
	    height : 962
	  },
  "desktopChrome" : {
    userAgent : "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.80 Safari/537.36",
    width : 1366,
    height : 768
  }
};

function setBrowserConfig (config, casper) {
  console.log("Setting Browser "+config);
  
  var browserConfig = {};
  switch (config) {

  case "iPhone4_h":
  case "iPhone4_v":
  case "iPhone5_h":
  case "iPhone5_v":
  case "iPad_h":
  case "iPad_v":
  case "iPhone6_v":
  case "iPhone6p_h":
  case "iPhone6p_v":
  case "GalaxyS5_h":
  case "GalaxyS5_v":
  case "Nexus7_h":
  case "Nexus7_v":
  case "desktopSafari":
  case "IE11":
  case "desktopMozilla":
  case "desktopChrome":
    browserConfig = browserConfigs[config];
    break;
  default:
    config = "desktopChrome";
    browserConfig = browserConfigs[config];
    break;
  }

  casper.userAgent(browserConfig.userAgent);
  casper.viewport(browserConfig.width, browserConfig.height);
  casper.currentBrowser = config;

  // return browserConfig;
}

exports.setBrowserConfig = setBrowserConfig;