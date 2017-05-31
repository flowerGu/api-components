/**
 * @description
 * @author 李林
 * @time 2016/03/28
 */

me.ajax = (o) => {

    if(o.lock){
        if($(o.lock).hasClass('btn-default')){return;}

        $(o.lock).removeClass('btn-primary');
        $(o.lock).addClass('btn-default');
    }
    
    const xmlhttp = (() => {
        // 针对不同浏览器建立这个对象的不同方式写不同代码

        let xhr = null;
        if(window.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
            //针对某些特定版本的Mozillar浏览器的BUG进行修正
            if(xhr.overrideMimeType) {
                xhr.overrideMimeType("text/xml");
            }
            
        } else if (window.ActiveXObject) {
            var activexName = ['MSXML2.XMLHTTP', 'Microsoft.XMLHTTP'];
            for (var i=0; i<activexName.length; i++) {
                try {
                    xhr = new ActiveXObject(activexName[i]);
                    break;
                } catch(e) {}
            }
        }
        return xhr;
    })();

    let json2String = (jsonData) => {
        let strArr = [];
        for(let k in jsonData) {
			if(typeof jsonData[k] =='object'){//递归解决二级value对象无法识别问题
				json2String(jsonData[k])
			}else{
				strArr.push(k + "=" + jsonData[k]);	
			}            
        }
            
        return strArr.join("&");
    } 

    let url = me.config && me.config.urls ?
              me.config.urls(o.key) :
              o.key;
    let async = o.async == false ? o.async : true;
    let isTimeout = false;

    xmlhttp.onreadystatechange = () => {
        if (xmlhttp.readyState === 4) {
            if (!isTimeout && xmlhttp.status >= 200 && xmlhttp.status < 400) {
            // Success!
                clearTimeout(timeFlag);
                var resp = xmlhttp.responseText;
                if(o.log == 'print'){
                    console.log('------------------------------------------');
                    console.log(url);
                    console.log(resp);
                    console.log('------------------------------------------');
                }
                
                o.callback && o.callback(typeof resp == "object" ? 
                                                resp : 
                                                $.parseJSON(resp));
                if(o.lock){
                    $(o.lock).removeClass('btn-default');
                    $(o.lock).addClass('btn-primary');
                }
            } else {
            // Error :(
                clearTimeout(timeFlag);
                if(o.log == 'print'){
                    console.log('------------------------------------------');
                    console.log(url);
                    console.log(xmlhttp.statusText);
                    console.log('------------------------------------------');
                }
                let tipsTxt;
                if(xmlhttp.statusText == "timeout"){
                    tipsTxt = "请求超时!";
                }else{
                    tipsTxt = xmlhttp;
                }
                o.callback && o.callback(tipsTxt);
                if(o.lock){
                    $(o.lock).removeClass('btn-default');
                    $(o.lock).addClass('btn-primary');
                }
            }
        }
    }
    
    o.type = o.type || 'POST';
    if(o.type.toUpperCase() == 'GET'){
        url = url + '?' + json2String(o.data);
        xmlhttp.open('GET', url, async);
        xmlhttp.send();
    }else{
        xmlhttp.open('POST', url, async);
        xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        xmlhttp.send(json2String(o.data));//解决发送请求为"[object object]:"情况
    }

    let timeFlag = setTimeout(() => {
        if(xmlhttp.readyState != 4) {
            isTimeout = true;
            xmlhttp.abort();
            clearTimeout(timeFlag);
            o.callback && o.callback("请求超时!");
        }    
    }, o.timeout || 6000);

}