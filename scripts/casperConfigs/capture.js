/**
 * http://usejsdoc.org/
 */

var captureCount = 0;
var pathPrefix = "./images/";
var directoryName = "";
var compareConfig = {
	testPairs : []
};

function getDimentions(selector, casper) {
	casper.echo("capturing "+selector);
	var positionObj = casper.getElementBounds(selector);
	return {
		top : positionObj.top,
		left : positionObj.left,
		width : positionObj.width,
		height : positionObj.height
	};
}

function setPathPrefix(prefix) {
	directoryName = prefix;
	pathPrefix += prefix + '/';
}

function captureSelector(selector, casper) {
	var capturefilename = 'capture_' + captureCount + '.png';
	var captureName = pathPrefix + casper.currentBrowser + '/' + casper.mode
			+ '/' + capturefilename;
	casper.capture(captureName, getDimentions(selector, casper));
  //casper.captureSelector(captureName, selector);
	casper.echo("Captured " + captureName);

	// populate only during creation of reference
	if (casper.mode == "reference") {
		compareConfig.comparePath = pathPrefix + casper.currentBrowser
				+ '/compareConfig.json';

		testpath = pathPrefix + casper.currentBrowser + '/' + "test"
				+ '/capture_' + captureCount + '.png';

		compareConfig.testPairs.push({
			"ref_img" : captureName,
			"test_img" : testpath,
			"img_name" : capturefilename,
			"misMatchThreshold" : 0.1
		});

	}

	captureCount++;
}

function captureDimention(dimentions, casper) {
  var capturefilename = 'capture_' + captureCount + '.png';
  var captureName = pathPrefix + casper.currentBrowser + '/' + casper.mode
      + '/' + capturefilename;
  casper.capture(captureName, dimentions);
  casper.echo("Captured " + captureName);

  // populate only during creation of reference
  if (casper.mode == "reference") {
    compareConfig.comparePath = pathPrefix + casper.currentBrowser
        + '/compareConfig.json';

    testpath = pathPrefix + casper.currentBrowser + '/' + "test"
        + '/capture_' + captureCount + '.png';

    compareConfig.testPairs.push({
      "ref_img" : captureName,
      "test_img" : testpath,
      "img_name" : capturefilename,
      "misMatchThreshold" : 0.1
    });

  }

  captureCount++;
}

function getCompareConfig() {
	compareConfig.test_name = directoryName;
	compareConfig.imageCount = captureCount;
	return compareConfig;
}

exports.captureSelector = captureSelector;
exports.captureDimention = captureDimention;
exports.setPathPrefix = setPathPrefix;
exports.getCompareConfig = getCompareConfig;
