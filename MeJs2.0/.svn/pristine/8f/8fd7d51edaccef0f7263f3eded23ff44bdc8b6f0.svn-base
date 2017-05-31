export function byID(id){
    return document.getElementById(id);
}

export function query(quer){
    return document.querySelectorAll(quer);
}

export function eQuery(element,quer){
    return element.querySelectorAll(quer);
}

export function getByTag(element, tagName){
    return element.getElementsByTagName(tagName);
}

export function isString(str){
    return typeof str === 'string';
}

export function isObject(obj){
    return typeof obj === 'object' && obj !== null;
}

export function addListener(element,type,handler){
    if(element.addEventListener){
        element.addEventListener(type,handler,false);
    }else if(element.attachEvent){
        element.attachEvent('on' + type, handler);
    }
}

export function hasClass(element, value){
    return element.classList ?
        element.classList.contains(value) :
        element.className.indexOf(value) > -1;
}

export function removeClass(element,value){
    if(!value){
        return;
    }

    if(element.classList){
        element.classList.remove(value);
        return;
    }

    if(element.className.indexOf(value) >= 0){
        element.className = element.className.replace(value, '');
    }
}

export function addClass(element,value){
    if(!value){
        return;
    }

    if(element.classList){
        element.classList.add(value);
        return element;
    }

    if(!element.className){
        element.className = value;
    }else if(element.className.indexOf(value) < 0){
        element.className += ' ' + value;
    }

    return element;
}

export function setStyle(element, styles){ 
    var style = element.style;
    for(var n in styles){
        style[n] = styles[n];
    }
}

export function getStyle(element){
    return window.getComputedStyle ? 
            window.getComputedStyle(element, null) :
            element.currentStyle;
}