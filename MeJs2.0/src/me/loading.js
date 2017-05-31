/**
 * @description
 * @author 李林
 * @time 2016/03/29
 */


me.loading = (dom,text,callback) => {
	dom.append('<div class="Yue-loading">'+text+'</div>');
	callback && callback();
}