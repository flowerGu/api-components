!function(e){function t(o){if(r[o])return r[o].exports;var n=r[o]={exports:{},id:o,loaded:!1};return e[o].call(n.exports,n,n.exports,t),n.loaded=!0,n.exports}var r={};return t.m=e,t.c=r,t.p="",t(0)}([function(e,t){"use strict";!function(e){e.endTime=function(e){var t=e.endTime.split(" "),r=t[0].split("-"),o=t.length>1?t[1].split(":"):[0,0,0],n=new Date(r[0],r[1]-1,r[2],o[0],o[1],o[2]),l=new Date,i=n.getTime()-l.getTime();if(i>0){var a=Math.floor(i/1e3/60/60/24),s=Math.floor(i/1e3/60/60%24),f=Math.floor(i/1e3/60%60),p=Math.floor(i/1e3%60);$(e.ele).html(e.str||a+"天"+s+"时"+f+"分"+p+"秒")}else $(e.ele).html("已结束")}}(me)}]);