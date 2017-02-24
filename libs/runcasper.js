/**
 * http://usejsdoc.org/
 */

function runcasper(grunt, options, callback) {

	console.log("running runcasper with options " + options );

	var gruntspawnoptions = {
		cmd : "casperjs",
		args : options,
		grunt: false,
    stdio: 'inherit'
	};

	function doneFunction(error, result, code) {
		  if(code===0){
			  console.log("exiting successfully");
		  } else {
			  console.log("exiting with error");
				console.log("Error Logs-----------------------------");
				console.log(error.toString());
				console.log(result);
				console.log(code);
				console.log("Error Logs End-------------------------");
		  }
		  //done();
		  callback(code);
		}

	var child = grunt.util.spawn( gruntspawnoptions, doneFunction);
  console.log("[process id]: "+child.id);

	child.stdout.on('data', function(buf) {
	    console.log(String(buf));
	});
}

exports.run = runcasper;
