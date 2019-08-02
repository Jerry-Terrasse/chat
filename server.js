	var http = require('http');
	
	
	var fs = require('fs');
	var URL = require('url');
	var server = http.createServer();
 
	server.listen(7777, function(){
		 console.log('RUN:7777');
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
            fs.appendFile('./log.txt','<div class="mdui-row"><div class="mdui-card mdui-col-xs-2"><div class="mdui-card-content">' + text + '</div></div></div>\n', (error)  => {
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
        } else if(par.pathname === '/clear') {
            fs.writeFile('./log.txt', '',{},function(err){
                if(err){
                    throw err;
                }
                console.log("Cleared History");
            });
            response.writeHead(200,{'Content-Type':'text/html;charset=UTF-8'});
			fs.readFile('./notFount.html','utf-8',function(err,data){
				if(err){
					throw err ;
				}
				response.end(data);
			});
        } else {
            path = par.pathname;
            type = path.split('/')[1];
            if(type != 'css') {
                if(type == 'js') {
                    type = 'javascript';
                } else {
                    type = 'plain';
                }
            }
            response.writeHead(200, {'Content-Type': 'text/' + type + ';charset=UTF-8'});
            fs.readFile('.' + path, 'utf-8', function(err, data) {
                if(err){
                    throw err;
                }
                response.end(data);
            });
		}/*else{
			response.writeHead(200,{'Content-Type':'text/html;charset=UTF-8'});
			fs.readFile('./notFount.html','utf-8',function(err,data){
				if(err){
					throw err ;
				}
				response.end(data);
			});
		}*/
	    console.log("once");	
	});
