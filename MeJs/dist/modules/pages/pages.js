!function(e){function n(c){if(t[c])return t[c].exports;var r=t[c]={exports:{},id:c,loaded:!1};return e[c].call(r.exports,r,r.exports,n),r.loaded=!0,r.exports}var t={};return n.m=e,n.c=t,n.p="",n(0)}([function(e,n){"use strict";!function(e){var n={init:function(e,t){return function(){n.fillHtml(e,t),n.bindEvent(e,t)}()},fillHtml:function(e,n){return 1==n.pageCount?function(){e.empty()}():function(){e.empty(),n.current>1?e.append('<li class="prevPage">上一页</li>'):n.pageCount&&(e.remove(".prevPage"),e.append('<li class="disabled" style="background:#dcdcdc;color:#fff;border:1px solid #dcdcdc;">上一页</li>')),1!=n.current&&n.current>=4&&4!=n.pageCount&&e.append('<li class="tcdNumber">1</li>'),n.current-2>2&&n.current<=n.pageCount&&n.pageCount>5&&e.append("<li>...</li>");var t=n.current-2,c=n.current+2;for((t>1&&n.current<4||1==n.current)&&c++,n.current>n.pageCount-4&&n.current>=n.pageCount&&t--;t<=c;t++)t<=n.pageCount&&t>=1&&(t!=n.current?e.append('<li class="tcdNumber">'+t+"</li>"):e.append('<li class="m_active">'+t+"</li>"));n.current+2<n.pageCount-1&&n.current>=1&&n.pageCount>5&&e.append("<li>...</li>"),n.current!=n.pageCount&&n.current<n.pageCount-2&&4!=n.pageCount&&e.append('<li class="tcdNumber">'+n.pageCount+"</li>"),n.current<n.pageCount?e.append('<li class="nextPage">下一页</li>'):n.pageCount&&(e.remove(".nextPage"),e.append('<li class="disabled" style="background:#dcdcdc;color:#fff;border:1px solid #dcdcdc;">下一页</li>'))}()},bindEvent:function(e,t){return function(){e.off("click"),$(".tcdNumber,.prevPage,.nextPage").off("click"),e.on("click",".tcdNumber",function(){var c=parseInt($(this).text());n.fillHtml(e,{current:c,pageCount:t.pageCount}),"function"==typeof t.backFn&&t.backFn(c,!0,t.ele)}),e.on("click",".prevPage",function(){var c=parseInt(e.children(".m_active").text());n.fillHtml(e,{current:c-1,pageCount:t.pageCount}),"function"==typeof t.backFn&&t.backFn(c-1,!0,t.ele)}),e.on("click",".nextPage",function(){var c=parseInt(e.children(".m_active").text());n.fillHtml(e,{current:c+1,pageCount:t.pageCount}),"function"==typeof t.backFn&&t.backFn(c+1,!0,t.ele)})}()}},t="",c=!1,r={};e.pages=function(e){t=e,r[e.ele]=e,t.backFn(1)},e.pages.init=function(e,a,u){c||u||(c=!0,t=u?r[u]:t,t.pageCount=e,n.init($(t.ele),t)),(a||u)&&(t=u?r[u]:t,t.pageCount=e,n.init($(t.ele),t))}}(me)}]);