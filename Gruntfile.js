/*
 * grunt-web-regression
 * https://github.com/FidelityInternational/WebUIRegression
 *
 * Copyright (c) 2017 Tirtha Guha
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    // Configuration to be run (and then tested).
    //web_regression: {
    //  default_options: {
    //    options: {
    //    },
    //    files: {
    //      'tmp/default_options': ['test/fixtures/testing', 'test/fixtures/123']
    //    }
    //  },
    //  custom_options: {
    //    options: {
    //      separator: ': ',
    //      punctuation: ' !!!'
    //    },
    //    files: {
    //      'tmp/custom_options': ['test/fixtures/testing', 'test/fixtures/123']
    //    }
    //  }
    //},

    web_regression: {
      default_options: {
        "url": "https://www.google.co.in",
        "scriptfile": "./scripts/test/googlecode.js",
        "testname": "Google",
        "browser": "Chrome",
        "casperOptions": ["--ignore-ssl-errors=true", "--ssl-protocol=any"],
        "imageDirectory": "./images/"
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  //grunt.registerTask('test', ['clean', 'web_regression', 'nodeunit']);
  grunt.registerTask('test', ['clean', 'web_regression']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
