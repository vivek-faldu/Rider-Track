var exec = require('child_process').exec, child;

exports.start_mocker = function(req, res) {

  	server = exec('node ./tcp/tcp_server.js',
	    function (error, stdout, stderr) {
	        if (error !== null) {
	            console.log('exec error: ' + error);
	        }
	    });

  client = exec('node ./tcp/tcp_client.js',
    function (error, stdout, stderr) {
        if (error !== null) {
             console.log('exec error: ' + error);
        }
    });
 
 res.json("started");
};

exports.stop_mocker = function(req, res){

	client = exec(`pkill -f tcp_server.js`,
		function(err, stdout, stderr) {
			if(err !== null){
				console.log(err);
			}
		});

	client = exec(`pkill -f tcp_client.js`,
		function(err, stdout, stderr) {
			if(err !== null){
				console.log(err);
			}
		});
	res.json("closed");
}