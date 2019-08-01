
	/**
		
	1.使用 HTTP 服务器与客户端交互，需要 require('http')。
		声明http协议
	*/
	var http = require('http');
	
	
	// 声明文件操作系统对象
	var fs = require('fs');
	/**
	2.获取服务器对象
		1.通过 http.createServer([requestListener]) 创建一个服务
		requestListener <Function>
		返回: <http.Server>
		返回一个新建的 http.Server 实例。
		对于服务端来说，主要做三件事：
		1.接受客户端发出的请求。
		2.处理客户端发来的请求。
		3.向客户端发送响应。
	*/
	
	var server = http.createServer();
 
	/**
	3.声明端口号，开启服务。
		server.listen([port][, host][, backlog][, callback])
		port <number> ：端口号
		host <string> ：主机ip
		backlog <number> server.listen() 函数的通用参数
		callback <Function> server.listen() 函数的通用参数
		Returns: <net.Server>
		启动一个TCP服务监听输入的port和host。
		如果port省略或是0，系统会随意分配一个在'listening'事件触发后能被server.address().port检索的无用端口。
		如果host省略，如果IPv6可用，服务器将会接收基于unspecified IPv6 address (::)的连接，否则接收基于unspecified IPv4 address (0.0.0.0)的连接
	
	*/
	server.listen(9001, function(){
		 console.log('服务器正在端口号：9001上运行......');
	})
	
	
	/**
	4.给server 实例对象添加request请求事件，该请求事件是所有请求的入口。
		任何请求都会触发改事件，然后执行事件对应的处理函数。
	
		server.on('request',function(){
			 console.log('收到客户端发出的请求.......');
		});
	*/
 
	
	/**
	5.设置请求处理函数。
		请求回调处理函数需要接收两个参数。
		request ：request是一个请求对象，可以拿到当前浏览器请求的一些信息。
			eg：请求路径，请求方法等
		response： response是一个响应对象，可以用来给请求发送响应。
	
	*/
	server.on('request',function(request,response){
		
		var url = request.url;
		if(url ==='/'){
			//response.writeHead(响应状态码，响应头对象): 发送一个响应头给请求。
			response.writeHead(200,{'Content-Type':'text/html'})
			// 如果url=‘/’ ,读取指定文件下的html文件，渲染到页面。
			fs.readFile('./practice/login.html','utf-8',function(err,data){
				if(err){
					throw err ;
				}
				response.end(data);
			});
		
		}else if(url === '/login'){
			response.writeHead(200,{'Content-Type':'text/html'});
			// 如果url=‘/’ ,读取指定文件下的html文件，渲染到页面。
			fs.readFile('./practice/login.html','utf-8',function(err,data){
				if(err){
					throw err ;
				}
				response.end(data);
			});
		}else if(url === '/index'){
			response.writeHead(200,{'Content-Type':'text/html'});
			// 如果url=‘/’ ,读取指定文件下的html文件，渲染到页面。
			fs.readFile('./practice/index.html','utf-8',function(err,data){
				if(err){
					throw err ;
				}
				response.end(data);
			});
		}else{
			response.writeHead(200,{'Content-Type':'text/html'});
			// 如果url=‘/’ ,读取指定文件下的html文件，渲染到页面。
			fs.readFile('./practice/notFount.html','utf-8',function(err,data){
				if(err){
					throw err ;
				}
				response.end(data);
			});
		}
		
	});
