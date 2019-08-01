	var http = require('http');
	
	
	var fs = require('fs');
	var URL = require('url');
	var server = http.createServer();
 
	server.listen(9001, function(){
		 console.log('RUN:9001');
	})
	
	
	server.on('request',function(request,response){
		
		var url = request.url;
        console.log(url);
        var par=URL.parse(url);
		if(par.pathname ==='/'){
			response.writeHead(200,{'Content-Type':'text/html;charset=UTF-8'})
			fs.readFile('./index.html','utf-8',function(err,data){
				if(err){
					throw err ;
				}
				response.end(data + fs.readFileSync('log.txt', 'utf-8') + fs.readFileSync('end.html', 'utf-8'));
			});
		
		}else if(par.pathname === '/submit'){
            text = decodeURI(par.query)
            fs.appendFile('./log.txt','<p>' + text + '</p>\n', (error)  => {
                if (error) return console.log("Fail: " + error.message);
                console.log("Received: " + text);
            });
            response.writeHead(200,{'Content-Type':'text/html;charset=UTF-8'});
			fs.readFile('./notFount.html','utf-8',function(err,data){
				if(err){
					throw err ;
				}
				response.end(data);
			});
		}else{
			response.writeHead(200,{'Content-Type':'text/html;charset=UTF-8'});
			fs.readFile('./notFount.html','utf-8',function(err,data){
				if(err){
					throw err ;
				}
				response.end(data);
			});
		}
	    console.log("once");	
	});
