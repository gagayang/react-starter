importScripts('index.js');
importScripts('index.js');
var CACH_VERSION = "talent-start-v1.2";

var CACH_FILES = [
	"/",
	"/index.html",
	"/dist/common.bundle.js",
	"/dist/main.bundle.js",
	"/dist/1.chunk.js",
	"/dist/2.chunk.js"
]
//初始化的时候 打开缓存 开始缓存文件
self.addEventListener('install', function(event){
	event.waitUntil(
		caches.open(CACH_VERSION).
			then(function(cache){
				console.log("cache is opened");
				return cache.addAll(CACH_FILES);
			})
	);
});
// 更新资源 但是我看介绍说是 只要资源文件变化 就会重新下载 但是看到这个我很怀疑。这个demo 明显是说 version 变化才会更新 一会试试
self.addEventListener('activate', function(event){
	event.waitUntil(
		caches.keys().then(function(key){
			return Promise.all(key.map(function(key, i){
				if(key !== CACH_VERSION){
					return caches.delete(key)
				}
			}))
		})
	);
});

self.addEventListener('fetch', function(event){
	console.log('fetch')
	console.log(event.request);
	// if(event.request.method == "GET"){
		event.respondWith(
			caches.match(event.request.url).then(function(res){
				if(res){
					console.log("in the cache");
					console.log(res);
					return res;

				}
				// return fetch(event.request);
				return requestBackup(event);

			})
		);
	// }else{

	// }
	
});
// self.addEventListener('fetch', function(event) {
//   event.respondWith(
//     fetch(event.request).catch(function() {
//     	console.log(caches.match(event.request))
//       return caches.match(event.request);
//     })
//   );
// });
function requestBackup(event){
	console.log("in requestBackup")
	var url = event.request.clone();
	return fetch(url).then(function(res){
		if(!res || res.status !== 200 || res.type !== 'basic'){//失败的 就不需要缓存了
			return res;
		};

		var reponse = res.clone();
		console.log("response  == "+ reponse);
		caches.open(CACH_VERSION).then(function(cache){
			cache.put(event.request.url, reponse);
		})

		return res;
	})
}
