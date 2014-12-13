
var page = require('webpage').create()
	,system = require('system');

var url = system.args[1];
var name = system.args[2];

page.settings.userAgent = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36';
page.open(url, function(status) {  
  if (status !== 'success') {
        console.log('Unable to load the address!');
        phantom.exit();
    } else {
        window.setTimeout(function () {
           	page.render(name);
 			phantom.exit();
        }, 4000); // Change timeout as required to allow sufficient time 
    }
});
