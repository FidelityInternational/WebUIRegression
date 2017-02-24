/**
 * http://usejsdoc.org/
 */
var resemble = require('node-resemble-js');
var fs = require('fs');
var constants = require('./modules/constants');
var runcasper = require('./libs/runcasper');
var reporter = require('./libs/reporter');

function storeFailedDiffImage(filename, data, cb) {
	console.log(filename);
	if(filename==="" && data==null) {
		cb();
	}
	var failedDiffFilename = filename;
	console.log('Storing diff image in ' + filename);
	var failedDiffStream = fs.createWriteStream(failedDiffFilename);
	failedDiffStream.on('close', function() {
		cb();
	});
	data.getDiffImage().pack().pipe(failedDiffStream);
	// data.getDiffImage().pack().pipe(fs.createWriteStream(filename));
}


module.exports = function(grunt) {

	require('time-grunt')(grunt);

	var packageJSON = require("./package.json");

	grunt.registerTask('reference', 'Reference Creation', function() {
		// check file exists
		var testconfig = grunt.option("testconfig");
		var filePath = packageJSON.appConfig.configScriptPath + testconfig + ".json";
		//console.log(filePath.toString());


		var config= grunt.file.readJSON(filePath);
		//console.log(config);

		// TODO: rewrite with node fs.exists. grunt filesystem seems to be crappy
		var imagepath = packageJSON.appConfig.imagepath+config.testname+'/'+config.browser;
		console.log("ImagePath: "+ imagepath);
		if(grunt.file.exists(imagepath+"/reference") && grunt.file.isDir(imagepath+"/reference")){
			grunt.file.delete(imagepath+"/reference");
			grunt.file.delete(imagepath+"/compareConfig.json");
		}
		if(grunt.file.exists(imagepath+"/test") && grunt.file.isDir(imagepath+"/test")){
			grunt.file.delete(imagepath+"/test");
			grunt.file.delete(imagepath+"/report.html");
		}
		var done = this.async();
		var launchOptions = config.casperOptions.concat(["--testname=" + config.testname,
		                                                 "--mode=reference",
		                                                 "--browser="+config.browser,
		                                                 "--url="+config.url,
		                                                 "--script="+config.scriptfile,
		                                                 "casperStarter.js"]);
		grunt.log.write([launchOptions]);
		runcasper.run(grunt, launchOptions, function(error){
			// done();
			if(error===0) {
				done();
			} else {
				done(false);
			}
		});
	});


	grunt.registerTask("test", "Combine Test and Compare", function(){
		var testconfig = grunt.option("testconfig");
		var filePath = packageJSON.appConfig.configScriptPath + testconfig + ".json";
		//console.log(filePath.toString());
		var config= grunt.file.readJSON(filePath);
		//console.log(config);

		var done = this.async();
		var launchOptions = config.casperOptions.concat(["--testname=" + config.testname,
		                                                 "--mode=test",
		                                                 "--browser="+config.browser,
		                                                 "--url="+config.url,
		                                                 "--script="+config.scriptfile,
                                                     "casperStarter.js"]);
		grunt.log.write([launchOptions]);
		var imagepath = packageJSON.appConfig.imagepath+config.testname+'/'+config.browser;

		if(grunt.file.exists(imagepath+"/test") && grunt.file.isDir(imagepath+"/test")){
			grunt.file.delete(imagepath+"/test");
			grunt.file.delete(imagepath+"/report.html");
		}
		runcasper.run(grunt, launchOptions, function(error){
			if(error===0) {
				console.log("End of Test Capture --------------------------- ");
			  done();
			} else {
				done(false);
			}

		});

	});


	grunt.registerTask("compare", "Comparison", function(){

	  var done = this.async();
	  var testconfig = grunt.option("testconfig");
    var filePath = packageJSON.appConfig.configScriptPath + testconfig + ".json";
    console.log("Start Comparisons --------------------------- ");
    // console.log(filePath.toString());
    var config= grunt.file.readJSON(filePath);

	  compare();

	  function compare(){
	    var resembleTestConfig = {
	        errorColor: {
	          red: 155,
	          green: 100,
	          blue: 155
	        },
	        errorType: 'movement',
	        transparency: 0.5,
	        largeImageThreshold: 3000
	      };
      resemble.outputSettings(resembleTestConfig);
      var comparepath = packageJSON.appConfig.imagepath+config.testname+'/'+config.browser;
      if(grunt.file.exists(comparepath+'/diff') && grunt.file.isDir(comparepath+'/diff')){
        grunt.file.delete(comparepath+'/diff');
      }
      grunt.file.mkdir(comparepath+'/diff/');
      console.log(comparepath);
      var compareJS = grunt.file.readJSON(comparepath + '/compareConfig.json');
      var counter = compareJS.imageCount;
      var failCount = 0;

      compareJS.testPairs.forEach(function(item){
        if(!grunt.file.exists(item.test_img)) {
          console.log("File "+item.test_img+" does nto exist, creating empty file");
          grunt.file.copy(packageJSON.appConfig.imagepath+"/empty.png", item.test_img);
        }
        resemble(item.ref_img).compareTo(item.test_img).onComplete(
            function(data) {
              counter --;
              console.log("Here ----------- > "+item.test_img);
              var imageComparisonFailed = !data.isSameDimensions
                  || data.misMatchPercentage > item.misMatchThreshold;
              var testStatus = '';
              if (imageComparisonFailed) {
                testStatus = "fail";
                console.log('MISMATCH:' + item.img_name);
                item.status = testStatus;
                failCount++;
                storeFailedDiffImage(comparepath + '/diff/'+ item.img_name, data, function(){
                  console.log("Diff Image File write complete: "+item.img_name);
                  console.log("counter  --> "+counter);
                  if(counter<=0) {
                    finishComparison();
                  }
                });
                item.diffFilePath = comparepath + '/diff/'+ item.img_name;
              } else {
                testStatus = "pass";
                item.status = testStatus;
                console.log('MATCHED: '+item.img_name);
                console.log("counter  --> "+counter);
                if(counter<=0) {
                  finishComparison();
                };
              }

              function finishComparison() {
                compareJS.failCount = failCount;
                var htmlStr = reporter.createReport(compareJS);
                grunt.file.write(comparepath + '/report.html', htmlStr);
                console.log("Results published in "+process.cwd()+comparepath + "\\report.html");
                done();
              };
            });

      });


    };

	});

	grunt.registerTask("validate", ["test", "compare"]);


}
