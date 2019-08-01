	var http = require('http');
	
	
	var fs = require('fs');
	
	var server = http.createServer();
 
	server.listen(9001, function(){
		 console.log('RUN:9001');
	})
	
	
	server.on('request',function(request,response){
		
		var url = request.url;
        console.log(url);
		if(url ==='/'){
			response.writeHead(200,{'Content-Type':'text/html'})
			fs.readFile('./index.html','utf-8',function(err,data){
				if(err){
					throw err ;
				}
				response.end(data);
			});
		
		}else if(url === '/submit'){
			console.log(request.trailers);
            response.writeHead(200,{'Content-Type':'text/html'});
			fs.readFile('./index.html','utf-8',function(err,data){
				if(err){
					throw err ;
				}
				response.end(data);
			});
		}else{
			response.writeHead(200,{'Content-Type':'text/html'});
			fs.readFile('./notFount.html','utf-8',function(err,data){
				if(err){
					throw err ;
				}
				response.end(data);
			});
		}
	    console.log("once");	
	});
