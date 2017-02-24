/**
 *
 */
var utils = require('utils');
var casper = require('casper').create
({
	verbose: true,
	logLevel: "debug"
});
casper.on('remote.alert', function(message) 
{
    this.echo(message);
});

casper.echo("Casper Start File Loaded");

var system = require('system');
var fs = require('fs');
var browserConfig = require('./scripts/casperConfigs/browserConfig');
var capture = require('./scripts/casperConfigs/capture');
var randomtext = require('./scripts/casperConfigs/randomGenerator');
//var routinefunctions=require('./libs/routinefunction');
var url = casper.cli.get('url');
var browser = casper.cli.get('browser') || 'desktopChrome';// command line option
var x = require('casper').selectXPath;
casper.mode = casper.cli.get('mode') || 'reference';
var pathPrefix = casper.cli.get('testname') || 'adhoc';
var casperScript = casper.cli.get('script');
//var require = patchRequire(require);
casper.waitTimeout = 100000;
phantom.clearCookies();


capture.setPathPrefix(pathPrefix);

casper.log("Running Script: "+casperScript);
casper.log("Running URL: "+url);

casper.options.onResourceRequested = function(C, requestData, request) 
{
	//this.log("Request:   " + requestData.url);
};
casper.options.onResourceReceived = function(C, response) 
{
	//this.echo("Response   " + response.url + ', status:' +response.status);
};


if(!url) 
{
  this.echo("No URL Provided. Please pass --url=full_url_path");
  this.exit();
}

if(!casperScript) 
{
  this.echo("No Script to run. Please pass --script=path of script");
}

//
casper.on('page.loaded', function() 
{
  this.log("initializing browser ------------");
  browserConfig.setBrowserConfig(browser, casper);
});

//require(casperScript)(casper, browser, capture,logincdb,accnumber);
require(casperScript)(casper, browser, capture);


casper.options.onDie = function(_, message, status)
{
	this.echo('Test Ended Abruptly\n.....\n....\n...\n..\n..\n.\n');
	if(casper.mode==="reference") 
	{
		var compareConfig = capture.getCompareConfig();
		fs.write(compareConfig.comparePath, JSON.stringify(compareConfig), 'w');
	}
	this.clear();
};

casper.run(function() 
{
	if(casper.mode==="reference") 	
	{
		var compareConfig = capture.getCompareConfig();
		fs.write(compareConfig.comparePath, JSON.stringify(compareConfig), 'w');
	}
	this.clear();
	this.echo("CasperJS " + this.mode +" Done");
	this.echo("-----------------------------");
	this.exit();
});
