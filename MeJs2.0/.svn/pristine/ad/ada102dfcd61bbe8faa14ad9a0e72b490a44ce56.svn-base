me.errorTipEle = (function(){
            return function(o){
                var target = o.target,
                    content = o.content || '错误提示',
                    style = o.style || '',
                    direction = o.direction ||'bottom',
                    color = o.color || '#ef3d3d',
                    style = '.err_content{font-size:12px;display:inline-block;padding:3px;position:absolute;color:'+color+'}',
                    pos = o.pos,//用户自定义位置
                    ele = '';                          
                if(target.indexOf('#')>-1){
                    ele = document.getElementById(target.replace(/#/g,''));
                }else if(target.indexOf('.')>-1){
                    ele = document.getElementsByClassName(target.replace(/\./g,''))[0];
                }  
                var rect = ele.getBoundingClientRect(),      
                    height = rect.height,
                    width = rect.width,
                    offsetTop = rect.top,
                    offsetLeft = rect.left, 
                    html = document.createElement('div'),
                    err_style = document.createElement('style');
                    err_style.id='err_style';
                    err_style.textContent = style;
                html.className = 'err_content';
                if(!ele.getAttribute('suffix')){
                    var suffix = Math.random().toString(36).replace(/[^a-z0-9]+/g, '').substr(0, 10);
                    ele.setAttribute('suffix',suffix);       
                }else{
                    var suffix = ele.getAttribute('suffix');
                }
                html.id = 'err_'+suffix;
                html.textContent = content;
                if(!document.getElementById('err_style')){
                    document.head.appendChild(err_style);
                }
                if(document.getElementById('err_'+suffix)){
                    document.body.removeChild(document.getElementById('err_'+suffix));
                }                
                document.body.appendChild(html);                
                var err_ele = document.getElementById('err_'+suffix),
                    err_ele_height = err_ele.getBoundingClientRect().height,
                    err_ele_width = err_ele.getBoundingClientRect().width;
                if(direction){                    
                    switch (direction){
                        case 'bottom':
                            err_ele.style.top = offsetTop+height+document.body.scrollTop+"px";
                            err_ele.style.left = offsetLeft+'px';
                            break;
                        case 'top':
                            err_ele.style.top = offsetTop-err_ele_height+document.body.scrollTop+"px";
                            err_ele.style.left = offsetLeft+"px";
                            break;
                        case 'right':
                            err_ele.style.top = offsetTop+(height/4.5)+document.body.scrollTop+'px';
                            err_ele.style.left = offsetLeft+width+'px';
                            break;
                        case 'left':
                            err_ele.style.top = offsetTop+(height/4.5)+document.body.scrollTop+'px';
                            err_ele.style.left = offsetLeft-err_ele_width+'px';
                            break;
                    }
                }
                if(pos){
                    err_ele.style.top = pos.top;
                    err_ele.style.left = pos.left;
                }
                ele.onkeyup = function(){
                    if(document.getElementById('err_'+suffix)){
                        document.body.removeChild(err_ele);
                    }
                    
                }
            }
        })()