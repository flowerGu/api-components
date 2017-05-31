(function(me){
    var tabs=function(o){
            var target = o.ele,
                ele = '',
                num = 0,
                suffix = Math.random().toString(36).replace(/[^a-z0-9]+/g, '').substr(0, 10);
            if(target.indexOf('#')>-1){
                ele = document.getElementById(target.replace(/#/g,''));
            }else if(target.indexOf('.')>-1){
                ele = document.getElementsByClassName(target.replace(/\./g,''))[0];
            } 
            var aCh = [].slice.call(ele.childNodes),
                arrTabDom = [],
                nextSib = ele.nextElementSibling,//切换content
                arrNextSib = [].slice.call(nextSib.childNodes),
                arrContentDom = [];
            ele.setAttribute('suffix', 'tabBar_'+suffix);
            nextSib.setAttribute('suffix','tabContent_'+suffix);
            for(var i =0;i<aCh.length;i++){
                if(aCh[i].nodeType == 1){
                    arrTabDom.push(aCh[i]);
                }
            }
            for(var j=0;j<arrNextSib.length;j++){               
                if(arrNextSib[j].nodeType == 1){
                    arrContentDom.push(arrNextSib[j]);
                }
            }
            var tabBar = '['+'suffix=tabBar_'+suffix+']{',
                tabContent = '['+'suffix=tabContent_'+suffix+']{',
                barName = '['+'suffix=tabBar_'+suffix+'] '+arrTabDom[0].nodeName.toLowerCase()+'{',
                contentName = '['+'suffix=tabContent_'+suffix+'] '+arrContentDom[0].nodeName.toLowerCase()+'{',
                tabBarActive = o.tabBarActive.replace(/\./g,''),
                tabContentActive = o.tabContentActive ? o.tabContentActive.replace(/\./g,''):'',
                style = document.createElement('style');
                if(o.tabBar){//切换
                    if(typeof o.tabBar=='string'){//所传为class
                        ele.classList.add(o.tabBar.replace(/\./g,''))
                    }else{
                        for(var i in o.tabBar){
                            tabBar+=i+':'+o.tabBar[i]+';';
                        }
                        tabBar+='}';
                        style.textContent += tabBar;
                    }
                }
                if(o.animation){//动画
                    contentName=contentName +'-webkit-flex-shrink: 0;\
                                            -ms-flex-negative: 0;\
                                            flex-shrink: 0;\
                                            width: 100%;\
                                            -webkit-transition: opacity .3s;\
                                            transition:opacity .3s;\
											box-sizing:border-box;\
                                            opacity: 1;';
                    tabContent += 'display:-webkit-box;\
                                display: -webkit-flex;display: -ms-flexbox;display: flex;\
                                -webkit-box-orient: horizontal;\
                                -webkit-box-direction: normal;\
                                -webkit-flex-direction: row;\
                                -ms-flex-direction: row;\
                                flex-direction: row;\
                                will-change: margin-left;\
                                -webkit-transition:margin-left .3s cubic-bezier(.645,.045,.355,1);\
                                transition:margin-left .3s cubic-bezier(.645,.045,.355,1);\
                                width:100%;';
                    if(!o.tabContentItem){
                        contentName+='}';
                    }
                    if(!o.tabContent){
                        tabContent+='}';
                    }
                }
                if(o.tabContent){//内容元素
                    if(typeof o.tabContent=='string'){
                        nextSib.classList.add(o.tabContent.replace(/\./g,''));
                    }else{
                        for(var i in o.tabContent){
                            tabContent+=i+':'+o.tabContent[i]+';';
                        }
                        tabContent+='}';
                        style.textContent += tabContent;
                    }
                }
                if(o.tabBarItem){//点击切换项
                    if(typeof o.tabBarItem == 'object'){
                        for (var i in o.tabBarItem){
                            barName+=i+':'+o.tabBarItem[i]+';';
                        }
                         barName+='}';
                        style.textContent += barName;
                    }
                }
                if(o.tabContentItem){ //内容项
                     if(typeof o.tabContentItem == 'object'){
                        for (var i in o.tabContentItem){
                            contentName+=i+':'+o.tabContentItem[i]+';';
                        }
                        contentName+='}';
                        style.textContent += contentName;
                    }                    
                } 
                for(var m in o){
                    if(typeof o[m]=='object'){
                        num+=1;
                        break;
                    }
                }
            num>0 && document.head.appendChild(style);
            arrTabDom[0].classList.add(tabBarActive);
            o.tabContentActive && arrContentDom[0].classList.add(tabContentActive)
            for(var i = 0;i<arrTabDom.length;i++){
                typeof o.tabBarItem=='string' && arrTabDom[i].classList.add(o.tabBarItem.replace(/\./g,''));
                typeof o.tabContentItem == 'string' && arrContentDom[i].classList.add(o.tabContentItem.replace(/\./g,''));
                arrTabDom[i].onclick = 
                        (function(i){
                            var tabBarActive = o.tabBarActive.replace(/\./g,''),
                                tabContentActive = o.tabContentActive?o.tabContentActive.replace(/\./g,''):'',
                                animation = o.animation;
                            return function(){   
                                if(animation){//动画
                                    for(var x=0;x<arrTabDom.length;x++){
                                        arrTabDom[x].classList.remove(tabBarActive);    
                                        arrContentDom[x].style.opacity=0;                                   
                                    }
                                    arrTabDom[i].classList.add(tabBarActive);
                                    nextSib.style.marginLeft=(-(i*100)+'%');
                                    arrContentDom[i].style.opacity=1;
                                }else{
                                    for(var x=0;x<arrTabDom.length;x++){
                                        arrTabDom[x].classList.remove(tabBarActive);
                                        arrContentDom[x].classList.remove(tabContentActive);
                                    }
                                    arrTabDom[i].classList.add(tabBarActive);
                                    arrContentDom[i].classList.add(tabContentActive);
                                }   
                            }
                        })(i)
            }
        }
    return  me.tabs=function(o){
            tabs(o)
        }
})(me)