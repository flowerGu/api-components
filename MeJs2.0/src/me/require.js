(function (me, definition) {
	definition();
})(me, function () {
	var doc = document,
	    head = doc.getElementsByTagName('head')[0],
	    s = 'string',
	    f = false,
	    push = 'push',
	    readyState = 'readyState',
	    onreadystatechange = 'onreadystatechange',
	    list = {},
	    ids = {},
	    delay = {},
	    scripts = {},
		_url = ['testpc','test','localhost','teststatic','file:'],
		_length = 0,
	    scriptpath,
	    urlArgs;

	function every(ar, fn) {
		for (var i = 0, j = ar.length; i < j; ++i) {
			if (!fn(ar[i])) return f;
		}return 1;
	}
	function each(ar, fn) {
		every(ar, function (el) {
			fn(el);
			return 1;
		});
	}
    function _ready(fn){
        const doc = document;

        if(doc.readyState != 'loading'){
            fn();
        }else if(doc.addEventListener){
            doc.addEventListener('DOMContentLoaded',fn);
        }else{
            doc.attachEvent('onreadystatechange',function(){
                if(doc.readyState != 'loading'){
                    fn();
                }
            })
        }
    }

	me.require = function (paths, idOrDone, optDone) {
		paths = paths[push] ? paths : [paths];
		var idOrDoneIsDone = idOrDone && idOrDone.call,
		    done = idOrDoneIsDone ? idOrDone : optDone,
		    id = idOrDoneIsDone ? paths.join('') : idOrDone,
		    queue = paths.length;
		function loopFn(item) {
			return item.call ? item() : list[item];
		}
		function callback() {
			if (! --queue) {
				list[id] = 1;
				done && done();
				for (var dset in delay) {
					every(dset.split('|'), loopFn) && !each(delay[dset], loopFn) && (delay[dset] = []);
				}
			}
		}
		setTimeout(function () {
			each(paths, function loading(path, force) {
				if (path === null) return callback();

				if (!force && !/^https?:\/\//.test(path) && scriptpath) {
					path = path.indexOf('.js') === -1 ? scriptpath + path + '.js' : scriptpath + path;
				}

				if (scripts[path]) {
					if (id) ids[id] = 1;
					return scripts[path] == 2 ? callback() : setTimeout(function () {
						loading(path, true);
					}, 0);
				}

				scripts[path] = 1;
				if (id) ids[id] = 1;
				create(path, callback);
			});
		}, 0);
		return me.require;
	};

	function create(path, fn) {
		var el = doc.createElement('script'),
			load_Css = false,
		    loaded;
		el.onload = el.onerror = el[onreadystatechange] = function () {
			if (el[readyState] && !/^c|loade/.test(el[readyState]) || loaded) return;
			el.onload = el[onreadystatechange] = null;
			loaded = 1;
			scripts[path] = 2;
			_ready(function () {
				fn();
			});
		};
		el.async = 1;
		//el.src = urlArgs ? path + (path.indexOf('?') === -1 ? '?' : '&') + urlArgs : path;

		if(path.indexOf('&') > -1){
			path = path.split('&')[0];
			load_Css = true;
		}

        const _src = 'modules/' + path + '/' + path;
		_url.forEach(function(i){
			if(location.href.indexOf(i)>-1){
			   _length+=1;
			   return;
			}
		})		
		if(_length>0){
			el.src = 'https://teststatic.mejinrong.com/MeAssest/MeJS2.0/' + _src + '.js';
			load_Css && loadCss({
				url: 'https://teststatic.mejinrong.com/MeAssest/MeJS2.0/' + _src + '.css'
			});
			
		}else{
			el.src = window.location.protocol + '//static.mejinrong.com/MeAssest/MeJS2.0/' + _src + '.js';
			load_Css && loadCss({
				url: window.location.protocol + '//static.mejinrong.com/MeAssest/MeJS2.0/' + _src + '.css'
			});
			
		}

		head.insertBefore(el, head.lastChild);
	}

	me.require.get = create;

	me.require.order = function (scripts, id, done) {
		(function callback(s) {
			s = scripts.shift();
			!scripts.length ? me.require(s, id, done) : me.require(s, callback);
		})();
	};

	me.require.path = function (p) {
		scriptpath = p;
	};
	me.require.urlArgs = function (str) {
		urlArgs = str;
	};
	me.require.ready = function (deps, ready, req) {
		deps = deps[push] ? deps : [deps];
		var missing = [];
		!each(deps, function (dep) {
			list[dep] || missing[push](dep);
		}) && every(deps, function (dep) {
			return list[dep];
		}) ? ready() : !function (key) {
			delay[key] = delay[key] || [];
			delay[key][push](ready);
			req && req(missing);
		}(deps.join('|'));
		return me.require;
	};

	me.require.done = function (idOrDone) {
		me.require([null], idOrDone);
	};


	let loadCss = (options) => {
		let url = options.url,
			callback = typeof options.callback == "function" ? options.callback : function(){},
			id = options.id,
			node = document.createElement("link"),
			supportOnload = "onload" in node,
			isOldWebKit = +navigator.userAgent.replace(/.*(?:AppleWebKit|AndroidWebKit)\/?(\d+).*/i, "$1") < 536,
			protectNum = 300000;

		node.rel = "stylesheet";
		node.type = "text/css";
		node.href = url;
		if(typeof id !== "undefined"){
			node.id = id;
		}


		document.getElementsByTagName("head")[0].appendChild(node);

		if(isOldWebKit || !supportOnload){
			setTimeout(() => {
				pollCss(node,callback,0);
			},1);
			return;
		}

		if(supportOnload){
			node.onload = onload;
			node.onerror = () => {
				onload();
			}
		}else{
			node.onreadystatechange = () => {
				if(/loaded|complete/.test(node.readyState)){
					onload();
				}
			}
		}

		let onload = () => {
			node.onload = node.onerror = node.onreadystatechange = null;

			node = null;

			callback();
		}

		let pollCss = (node,callback,step) => {
			let sheet = node.sheet,
				isLoaded;

			step += 1;

			if(step > protectNum){
				isLoaded = true;

				node = null;
				callback();

				return;
			}

			if(isOldWebKit){
				if(sheet){
					isLoaded = true;
				}
			}else if(sheet){
				try{
					if(sheet.cssRules){
						isLoaded = true;
					}
				}catch(ex){
					if(ex.name === "NS_ERROR_DOM_SECURITY_ERR"){
						isLoaded = true;
					}
				}
			}

			setTimeout(() => {
				if(isLoaded){
					callback();
				}else{
					pollCss(node,callback,step);
				}
			},20);
		}
	}
});