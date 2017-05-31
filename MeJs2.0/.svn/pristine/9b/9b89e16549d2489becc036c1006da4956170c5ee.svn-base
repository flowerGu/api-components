/*
 全站滚动控件 
 调用:
	me.CarouselPlug({
		scrollobj : ".cctv",
		btnNext: ".next",
		btnPrev: ".prev",
		mouseWheel: true,
		visible:1,
		scroll:1,
		circular:false,
		mouseWheel: true,
	})
  Dom结构:
	<div class="xxx">
		<a href="#" class="prev">&lsaquo;</a>
		<ul>
			<li data-content>内容</li>
			<li data-content>内容</li>
			<li data-content>内容</li>
		</ul>
		<a href="#" class="next">&rsaquo;</a>
	</div> 
*/
var pow = Math.pow,
	sqrt = Math.sqrt,
	sin = Math.sin,
	cos = Math.cos,
	PI = Math.PI,
	c1 = 1.70158,
	c2 = c1 * 1.525,
	c3 = c1 + 1,
	c4 = ( 2 * PI ) / 3,
	c5 = ( 2 * PI ) / 4.5;

// x is the fraction of animation progress, in the range 0..1
function bounceOut(x) {
	var n1 = 7.5625,
		d1 = 2.75;
	if ( x < 1/d1 ) {
		return n1*x*x;
	} else if ( x < 2/d1 ) {
		return n1*(x-=(1.5/d1))*x + .75;
	} else if ( x < 2.5/d1 ) {
		return n1*(x-=(2.25/d1))*x + .9375;
	} else {
		return n1*(x-=(2.625/d1))*x + .984375;
	}
}
jQuery.extend( jQuery.easing,{
	easeInQuad: function (x) {
		return x * x;
	},
	easeOutQuad: function (x) {
		return 1 - ( 1 - x ) * ( 1 - x );
	},
	easeInOutQuad: function (x) {
		return x < 0.5 ?
			2 * x * x :
			1 - pow( -2 * x + 2, 2 ) / 2;
	},
	easeInCubic: function (x) {
		return x * x * x;
	},
	easeOutCubic: function (x) {
		return 1 - pow( 1 - x, 3 );
	},
	easeInOutCubic: function (x) {
		return x < 0.5 ?
			4 * x * x * x :
			1 - pow( -2 * x + 2, 3 ) / 2;
	},
	easeInQuart: function (x) {
		return x * x * x * x;
	},
	easeOutQuart: function (x) {
		return 1 - pow( 1 - x, 4 );
	},
	easeInOutQuart: function (x) {
		return x < 0.5 ?
			8 * x * x * x * x :
			1 - pow( -2 * x + 2, 4 ) / 2;
	},
	easeInQuint: function (x) {
		return x * x * x * x * x;
	},
	easeOutQuint: function (x) {
		return 1 - pow( 1 - x, 5 );
	},
	easeInOutQuint: function (x) {
		return x < 0.5 ?
			16 * x * x * x * x * x :
			1 - pow( -2 * x + 2, 5 ) / 2;
	},
	easeInSine: function (x) {
		return 1 - cos( x * PI/2 );
	},
	easeOutSine: function (x) {
		return sin( x * PI/2 );
	},
	easeInOutSine: function (x) {
		return -( cos( PI * x ) - 1 ) / 2;
	},
	easeInExpo: function (x) {
		return x === 0 ? 0 : pow( 2, 10 * x - 10 );
	},
	easeOutExpo: function (x) {
		return x === 1 ? 1 : 1 - pow( 2, -10 * x );
	},
	easeInOutExpo: function (x) {
		return x === 0 ? 0 : x === 1 ? 1 : x < 0.5 ?
			pow( 2, 20 * x - 10 ) / 2 :
			( 2 - pow( 2, -20 * x + 10 ) ) / 2;
	},
	easeInCirc: function (x) {
		return 1 - sqrt( 1 - pow( x, 2 ) );
	},
	easeOutCirc: function (x) {
		return sqrt( 1 - pow( x - 1, 2 ) );
	},
	easeInOutCirc: function (x) {
		return x < 0.5 ?
			( 1 - sqrt( 1 - pow( 2 * x, 2 ) ) ) / 2 :
			( sqrt( 1 - pow( -2 * x + 2, 2 ) ) + 1 ) / 2;
	},
	easeInElastic: function (x) {
		return x === 0 ? 0 : x === 1 ? 1 :
			-pow( 2, 10 * x - 10 ) * sin( ( x * 10 - 10.75 ) * c4 );
	},
	easeOutElastic: function (x) {
		return x === 0 ? 0 : x === 1 ? 1 :
			pow( 2, -10 * x ) * sin( ( x * 10 - 0.75 ) * c4 ) + 1;
	},
	easeInOutElastic: function (x) {
		return x === 0 ? 0 : x === 1 ? 1 : x < 0.5 ?
			-( pow( 2, 20 * x - 10 ) * sin( ( 20 * x - 11.125 ) * c5 )) / 2 :
			pow( 2, -20 * x + 10 ) * sin( ( 20 * x - 11.125 ) * c5 ) / 2 + 1;
	},
	easeInBack: function (x) {
		return c3 * x * x * x - c1 * x * x;
	},
	easeOutBack: function (x) {
		return 1 + c3 * pow( x - 1, 3 ) + c1 * pow( x - 1, 2 );
	},
	easeInOutBack: function (x) {
		return x < 0.5 ?
			( pow( 2 * x, 2 ) * ( ( c2 + 1 ) * 2 * x - c2 ) ) / 2 :
			( pow( 2 * x - 2, 2 ) *( ( c2 + 1 ) * ( x * 2 - 2 ) + c2 ) + 2 ) / 2;
	},
	easeInBounce: function (x) {
		return 1 - bounceOut( 1 - x );
	},
	easeOutBounce: bounceOut,
	easeInOutBounce: function (x) {
		return x < 0.5 ?
			( 1 - bounceOut( 1 - 2 * x ) ) / 2 :
			( 1 + bounceOut( 2 * x - 1 ) ) / 2;
	}
})
;(function(me) {
    me.CarouselPlug = function(options) {
        options = $.extend({}, me.CarouselPlug.options, options || {});
            var running,
                animCss, sizeCss,
                div = typeof options.scrollobj === "object" ? options.scrollobj : $(options.scrollobj), 
				ul, initialLi, li,
                liSize, ulSize, divSize,
                numVisible, initialItemLength, itemLength, calculatedTo, autoTimeout;

            initVariables();
            initStyles();
            initSizes();
            attachEventHandlers(); 

            function go(to) {
				if(div.attr("data-stop") == "false") return false;
                if(!running) {
                    clearTimeout(autoTimeout); 
                    calculatedTo = to;
                    if(options.beforeStart) {
                        options.beforeStart.call(this, visibleItems());
                    }
                    if(options.circular) {
                        adjustOobForCircular(to);
                    } else {
                        adjustOobForNonCircular(to);
                    } 
                    animateToPosition({ 
                        start: function() {
                            running = true;
                        },
                        done: function() {
                            if(options.afterEnd) {
                                options.afterEnd.call(this, visibleItems());
                            }
                            if(options.auto) {
                                setupAutoScroll();
                            }
							if(options.btnGo){	
								li.each(function(k,v){
									if(Math.abs($(v).position().left) == Math.abs($(v).parents("ul").position().left)){
										var index = $(v).attr("data-index");
										$("."+options.pagesBox).children().eq(index).addClass(options.currentPage).siblings().removeClass(options.currentPage);
									}
								})
							}
                            running = false;
                        }
                    });

                    if(!options.circular) {
                        disableOrEnableButtons();
                    }
                }
                return false;
            }

            function initVariables() {
                running = false;
                animCss = options.vertical ? "top" : "left";
                sizeCss = options.vertical ? "height" : "width";
                ul = div.find(">ul");
                initialLi = ul.find("li[data-content]");
				initialLi.each(function(k,v){
					$(v).attr("data-index",k);
				})
                //initialLi.outerWidth(ul.outerWidth(true));
				//console.log(ul.find("li[data-content]:first-child").outerWidth(true))
				initialLi.outerWidth(ul.find("li[data-content]:first-child").outerWidth(true));
                initialItemLength = initialLi.size();

                numVisible = initialItemLength < options.visible ? initialItemLength : options.visible;
                if(options.circular) {
                    var $lastItemSet = initialLi.slice(initialItemLength-numVisible).clone(true);
                    var $firstItemSet = initialLi.slice(0,numVisible).clone(true);
                    ul.prepend($lastItemSet).append($firstItemSet);
                    options.start += numVisible; 
                }
				if(options.mouseOver && options.auto){
					div.attr("data-stop",true);
					div.hover(function(){
						$(this).attr("data-stop",false);
						clearTimeout(autoTimeout); 
					},function(){
						$(this).attr("data-stop",true);
						setupAutoScroll()
					})
				}
                li = $("li[data-content]", ul);
                itemLength = li.size();
                calculatedTo = options.start;
            }

            function initStyles() {
                div.css("visibility", "visible");
                li.css({
                    overflow: "hidden",
                    "float": options.vertical ? "none" : "left"
                });
                ul.css({
                    margin: "0",
                    padding: "0",
                    position: "relative",
                    "list-style": "none",
                    "z-index": "1"
                });
                div.css({
                    overflow: "hidden",
                    position: "relative",
                    "z-index": "2",
                    left: "0px"
                });
                
                if(!options.circular && options.btnPrev && options.start == 0) {
                    $(options.btnPrev).addClass("disabled");
                }
            }

            function initSizes() {
                liSize = options.vertical ? li.outerHeight(true) : li.outerWidth(true);
                ulSize = liSize * itemLength;       
                divSize = liSize * numVisible; 
                //console.log(liSize);     
                li.css({
                    width: li.width(),
                    height: li.height()
                });
                
                ul.css(sizeCss, ulSize+"px").css(animCss, -(calculatedTo * liSize));
                div.css(sizeCss, divSize+"px");
            }

            function attachEventHandlers() {
                if(options.btnPrev) {
                    $(options.btnPrev).click(function() {
                        return go(calculatedTo - options.scroll);
                    });
                }
                if(options.btnNext) {
                    $(options.btnNext).click(function() {
                        return go(calculatedTo + options.scroll);
                    });
                }
                if(options.btnGo) {
                    $("."+options.pagesBox).children().eq(0).addClass(options.currentPage);
                    //$.each(options.btnGo, function(i, val) {
					$.each($("."+options.pagesBox).children(),function(i,val){
                        $(val).click(function() {
							$(this).addClass(options.currentPage).siblings().removeClass(options.currentPage);
                            return go(options.circular ? numVisible + i : i);
                        });
                    });
                }
                if(options.mouseWheel && div.mousewheel) {
                    div.mousewheel(function(e, d) {
                        return d > 0 ?
                            go(calculatedTo - options.scroll) :
                            go(calculatedTo + options.scroll);
                    });
                }
                if(options.auto) {
                    setupAutoScroll();
                }
            }

            function setupAutoScroll() {
                autoTimeout = setTimeout(function() {
                    go(calculatedTo + options.scroll);
                }, options.auto);
            }

            function visibleItems() {
				if(options.btnGo){	
					li.each(function(k,v){
						if(Math.abs($(v).position().left) == Math.abs($(v).parents("ul").position().left)){
							var index = $(v).attr("data-index");
							$("."+options.pagesBox).children().eq(index).addClass(options.currentPage).siblings().removeClass(options.currentPage);
						}
					})
				}
                return li.slice(calculatedTo).slice(0,numVisible);
            }

            function adjustOobForCircular(to) {
                var newPosition;
                if(to <= options.start - numVisible - 1) {
                    newPosition = to + initialItemLength + options.scroll;
                    ul.css(animCss, -(newPosition * liSize) + "px");
                    calculatedTo = newPosition - options.scroll;
                    //console.log("Before - Positioned at: " + newPosition + " and Moving to: " + calculatedTo);
                }else if(to >= itemLength - numVisible + 1) {
                    newPosition = to - initialItemLength - options.scroll;
                    ul.css(animCss, -(newPosition * liSize) + "px");
                    calculatedTo = newPosition + options.scroll;
                    //console.log("After - Positioned at: " + newPosition + " and Moving to: " + calculatedTo);
                }
            }

            function adjustOobForNonCircular(to) {
                if(to < 0) {
                    calculatedTo = 0;
                }else if(to > itemLength - numVisible) {
                    calculatedTo = itemLength - numVisible;
                }
                //console.log("Item Length: " + itemLength + "; " +"To: " + to + "; " +"CalculatedTo: " + calculatedTo + "; " +"Num Visible: " + numVisible);
            }

            function disableOrEnableButtons() {
                $(options.btnPrev + "," + options.btnNext).removeClass("disabled");
                $( (calculatedTo-options.scroll<0 && options.btnPrev)
                    ||
                    (calculatedTo+options.scroll > itemLength-numVisible && options.btnNext)
                    ||
                    []
                ).addClass("disabled");
            }

            function animateToPosition(animationOptions) {
                running = true;
                ul.animate(
                    animCss == "left" ?
                    { left: -(calculatedTo*liSize) } :
                    { top: -(calculatedTo*liSize) },
                    $.extend({
                        duration: options.speed,
                        easing: options.easing
                    }, animationOptions)
                );
            }
    };
    me.CarouselPlug.options = {
		scrollobj : null,           // 滚动视窗对象,class 或者 id
        btnPrev: null,              // 上一个按钮的class名, 比如  btnPrev: ".prev"
        btnNext: null,              // 下一个按钮的class名, 比如  btnPrev: ".prev"
        btnGo: false,               //翻页按钮,默认false,传true表示有翻页
        mouseWheel: false,          // 鼠标滑是否可以轮控制上下滚动,可选：false,true,默认false
		mouseOver:true,             // 鼠标放上是否停止自动滚动
        auto: null,                 // 指定多少秒内容定期自动滚动。默认为空(null),是不滚动,如果设定的,单位为毫秒,如1秒为1000;设置自动后bntGo 失效
        speed: 200,                 // 滑动的速度,可以尝试800 1000 1500,设置成0将删除效果
        easing: null,               // 缓冲效果名称,如:easing: "bounceout",需要jquery中的easing pluin（缓冲插件实现）
        vertical: false,            // 是否垂直滚动,可选：false,true,默认false
        circular: true,             // 是否循环滚动,默认为true,如果为false,滚动到最后一个将停止滚动
        visible: 3,                 // 可见数量,可以为小数，如2.5为2.5个li
        start: 0,                   // 开始的地方,默认是0
        scroll: 1,                  // 每次滚动的li数量
		currentPage: null,          // 当前"页"className(如果设置了页码的话)
		pagesBox: null,             // 页码的外容器className
        beforeStart: null,          // 滚动开始时回调的函数,可以传入对象参数 beforeStart: function(a) { alert("开始的对象是:" + a)}
        afterEnd: null              // 滚动结束时回调的函数,使用方法同上
    }; 
})(me);