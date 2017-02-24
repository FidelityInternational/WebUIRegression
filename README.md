# grunt-web-regression

> Grunt Plugin to run CasperJS based tests for web regression, and thereafter compare results to identify ui mismatch

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins.


Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt reference --testconfig=google_test_config
grunt test --testconfig=google_test_config
```

## The "web_regression" task

### Overview
In your testconfig file insert.

```js
{
	"url": "https://www.google.co.in",
	"scriptfile": "./scripts/test/googlecode.js",
	"testname": "Google",
	"browser": "iPhone5_h",
	"casperOptions": ["--ignore-ssl-errors=true", "--ssl-protocol=any"]
}
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Still Under Development)_
