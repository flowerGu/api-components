
$(function () {
  //  导航列表
  var lists = {
    '栅格布局': 'layout.html',
    'flex布局': 'flex.html',
    'select': 'select.html',
    '级联选择':'cascader.html',
	'提示信息定位':'errorTipEle.html',
	'button': 'button.html',
	'checkbox和radio' : 'checkbox.html',
	'input' : 'input.html',
	'mouseTips': 'mouseTips.html',
	'MEicon': 'meicon.html',
	'旋转木马':'carousel.html',
	'ME滚动条':'meScroll.html',
	'viewer': 'viewer.html',
	'upload':'upload.html',
	'dateChoose':'dateChoose.html',
	'menu':'menu.html',
	'tabMenu':'tabMenu.html',
	'tab切换':'tabs.html'
    //sessionStorage : dataStorage.sessionStorage,
  }

  var arr = [];
  for (var n in lists) {
    arr.push('<li><a href="' + lists[n] + '">' + n + '</a></li>');
  }
  $('#lists').html(arr.join(''));
  // 通用头部尾部提取
  var basicUrl = (location.href.indexOf("pages") > -1 ) ? '../' : "";
  $("<div/>").load(basicUrl + "pages/header.html",function(rep){
    $(rep).prependTo($("body"))
  })
  $("<div/>").load(basicUrl + "pages/footer.html",function(rep){
    $(rep).appendTo($("body"))
  })
  
  $('pre').addClass('prettyprint');
  $('td pre').removeClass('prettyprint');
  prettyPrint();
  var $window = $(window);
  /* $('.bs-docs-sidenav').affix({
	offset: {
	  top: function () {
		return $window.width() <= 980 ? 290 : 210
	  },
	  bottom: 270
	}
  });
  $(".content").find('h1, h2, h3, h4, h5, h6').each(function () {
	var node = $(this);
	if (!node.attr("id")) {
	  node.attr("id", "index_" + node.text());
	}
	node.css("paddingTop", 40);
  }); */
})
