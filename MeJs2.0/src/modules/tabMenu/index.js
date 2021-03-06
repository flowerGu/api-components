let css = require('./index.less');

import * as utils from './utils';

((me) => {
    let mode = '';
    let render = (...options) => {
        let args = options[0],
        ele = utils.isString(args) ? 
                  utils.byID(args) : 
                  utils.byID(args.ele);
        if(options.length > 1){
            mode = options[1]['mode'];
            if(mode == 'horizontal'){
                utils.addClass(ele, 'cate-wrap-horizontal');
            }else{
                utils.addClass(ele, 'cate-wrap');
            }

            for(let n in options[1]){
                switch(n){
                    case 'leftWidth':
                        utils.setStyle(ele,{'width': options[1][n] + 'px'});
                        break;
                    case 'leftHeight':
                        utils.setStyle(ele,{'height': options[1][n] + 'px'});
                        break;
                }
            }
            
        }
        initTabMenu(ele, options[1]);
        initEvent(ele);
    }

    let initTabMenu = (ele, opts) => {
        let childs = ele.children,
        len = childs.length,
        cate_title_list_height = 0;

        for(let i = 0; i < len; i++){
            i == 0 ? 
                (() => {
                utils.addClass(childs[i], 'cate-title-list');
                divChildInit(childs[i].children, 'cate-m');
                cate_title_list_height = +$(childs[i]).height();
                })() :
                (() => {
                utils.addClass(childs[i], 'cate-content-list');
                if(opts){
                    for(let n in opts){
                        switch(n){
                            case 'leftWidth':
                                if(opts['mode'] != 'horizontal'){
                                    utils.setStyle(childs[i],{'left': (+opts[n] - 1) + 'px'});
                                }else{
                                    utils.setStyle(childs[i],{'left': '0px'});
                                    utils.setStyle(childs[i],{'top': cate_title_list_height - 2 + 'px'});
                                }
                                break;
                            case 'rightWidth':
                                utils.setStyle(childs[i],{'width': opts[n] + 'px'});
                                break;
                            case 'rightHeight':
                                utils.setStyle(childs[i],{'height': opts[n] + 'px'});
                                break;
                        }
                    }
                }
                divChildInit(childs[i].children, 'cate-mc');
                })();
        }

        function divChildInit(divs,cls){
            for(let i = 0; i < divs.length; i++){
                utils.addClass(divs[i], cls);
                divs[i].setAttribute('data-fore', 'fore' + (i + 1));
            }
        }
    }

    let initEvent = (ele) => {
        let cateTitleList = utils.eQuery(ele, '.cate-m'),
        cateContentList = utils.eQuery(ele, '.cate-mc'),
        cateContentListDom = utils.eQuery(ele, '.cate-content-list')[0],
        showCate = '',
        len = cateTitleList.length;

        for(let i = 0; i < len; i++){
            utils.addListener(cateTitleList[i], 'mouseenter', eleShowHide.bind(cateContentList[i],i,'block'));
            utils.addListener(cateTitleList[i], 'mouseleave', eleShowHide.bind(cateContentList[i],i,'none'));
        }
        utils.addListener(cateContentListDom, 'mouseenter', cateContentListShowHide.bind(cateContentListDom,'block'));
        utils.addListener(cateContentListDom, 'mouseleave', cateContentListShowHide.bind(cateContentListDom,'none'));

        function cateContentListShowHide(dis) {

            eleShowHide.bind(showCate, +showCate.getAttribute('data-fore').replace('fore', '') - 1, dis)();

            utils.setStyle(this, {
                'display': dis
            });
            utils.setStyle(showCate, {
                'display': dis
            });
            
            return false;
        }

        function cateTitleHide(ele){
            
            for(let i = 0; i < cateTitleList.length; i++){
                utils.setStyle(cateTitleList[i], mode != 'horizontal' ? {
                    'borderRight': '1px solid #f6f6f6'
                } : {
                    'borderBottom': '1px solid #f6f6f6'
                });
            }
            utils.setStyle(ele, mode != 'horizontal' ? {
                'borderRight': '1px solid #fff'
            } : {
                'borderBottom': '1px solid #fff'
            });
        }

        function eleShowHide(...args) {

            let ele = cateTitleList[args[0]],
            eleForeCount = ele.getAttribute('data-fore');

            if(args[1] == 'block'){
                showCate = this;
                cateTitleHide(ele);
                utils.addClass(cateTitleList[args[0]], 'current');
            }else{
                utils.removeClass(cateTitleList[args[0]], 'current');
            }

            

            utils.setStyle(this, {
                'display': args[1]
            });
            utils.setStyle(this.parentNode, {
                'display': args[1]
            });

            return false;
        }
        
    };

    me.tabMenu = {
        render
    };

})(me);