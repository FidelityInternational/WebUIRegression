/**
 * http://usejsdoc.org/
 */
var casper = require('casper').create();
var system = require('system');
var fs = require('fs');
var browserConfig = require('../casperConfigs/browserConfig');
var capture = require('../casperConfigs/capture');
var randomtext = require('../casperConfigs/randomGenerator');
var url = casper.cli.get('url');
var browser = casper.cli.get('browser') || 'desktopChrome';// command line option
casper.mode = casper.cli.get('mode') || 'reference';
var pathPrefix = casper.cli.get('testname') || 'adhoc';
casper.waitTimeout = 30000;

casper.echo(pathPrefix);
capture.setPathPrefix(pathPrefix);

if(!url) {
  this.echo("No URL Provided. Please pass --url=full_url_path");
    this.exit();
}
