


let loading = (dom,text,callback) => {
	dom.append('<div class="Yue-loading">'+text+'</div>');
	callback && callback();
}

export default loading;