!function(t){function s(o){if(e[o])return e[o].exports;var i=e[o]={exports:{},id:o,loaded:!1};return t[o].call(i.exports,i,i.exports,s),i.loaded=!0,i.exports}var e={};return s.m=t,s.c=e,s.p="",s(0)}([function(t,s){"use strict";var e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t};me.select=function(){function t(t,s,o){this.options=o,"object"!==e(this.options)||null===this.options?(this.maxHeight="200px",this.width="300px",this.height="30px",this.color="#e5e6e7",this.text="请选择",this.arrow=!1,this.choosenClass="sel-selectItem",this.ev="",this.callback=""):(this.maxHeight=this.options.maxHeight||"200px",this.width=this.options.width||"300px",this.height=this.options.height||"30px",this.text=this.options.text||"请选择",this.arrow=this.options.arrow||!1,this.choosenClass=this.options.choosenClass||"sel-selectItem",this.ev=this.options.ev||"",this.callback=this.options.callback||""),"number"==typeof s&&null!==s&&1==s&&0==s||(this.model=0),this.ele=$(t),this.model=s,this.ele.css({display:"none",width:this.width}),this.w=this.ele.width(),this.opt=this.ele.find("option"),this.sCon=this.ele.parent(),this.choosen="<ul class='sel-choosenShowList'><li><input type='text' readonly class='sel-inp' width='"+this.width+"' placeholder='"+this.text+"'></li></ul>",this.nSelect="<div class='sel-chooseListContainer'><ul></ul></div>",this.list="",this.chooseData=[],this.chooseValue=[]}return t.prototype.set=function(){this.getSelectList(),this.init(),1==this.model?this.mutiSelect():this.singleSelect()},t.prototype.get=function(){return 1===this.model?this.sCon.attr("data-choose"):this.sCon.attr("data-value")},t.prototype.init=function(){0==$("#selectStyle").size()&&$("head").append("<style id='selectStyle'>*{margin:0px;padding:0px;} \t\t\t\t\t\t\t\t\t\t\t\t\t\tdiv:after, ul:after, dl:after,.clearfix:after { content:''; display:block; clear:both; height:0; visibility:hidden;} \t\t\t\t\t\t\t\t\t\t\t\t\t\t.sel-choosenShowList{margin: 0;padding: 0;cursor: text;overflow: hidden;height: auto !important;position: relative;border:1px solid #e5e6e7;list-style:none} \t\t\t\t\t\t\t\t\t\t\t\t\t\t.sel-choosenShowList .sel-selectItem{background-color: #e4e4e4;border: 1px solid #aaa;border-radius: 4px;padding: 3px 3px;margin:3px} \t\t\t\t\t\t\t\t\t\t\t\t\t\t.sel-choosenShowList li{float: left;} \t\t\t\t\t\t\t\t\t\t\t\t\t\t.sel-choosenShowList .sel-inp{border:0;outline:none;padding-left:5px})} \t\t\t\t\t\t\t\t\t\t\t\t\t\t.sel-choosenShowList b{cursor: pointer;} \t\t\t\t\t\t\t\t\t\t\t\t\t\t.sel-choosenShowList .sel-delete{ color: #999;cursor: pointer;display: inline-block;font-weight: bold;margin-left: 2px;} \t\t\t\t\t\t\t\t\t\t\t\t\t\t.sel-choosenShowList .sel-delete:hover{color:black;} \t\t\t\t\t\t\t\t\t\t\t\t\t\t.sel-chooseListContainer{background:#fff;overflow-y:scroll;display:none;listStyle:none;border:1px solid #aaa} \t\t\t\t\t\t\t\t\t\t\t\t\t\t.sel-chooseListContainer .sel-list{height:30px;line-height: 30px;cursor: pointer;padding: 0px 7px} \t\t\t\t\t\t\t\t\t\t\t\t\t\t.sel-hoverActiveShow{background-color: #3875d7;color:white;} \t\t\t\t\t\t\t\t\t\t\t\t\t\t.sel-choosenMouseFocus{border:1px solid #5897fb;boxShadow:0 0 5px rgba(0,0,0,.3)}} \t\t\t\t\t\t\t\t\t\t\t\t\t\t.sel-slideDown{display:block;width:10px;height:10px;background: black} \t\t\t\t\t\t\t\t\t\t\t\t\t\t.sel-downArrow{width:0; height:0; border-left:10px solid transparent;border-right:10px solid transparent;border-top:10px solid #e5e6e7;position:absolute;right:5px;top:50%;margin-top:-5px} \t\t\t\t\t\t\t\t\t\t\t\t\t\t.sel-downArrow:hover{border-left:10px solid transparent;border-right:10px solid transparent;border-top:10px solid #e5e6e7;border-top:10px solid #aaa;}</style>"),this.bindEvents(),this.sCon.css({width:this.w,position:"relative",display:"inline-block"}),this.sCon.find(".sel-choosenShowList").css({width:this.w,"min-height":this.height}),this.sCon.find(".sel-inp").css("height",this.sCon.find(".sel-choosenShowList").outerHeight(!0)),this.sCon.find(".sel-chooseListContainer").css({width:this.w,"max-height":this.maxHeight,position:"absolute","z-index":65535}),this.arrow&&this.sCon.append("<div class='sel-arrow sel-downArrow' id='arrow'></div>")},t.prototype.bindEvents=function(){var t=this;this.sCon.on("click",function(s){$(s.target).hasClass("sel-delete")||t.sCon.find(".sel-inp").focus(),($(s.target).hasClass("sel-choosenShowList")||$(s.target).hasClass("sel-inp")||$(s.target).hasClass(t.choosenClass)||$(s.target).hasClass("sel-selectedTxt")||$(s.target).hasClass("sel-arrow"))&&("none"==t.sCon.find(".sel-chooseListContainer").css("display")?($(".sel-chooseListContainer").css("display","none"),$(".sel-choosenShowList").removeClass("sel-choosenMouseFocus"),t.sCon.find(".sel-chooseListContainer").css("display","block"),t.sCon.find(".sel-choosenShowList").addClass("sel-choosenMouseFocus")):(t.sCon.find(".sel-chooseListContainer").css("display","none"),t.sCon.find(".sel-choosenShowList").removeClass("sel-choosenMouseFocus")))}),$(document).on("click",function(s){$(s.target).hasClass("sel-choosenShowList")||$(s.target).hasClass("sel-inp")||$(s.target).hasClass(t.choosenClass)||$(s.target).hasClass("sel-arrow")||$(s.target).hasClass("sel-selectedTxt")||$(s.target).hasClass("sel-list")||(t.sCon.find(".sel-chooseListContainer").css({display:"none"}),t.sCon.find(".sel-choosenShowList").removeClass("sel-choosenMouseFocus"))}),this.sCon.find(".sel-chooseListContainer").on("mouseover",">ul>li",function(){$(this).addClass("sel-hoverActiveShow")}),this.sCon.find(".sel-chooseListContainer").on("mouseout",">ul>li",function(){$(this).removeClass("sel-hoverActiveShow")})},t.prototype.mutiSelect=function(){var t=this;this.sCon.find(".sel-chooseListContainer").on("click","li",function(){var s="";s+="<li class='"+t.choosenClass+"' rel='"+$(this).attr("rel")+"'><span class='sel-selectedTxt'>"+$(this).text()+"</span><b class='sel-delete'>×</b></li>",t.sCon.find(".sel-inp").parent().before(s),$(this).remove(),t.sCon.find(".sel-arrow").hide(),t.sCon.find(".sel-inp").focus(),t.chooseData.push($(this).text()),t.sCon.attr("data-choose",t.chooseData),t.isEmpty()}),this.sCon.find(".sel-choosenShowList").on("click",".sel-delete",function(){var s=$(this).parent().attr("rel");t.chooseData.splice(t.chooseData.indexOf($(this).prev().text()),1),t.sCon.attr("data-choose",t.chooseData),$(this).parent().remove();var e="";e="<li class='sel-list' rel='"+s+"'>"+$(this).prev().text()+"</li>";var o=[],i=[];if(0==s)t.sCon.find(".sel-chooseListContainer ul").prepend(e);else{for(var n=0;n<t.sCon.find(".sel-chooseList ul li").length;n++)+t.sCon.find(".sel-chooseListContainer ul li").eq(n).attr("rel")>+s?o.push(t.sCon.find(".sel-chooseList ul li").eq(n)):+t.sCon.find(".sel-chooseListContainer ul li").eq(n).attr("rel")<+s&&i.push(t.sCon.find(".sel-chooseListContainer ul li").eq(n));0==o.length&&0!=i.length?i[i.length-1].after(e):0==o.length&&0==i.length?t.sCon.find(".sel-chooseListContainer ul").prepend(e):0!=o.length&&0==i.length?o[0].before(e):i[i.length-1].after(e)}t.isEmpty()})},t.prototype.singleSelect=function(){var t=this;this.sCon.find(".sel-chooseListContainer").on("click","li",function(){var s="";t.chooseData=[],t.chooseValue=[],s+="<li rel='"+$(this).attr("rel")+"' style='line-height:"+t.height+";margin-left:10px'><span class='sel-selectedTxt'>"+$(this).text()+"</span></li>",t.sCon.find(".sel-inp").parent().siblings().remove(),t.sCon.find(".sel-inp").parent().before(s),t.sCon.find(".sel-chooseListContainer").hide(),t.chooseData.push($(this).text()),t.chooseValue.push($(this).attr("value")),t.sCon.attr("data-choose",t.chooseData),t.sCon.attr("data-value",t.chooseValue),t.isEmpty()}),this.sCon.find(".sel-choosenShowList").on("click",".sel-delete",function(){t.chooseData=[],t.sCon.attr("data-choose",t.chooseData),$(this).parent().remove(),t.isEmpty()})},t.prototype.getSelectList=function(){for(var t=this,s=0;s<this.opt.length;s++)this.list+="<li class='sel-list' rel='"+s+"' value='"+this.opt[s].value+"'>"+this.opt[s].text+"</li>";this.sCon.prepend(this.choosen),this.sCon.append(this.nSelect),this.sCon.find(".sel-chooseListContainer ul").append(this.list),this.options.ev&&this.options.callback&&$.each(this.sCon.find(".sel-chooseListContainer ul li"),function(s,e){$(e).bind(t.options.ev,function(){t.options.callback($(this))})})},t.prototype.isEmpty=function(){var t=this.sCon.find(".sel-inp").parent().siblings();0==t.length?(this.sCon.find(".sel-inp").css({width:this.width}).attr("placeholder",this.text),this.sCon.find(".sel-arrow").show()):this.sCon.find(".sel-inp").css({height:$("."+this.choosenClass).outerHeight(!0),width:"5px"}).attr("placeholder","")},t.prototype.empty=function(){this.sCon.find(".sel-selectedTxt").parent().remove(),this.sCon.removeAttr("data-value"),this.sCon.removeAttr("data-choose"),this.isEmpty()},{set:function(s,e,o){return new t(s,e,o).set()},get:function(s,e,o){return new t(s,e,o).get()},empty:function(s,e,o){return new t(s,e,o).empty()}}}()}]);