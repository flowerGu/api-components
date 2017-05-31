require('./index.css');

import * as menuConst from './menuConst';
import {byID, query, getByTag, isString, isObject, addListener, hasClass, removeClass, addClass, setStyle, getStyle} from './utils';

(function(me){

    function renderMenu(childs, multiple, modeUlClass, modeLiClass){

        let pLeft = false;
        if(modeUlClass.indexOf('vertical') > -1 || modeLiClass.indexOf('horizontal') > -1){
            pLeft = {
                //'textAlign': 'center'
            }
        }
        

        for(let i = 0; i < childs.length; i++){
            let ele = childs[i];

            switch(ele.nodeName.toLocaleUpperCase()){
                case 'DIV':
                    setStyle(addClass(ele, menuConst.MENUSUBMENUTITLE),pLeft || {
                        'paddingLeft': (multiple * 24) + 'px'
                    });

                    break;
                case 'UL':
                    addClass(ele, menuConst.MENU);
                    addClass(ele, modeUlClass);
                    addClass(ele, menuConst.MENUSUB);
                    //addClass(ele, menuConst.MENUHIDDEN);

                    let childLi = ele.children;
                    ele.setAttribute('data-child', multiple);
                    for(let j = 0; j < childLi.length; j++){

                        if(!childLi[j].children.length){
                            setStyle(addClass(childLi[j], menuConst.MENUITEM),pLeft || {
                                'paddingLeft': (multiple * 24 + 24) + 'px'
                            });
                        }else{
                            addClass(childLi[j], modeLiClass);
                            addClass(childLi[j], menuConst.MENUSUBMENU);
                            renderMenu(childLi[j].children, 2, modeUlClass, modeLiClass);
                        }
                    }
                    break;
            }
        }
    }

    function filterEle(ele){
        let eleName = ele.nodeName.toLocaleUpperCase();

        if((eleName == 'DIV' && ele.className.indexOf(menuConst.MENUSUBMENUTITLE) > -1) ||
            (eleName == 'LI' && ele.className.indexOf(menuConst.MENUITEM) > -1)){
            return ele;
        }

        return filterEle(ele.parentNode);
    }

    function offsetTop(element){
        var top = element.offsetTop;
        var parent = element.offsetParent;
        while(parent != null){
            top += parent.offsetTop;
            parent = parent.offsetParent;
        }
        return top;
    }

    function render(){

        initMenu(arguments[0]);

        addListener(document, 'click', function(event){
            event.stopPropagation(); 
            let ev = event || window.event;
            let ele = ev.srcElement || ev.target;
            let ulMenuSub = query('.' + menuConst.MENUSUB);
            if(offsetTop(ele) >= 0){
                for(let i = 0; i < ulMenuSub.length; i++){
                    if(ulMenuSub[i].className.indexOf('vertical') > -1 || 
                       ulMenuSub[i].className.indexOf('horizontal') > -1){
                        setStyle(ulMenuSub[i], {
                            'display': 'none'
                        });
                        ulMenuSub[i].setAttribute('data-click','false');
                        removeClass(ulMenuSub[i].parentNode, menuConst.MENUSUBMENUOPEN);
                    }
                }
            }

        });

    }

    function initMenu(){
        let args = arguments[0],
        ele = isString(args) ? 
                  byID(args) : 
                  byID(args.ele),
        childs = ele.children,
        childsLen = childs.length,
        argsIsObj = isObject(args) ? 
                    true : 
                    false,
        modeUlClass = menuConst.MENUINLINE,
        modeLiClass = menuConst.MENUSUBMENUINLINE;
        /**
         * *****************************
         */

        addClass(ele, menuConst.MENU);
        addClass(ele, menuConst.MENULIGHT);
        addClass(ele, menuConst.MENUROOT);
        if(argsIsObj){
            switch(args.mode){
                case 'horizontal':
                    modeUlClass = menuConst.MENUVERTICAL;
                    modeLiClass = menuConst.MENUSUBMENUHORIZONTAL;
                    addClass(ele, menuConst.MENUHORIZONTAL);
                    break;
                case 'inline':
                    modeUlClass = menuConst.MENUVERTICAL;
                    modeLiClass = menuConst.MENUSUBMENUVERTICAL;
                    addClass(ele, modeUlClass);
                    break;
                case 'vertical':
                    modeUlClass = menuConst.MENUINLINE;
                    modeLiClass = menuConst.MENUSUBMENUINLINE;
                    addClass(ele, modeUlClass);
                    break;
                default:
                    modeUlClass = menuConst.MENUINLINE;
                    modeLiClass = menuConst.MENUSUBMENUINLINE;
                    addClass(ele, modeUlClass);
                    break;
            }
        }
        
        

        for(let i = 0; i < childsLen; i++){
            addClass(childs[i], modeLiClass);
            addClass(childs[i], menuConst.MENUSUBMENU);

            initEvent.call(childs[i],argsIsObj ? args : {});

            renderMenu(childs[i].children, 1, modeUlClass, modeLiClass);
        }
    }

    function initEvent(args){

        addListener(this, 'click', function(event){
            event.stopPropagation(); 
            let ev = event || window.event;
            let ele = ev.srcElement || ev.target;

            ele = filterEle(ele);

            if(ele.nodeName.toLocaleUpperCase() == 'DIV'){
                
                let ulMenuSub = query('.' + menuConst.MENUSUB),
                MenuSub = ele.nextElementSibling,
                dataChild = MenuSub.getAttribute('data-child');

                if(MenuSub.getAttribute('data-click') != 'true'){
                    MenuSub.setAttribute('data-click','true');
                }else{
                    MenuSub.setAttribute('data-click','false');
                    removeClass(MenuSub.parentNode, menuConst.MENUSUBMENUOPEN);
                    $(MenuSub).slideUp(200);
                    return false;
                }

                if(dataChild == '2' && 
                   MenuSub.className.indexOf('vertical') > -1 || 
                   MenuSub.className.indexOf('horizontal') > -1){

                    let parentUl = MenuSub.parentNode.parentNode,
                    menuUls = getByTag(parentUl, 'ul');

                    for(let i = 0; i < menuUls.length; i++){
                        menuUls[i].setAttribute('data-click','false');
                        setStyle(menuUls[i], {
                            'display': 'none'
                        });
                    }
                    MenuSub.setAttribute('data-click','true');
                }

                for(let i = 0; i < ulMenuSub.length; i++){
                    if(MenuSub.getAttribute('data-child') == 1 && 
                       MenuSub.className.indexOf('vertical') > -1 || 
                       MenuSub.className.indexOf('horizontal') > -1){
                        setStyle(ulMenuSub[i], {
                            'display': 'none'
                        });
                        ulMenuSub[i].setAttribute('data-click','false');
                        removeClass(ulMenuSub[i].parentNode, menuConst.MENUSUBMENUOPEN);
                    }
                }

                if(getStyle(MenuSub).display == 'none'){
                    addClass(MenuSub.parentNode, menuConst.MENUSUBMENUOPEN);
                    MenuSub.setAttribute('data-click','true');
                    $(MenuSub).slideDown(200);
                }else{
                    removeClass(MenuSub.parentNode, menuConst.MENUSUBMENUOPEN);
                    $(MenuSub).slideUp(200);
                }
                
            }

            if(ele.nodeName.toLocaleUpperCase() == 'LI'){

                if(initEvent.previousLi){
                    removeClass(initEvent.previousLi, menuConst.MENUITEMSELECTED);
                }
                initEvent.previousLi = ele;

                if(hasClass(ele, menuConst.MENUITEMSELECTED)){
                    removeClass(ele, menuConst.MENUITEMSELECTED);
                }else{
                    addClass(ele, menuConst.MENUITEMSELECTED);
                }

                (args.selectedHide || 
                 args.mode == 'horizontal' || 
                 args.mode == 'inline') && !function(){
                    let dataChild = ele.parentNode.getAttribute('data-child');
                    if(dataChild == '2'){
                        let parentUl = ele.parentNode.parentNode.parentNode;
                        setStyle(parentUl, {
                            'display': 'none'
                        });
                        parentUl.setAttribute('data-click','false');
                    }
                    setStyle(ele.parentNode, {
                        'display': 'none'
                    });
                    ele.parentNode.setAttribute('data-click','false');
                 }();
                 
            }
            
            args.callback && args.callback(ele);

        });
    }

    return me.menu = {
        render: render
    };

})(me);