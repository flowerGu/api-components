// me.require(['meScroll'], 'meScroll');
// me.require.ready('meScroll',function(){
	var m2e={};
    (function(){
        var multiSelect = {
            arr:[],
            init:function(obj){
                this.fillHtml(obj);
            },
            fillHtml:function(obj){
                var proper=obj.ele.replace(/#/g,'').replace(/\./g,''),
                    select = document.getElementById(proper) || document.getElementsByClassName(proper)[0],
                    new_wrap = document.createElement('div'),
                    select_new = document.createElement('ul'),
                    placeholder = obj.placeholder || '请选择',
                    old_arr = [],
                    con_arr = ['全选','反选'],
                    con_li = document.createElement('li'),                    
                    item_choice_color = obj.item_choice_color,
                    hover = obj.hover,
                    list_item_style = obj.list_item_style,
                    menu = obj.menu,
                    input_style = obj.input_style;
                new_wrap.className = 'me-multi-select-'+proper+' me-multi-select';
                select_new.className = 'me-multi-select-list fadeInDown hide_se';
                obj.ele.indexOf('#')>-1?select_new.id = proper :select_new.classList.add(proper);
                new_wrap.innerHTML = '<span class="me-select-placeholder me-select-placeholder-'+proper+'">'+placeholder+'</span>\
                        <ul class="me-select-render me-select-render-'+proper+' clearfix"><li class="me-select-field">\
                                <input>\
                            </li></ul>';
                [].slice.call(select.childNodes).forEach(function(element){
                    if(element.nodeType == 1){
                        old_arr.push(element);
                    }
                })
                if(hover || list_item_style || input_style || menu){
                    var style = document.createElement('style');
                    if(menu){
                        style.textContent+=obj.ele+'.me-multi-select-list{';
                        for(var menuL in menu){
                            style.textContent+=menuL+':'+menu[menuL]+';';
                        }
                        style.textContent+='}';
                    }
                    if(hover){
                        style.textContent+=obj.ele+'.me-multi-select-list li:hover{';
                        for(var l in hover){
                            style.textContent+=l+':'+hover[l]+';';
                        }
                        style.textContent+='}';
                    }
                    if(list_item_style){
                        style.textContent+=obj.ele+'.me-multi-select-list li{';
                        for(var item in list_item_style){
                            style.textContent+=item+':'+list_item_style[item]+';';
                        }
                        style.textContent+='}';
                    }
                    if(input_style){
                        style.textContent+='.me-multi-select.me-multi-select-'+proper+'{';
                        for(var ls in input_style){
                            style.textContent+=ls+':'+input_style[ls]+';';
                        }
                        style.textContent+='}';
                    }
                    document.head.appendChild(style);
                }
                
                //生成筛选条件
                con_arr.forEach(function(v,i){
                    var aDiv = document.createElement('div');
                    aDiv.setAttribute('data-wrap','radio');
                    item_choice_color && aDiv.setAttribute('data-'+item_choice_color,'');        
                    aDiv.innerHTML = '<input type="radio" id='+proper+'_mrcon_li'+i+' name="choice_'+proper+'">\
                                            <label for='+proper+'_mrcon_li'+i+'>\
                                            '+v+'\
                                            </label>';
                    con_li.appendChild(aDiv);
                })
                //替换select 生成下拉项 
                old_arr.forEach(function(v,i){
                    var aLi = document.createElement('li');
                    aLi.title = v.title;
                    aLi.setAttribute('suffix',i+'_'+Math.random().toString(36).replace(/[^a-z0-9]+/g, '').substr(0, 10))
                    aLi.innerHTML = '<div data-wrap="checkbox">\
                                            <input type="checkbox" id="zy'+aLi.getAttribute('suffix')+'">\
                                            <label for="zy'+aLi.getAttribute('suffix')+'">\
                                            '+v.text+'\
                                            </label>\
                                        </div>'
                    item_choice_color && aLi.querySelector('div[data-wrap]').setAttribute('data-'+item_choice_color,'');
                    aLi.setAttribute('value',v.value);
                    select_new.appendChild(aLi)   
                    
                })
                select_new.insertBefore(con_li,select_new.firstElementChild)
                select.parentElement.insertBefore(new_wrap,select);//插入输入框
                select.parentElement.replaceChild(select_new,select);
                multiSelect.setRange.call(this,new_wrap,select_new);
                $(obj.ele).meScroll({
                    autohidemode:true,
                    autohidemode:false,
                    cursorcolor:"#bfbfbf"
                })
                this.bindEvent(obj);
            },
            bindEvent:function(obj){
                var id_choice = obj.ele.replace(/#/g,'').replace(/\./g,''),
                    invert_sele = document.getElementById(id_choice+'_mrcon_li1'),//反选
                    all_sele = document.getElementById(id_choice+'_mrcon_li0');//全选 
                document.querySelector(obj.ele).addEventListener('click',
                    (function(opts){
                        return function(e){//点击下拉项 
                                var e = e || window.event,
                                    target = e.target || e.srcElement,
                                    dom = target.nodeName.toLowerCase();                        
                                e.stopPropagation();
                                if(dom == 'label' && target.parentElement.parentElement.getAttribute('suffix')){
                                    var suffix = target.parentElement.parentElement.getAttribute('suffix'),
                                        checked_arr = [].slice.call(document.querySelector(opts.ele).querySelectorAll('input')),//查找列表项 的checked
                                        num = 0;                            
                                        checked_arr.splice(0,2);
                                    invert_sele.removeAttribute('allow');
                                    invert_sele.checked=false;
                                    if(!target.previousElementSibling.checked){//选中操作
                                        var aLi = document.createElement('li'); 
                                        aLi.setAttribute('suffix',suffix);
                                        target.setAttribute("suffix",suffix);
                                        appenChild(target);          
                                        checked_arr.forEach(function(v){
                                            if(v.checked){                        
                                                num+=1;   
                                            }
                                        })
                                        if(num == checked_arr.length-1){//全选状态判断
                                            num = 0;
                                            all_sele.checked=true;
                                        }
                                    }else{//移除操作            
                                        var sele_area = [].slice.call(document.getElementsByClassName('me-select-render-'+id_choice)[0].querySelectorAll('li'));            
                                        sele_area.forEach(function(v){
                                            if(v.getAttribute('suffix') == suffix){
                                                    document.getElementsByClassName('me-select-render-'+id_choice)[0].removeChild(v);   
                                                    multiSelect.setRange(document.getElementsByClassName('me-multi-select-'+id_choice)[0],document.querySelector(opts.ele))                                 
                                                    multiSelect.arr.forEach(function(z,i){                                
                                                        if(z.getAttribute('suffix') == v.getAttribute('suffix')){
                                                            multiSelect.arr.splice(i,1);
                                                            return;
                                                        }
                                                    })
                                                    invert_sele.checked=false;
                                                    checked_arr.forEach(function(v){
                                                        if(v.checked){
                                                            num+=1;
                                                            return;
                                                        }
                                                    })
                                                    if(num>0){//当其中有一个取消选中时，做全选判断
                                                        all_sele.checked=false;
                                                        num = 0;
                                                    }
                                                    if(document.getElementsByClassName('me-select-render-'+id_choice)[0].querySelectorAll('li[suffix]').length<1){
                                                        document.querySelector('.me-select-placeholder-'+id_choice).style.display='block';
                                                    }
                                                return;
                                            }
                                        })
                                    } 
                                    multiSelect._getVal(opts);
                                }else if(!target.parentElement.parentElement.getAttribute('suffix') && target.nodeName.toLowerCase() == 'input'){   //条件点击     
                                    var list = [].slice.call(document.querySelector(opts.ele).querySelectorAll('li[suffix]'));
                                    if(target.id==(id_choice+'_mrcon_li0')){  //全选
                                        invert_sele.removeAttribute('allow');
                                        remoChild();
                                        multiSelect.arr = [];
                                        list.forEach(function(v,i){
                                                appenChild(v)
                                                list[i].querySelector('input').checked = true;
                                        })
                                    }else if(target.id==(id_choice+'_mrcon_li1')){//反选            
                                        if(target.getAttribute('allow')!='y'){
                                            remoChild();
                                            multiSelect.arr = [];
                                            list.forEach(function(v,i){
                                                if(v.getAttribute('suffix')){
                                                    if(v.querySelector('input').checked){
                                                        v.querySelector('input').checked = false;
                                                    }else{
                                                        v.querySelector('input').checked = true;
                                                    }
                                                    if(v.querySelector('input').checked){
                                                        appenChild(v)
                                                    }                   
                                                }
                                            })
                                            var choice_len = document.getElementsByClassName('me-select-render-'+id_choice)[0].querySelectorAll('li.me-select-choice').length;
                                            if(choice_len){
                                                if(choice_len == list.length){
                                                    invert_sele.checked = false;                        
                                                    invert_sele.removeAttribute('allow');
                                                    all_sele.checked = true;
                                                }
                                                document.querySelector('.me-select-placeholder-'+id_choice).style.display='none';
                                            }else{
                                                document.querySelector('.me-select-placeholder-'+id_choice).style.display='block';
                                            }
                                        }
                                        target.setAttribute('allow','y');
                                        if(document.getElementsByClassName('me-select-render-'+id_choice)[0].querySelectorAll('li.me-select-choice').length == list.length && target.getAttribute('allow') == 'y'){
                                            target.removeAttribute('allow');//解决先点反选，让全选选中，再次点击反选的bug
                                        }            
                                    }
                                    multiSelect._getVal(opts);
                                }
                            }
                    })(obj)
                )
                function appenChild(o){        
                    var aAllLi = document.createElement('li'),
                        par = document.getElementsByClassName('me-select-render-'+id_choice)[0],
                        suffix = o.getAttribute('suffix').split('_')[0];
                    aAllLi.setAttribute('suffix',o.getAttribute('suffix'));
                    aAllLi.className = 'me-select-choice';
                    document.querySelector('.me-select-placeholder-'+id_choice).style.display='none';
                    aAllLi.innerHTML = '<span class="me-select-item">'+o.textContent+'</span>\
                                    <span class="me-ion-o-close-empty me-select-remove"></span>';
                    if(!par.querySelectorAll('.me-select-choice').length){
                        par.insertBefore(aAllLi, par.getElementsByClassName('me-select-field')[0]);
                    }else{
                        var suff_arr = [].slice.call(par.querySelectorAll('li[suffix]')),
                            s = 0;
                        for(var i=0;i<suff_arr.length;i++){
                            if(suff_arr[i].getAttribute('suffix').split('_')[0] > suffix)
                            {
                                par.insertBefore(aAllLi,par.querySelectorAll('li[suffix]')[i]);
                                s+=1;
                                break;
                            }
                        }
                        s==0 && par.insertBefore(aAllLi, par.getElementsByClassName('me-select-field')[0]);
                    }
                    multiSelect.setRange.call(this,document.querySelector('.me-multi-select-'+id_choice),document.querySelector(obj.ele))
                    multiSelect.arr.push(aAllLi);
                }
                function remoChild(){
                    var suf_arr = [].slice.call(document.getElementsByClassName('me-select-render-'+id_choice)[0].childNodes);
                    if(suf_arr){
                        suf_arr.forEach(function(v){
                            if(v.nodeName.toLowerCase() == 'li' && v.getAttribute('suffix')){
                                document.getElementsByClassName('me-select-render-'+id_choice)[0].removeChild(v)
                            }
                        })
                    }
                    multiSelect.setRange.call(this,document.querySelector('.me-multi-select-'+id_choice),document.querySelector(obj.ele))        
                }
                //叉号点击
                document.querySelector('.me-multi-select-'+id_choice).addEventListener('click',
                    (function(obj){
                        return function(e){
                                var e = e || window.event,
                                    target = e.target || e.srcElement;
                                if(target.className.indexOf('me-select-remove')>-1){
                                    invert_sele.checked=false;
                                    invert_sele.removeAttribute('allow');
                                    all_sele.checked=false;
                                    e.stopPropagation();
                                        document.getElementsByClassName('me-select-render-'+id_choice)[0].removeChild(target.parentElement);
                                        multiSelect.arr.forEach(function(z,i){                                
                                            if(z.getAttribute('suffix') == target.parentElement.getAttribute('suffix')){
                                                multiSelect.arr.splice(i,1);
                                                return;
                                            }
                                        })
                                        document.querySelector(obj.ele).querySelectorAll('li').forEach(function(v){
                                            if(v.getAttribute('suffix') == target.parentElement.getAttribute('suffix')){
                                                v.querySelector('input').checked = false;
                                            }
                                            if(document.getElementsByClassName('me-select-render-'+id_choice)[0].querySelectorAll('li').length<1){
                                                document.querySelector('.me-select-placeholder-'+id_choice).style.display='block';
                                            }
                                            return;
                                        })
                                }else{
                                    this.querySelector('input').focus();
                                    document.querySelectorAll(".me-multi-select-list").forEach(function(v){
                                        v.classList.add('hide_se');
                                    })
                                    document.querySelector(obj.ele).classList.toggle('hide_se');
                                }
                                multiSelect.setRange.call(this,document.querySelector('.me-multi-select-'+id_choice),document.querySelector(obj.ele))
                                multiSelect._getVal(obj);
                            }
                    })(obj)
                )
                document.getElementsByClassName('me-select-render-'+id_choice)[0].querySelector('input').addEventListener('keyup', (function(object){
                    return function(e){    //退格键
                        if(e.keyCode == 8){
                            if(this.value.length == 0){
                                all_sele.checked = false;
                                invert_sele.checked = false;
                                invert_sele.removeAttribute('allow');
                                multiSelect.arr = [].slice.call(document.getElementsByClassName('me-select-render-'+id_choice)[0].querySelectorAll('li.me-select-choice'));
                                var dom = document.getElementsByClassName('me-select-render-'+id_choice)[0];
                                multiSelect.arr.length && dom.removeChild(dom.querySelectorAll('li.me-select-choice')[multiSelect.arr.length-1]);
                                document.querySelector('.me-select-placeholder-'+id_choice).style.display= multiSelect.arr.length==1 || !multiSelect.arr.length?'block':'none'
                                if(multiSelect.arr.length){
                                    document.querySelector(object.ele).querySelector('li[suffix="'+multiSelect.arr.pop().getAttribute('suffix')+'"]').querySelector('input').checked = false;
                                }
                                multiSelect.setRange.call(this,document.querySelector('.me-multi-select-'+id_choice),document.querySelector(object.ele))
                                multiSelect._getVal(object);
                            }
                        }else{
                            this.value = '';
                            return false;
                        }
                    }
                    })(obj)
                )
                document.addEventListener('click',(function(org){
                    return function(e){
                        var e = e || window.event,
                            target = e.target || e.srcElement;
                        if(!target.classList.contains('me-select-placeholder') && !target.classList.contains('me-multi-select-list') && !target.classList.contains('me-select-render')){
                            document.querySelector(org.ele).classList.add('hide_se');
                        }
                    }
                    })(obj)
                )
            },
            setRange:function(new_wrap,select_new){
                var pos = new_wrap.getBoundingClientRect(),
                    win_h=window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight,//可视区高度
                    scroll_top = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop,//滚动条高度
                    sele_h = select_new.getBoundingClientRect().height,//替换后下拉列表高度
                    sele_bot = scroll_top+pos.top;
                select_new.style.left = pos.left+'px';
                if(sele_h<(win_h-pos.top)){//判断下拉列表框距底部距离大小
                    select_new.style.top = pos.top+pos.height+scroll_top+5+'px';
                }else{
                    select_new.style.top = pos.top-sele_h+scroll_top-5+'px'
                }
            },
            _getVal:function(m){
                var _value = [];
                document.getElementsByClassName('me-select-render-'+m.ele.replace(/#/g,'').replace(/\./g,''))[0].querySelectorAll('li[suffix]').forEach(function(v){
                    _value.push(v.querySelector('.me-select-item').textContent.replace(/\s+$/,'').replace(/^\s+/,''));
                })
                m.getValue && m.getValue(_value);
            }
        }
        return m2e.multiSelect=function(o){
            multiSelect.init(o)
        }
    })()
   /* me.multiSelect({
        ele:'#multiple',
        placeholder:'please',
        getValue:function(data){
            console.log(data)
        },
        item_choice_color:'pink'
        
    })
    me.multiSelect({
        ele:'.date',
        placeholder:'请选择',
        item_choice_color:'blue',
        hover:{
            'background-color':'#a08ee0'
        },
        list_item_style:{
            'font-size':'15px'
        },
        menu:{
            'width':'200px'
        },
        input_style:{
            'border':'1px solid #ff4c4c',
            'font-size':'14px',
            'width':'220px'
        },
        getValue:function(data){
            console.log(data)
        }
    })
    me.multiSelect({
        ele:'.sex',
        placeholder:'123',
        getValue:function(data){
            console.log(data)
        },
        item_choice_color:'green'
    })*/
// })

