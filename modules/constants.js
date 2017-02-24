/**
 * http://usejsdoc.org/
 */
var errorConstants = {
	REF_DOES_NOT_EXIST : {
		messege : "Reference images does not exists. Please run grunt reference with this configuration",
		code : 1
	},
	CONFIG_NOT_ENTERED : {
		messege : "Please run it with a configuration file. configuration file should exists in ./configs/ directory",
		code : 1
	},
	SCRIPT_DOES_NOT_EXIST : {
		messege : "The Script file does not exist in the mentioned path: ",
		code : 1
	}
}

exports.error = errorConstants;