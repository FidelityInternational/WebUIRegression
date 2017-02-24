/**
 * http://usejsdoc.org/
 */

function getCSS() 
{
	return "<style>" +
			"body { 	font-family: arial; 	font-size: 14px; } " +
			"table { 	margin: 10 auto; 	width: 90% } " +
			"td { 	text-align: center; 	max-width: 250px; 	max-height: 250px; 	width: 100px; } " +
			"td img { 	max-height: 250px; 	max-width: 250px; 	padding: 10px; } " +
			"th { 	background: #262626; 	color: #fff; 	font-family: arial; } " +
			".success { 	background-color: DEF9DD; } " +
			".failure { 	background-color: FFE3B0; } " +
			".index { 	text-align: center; 	max-width: 20px; } " +
			".result { 	text-align: center; 	width: 250px;} " +
			".pass { 	color: #fff; 	background: green; 	display: inline-block; 	padding: 5px 10px; } " +
			".summery { 	margin: 10 auto; 	font-family: arial; 	font-size: 20px; 	padding-bottom: 20px; 	padding-top: 20px; }" +
			"</style>";
}



function reporter(data) 
{
	var htmlString = "";
	var now = new Date();
	htmlString = "<html><head>"+getCSS()+"</head>"+
	"<body><div class=\"summery\">Test suit: <b>"+data.test_name+"</b> <br /> <br /> Number of Images: <b>"+data.imageCount+"</b>&nbsp;&nbsp;" +
	"Passed : <b>"+(data.imageCount - data.failCount)+"</b>&nbsp;&nbsp; Failed : <b>"+data.failCount+"</b> <br/>Time of test execution: <b>"+now.toUTCString()+"</b></div> "+
	"<table><thead>" +
	"<tr><th>Sl No.</th>" +
	"<th>Reference</th>" +
	"<th>Status</th>" +
	"</tr></thead><tbody>";
	
	
	var counter = data.imageCount;
	data.testPairs.forEach(function(item)
	{
		counter --;
		var imageNumber = Number(data.imageCount)-Number(counter);
		if(item.status.toUpperCase()=="PASS")
		{
			htmlString += "<tr class=\"success\"><td rowspan=\"2\" class=\"index\">";
			htmlString += imageNumber;
			htmlString += "</td><td><a href=\"./reference/"+item.img_name+"\">reference image</a></td>";
			htmlString += "<td rowspan=\"2\" class=\"result\"><span class=\"pass\">PASS</span></td>";
			htmlString += "<tr class=\"success\"><td><a href=\"./test/"+item.img_name+"\">test image</a></td></tr>";
		}
		else
		{
			htmlString += "<tr class=\"failure\"><td rowspan=\"2\" class=\"index\">";
			htmlString += imageNumber;
			htmlString += "</td><td><a href=\"./reference/"+item.img_name+"\">reference image</a></td>";
			htmlString += "<td rowspan=\"2\" class=\"result\"><a href=\"./diff/"+item.img_name+"\"><img src=\"./diff/"+item.img_name+"\" /></a></td>";
			htmlString += "<tr class=\"failure\"><td><a href=\"./test/"+item.img_name+"\">test image</a></td></tr>";
		}
		
	});
	
	htmlString+= "</tbody></table>" + 
			"" +
			"</body></html>";
	
	return htmlString;
}

exports.createReport = reporter;