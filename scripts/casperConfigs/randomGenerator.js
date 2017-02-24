/**
 * http://usejsdoc.org/
 */
module.exports = {
	
	makeid : function(type) {
		var text = "";
		var a = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
		var an = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
		var thistype = type || an;
		
		var possible = (thistype == 'a')? a : an ;

		for (var i = 0; i < 8; i++)
			text += possible
					.charAt(Math.floor(Math.random() * possible.length));

		return text;
	}

};