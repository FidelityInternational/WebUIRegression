var fs = require('fs');



/*function fileExists (file, grunt){
	fs.stat(file, function(err, stat) {
		if (err == null) {
			console.log('File exists');
		} else if (err.code == 'ENOENT') {
			fs.writeFile('log.txt', 'Some log\n');
		} else {
			console.log('Some other error: ', err.code);
		}
	});
}*/


function createDir (path) {
	if(fileExists(path)){
		return;
	} else {
		try{
			
		} catch(e){
			
		}
	}
}

function storeFailedDiffImage(filename, data, count) {
	console.log(filename);
	var failedDiffFilename = filename;
	console.log('Storing diff image in ' + filename);
	var failedDiffStream = fs.createWriteStream(failedDiffFilename);
	failedDiffStream.on('close', function() {
		console.log("Finished Writing "+failedDiffFilename);
	});
	data.getDiffImage().pack().pipe(failedDiffStream);
	//data.getDiffImage().pack().pipe(fs.createWriteStream(filename));
}

exports.storeFailedDiffImage = storeFailedDiffImage;