var iscroll;
var myswiper;
$(function(){
	setscroll();
	setswiper();
	getBanner();
	getData(1);
	$('#page').val(1);
	//下拉刷新
	document.addEventListener('touchend',function(){
		if(iscroll.y>0){
			$('#content').empty();
			getData(1);
		}
	//上拉加载	
		if(iscroll.y<iscroll.maxScrollY-50){
			var page = parseInt($('#page').val());
			var index = page+1;
			getData(index);
			$('#page').val(index)
		}
	})
})


//轮播图，滚动
function setswiper(){
	 myswiper = new Swiper('.swiper-container',{
				autoplay:3000,
				loop:true,
//				observer:true,//修改swiper自己或子元素时，自动初始化swiper
//  			observeParents:true,//修改swiper的父元素时，自动初始化swiper
				//autoplayDisableOnInteraction:false,
				pagination:'.swiper-pagination',
				paginationBulletRender:function(index,className){
				return "<span class="+className+"></span>"
				}
			})
}
function setscroll(){
	 iscroll = new IScroll('#wraper',{
		mouseWheel:true,
		scrollbars:true
		})
}

//获取数据
function getData(classID){
	$.ajax({
		type:"get",
		url:"http://datainfo.duapp.com/shopdata/getGoods.php",
		data:{classID:classID},
		dataType:'jsonp',
		async:true,
		success:function(data){
			data.forEach(function(v){
				var figure = $('<figure></figure>');
				var figu = $('<div class="figu">图片加载中。。。</div>');
				var oimg = $('<img src="'+v.goodsListImg+'"/>');
				 oimg.on('load',function(){
				 	figu.empty();
				 	figu.append(oimg);
				 	iscroll.refresh();
				 });
				 //点击跳转
				 
				 oimg.on('touchstart',function(){
				 	window.location.href="goods.html?goodsID="+encodeURI(v.goodsID);
				 });
				 
				var figcaption = $(`<figcaption>
						<h5>`+v.goodsName+`</h5>
						<p><b>￥`+v.price+`</b><i></i></p>
						<p>`+v.discount+`折</p>
						<a href="javascript:;" class="btn"><span class="iconfont">&#xe68f;</span></a>
					</figcaption>`);
					//点击添加到购物车
					figcaption.find('.btn').on('touchstart',function(){
						alert('添加购物车成功')
				 	$.ajax({
				 		type:"post",
				 		url:" http://datainfo.duapp.com/shopdata/updatecar.php",
				 		data:{userID:'run123',goodsID:v.goodsID,numeber:1},
				 		async:true,
				 		success:function(data){
				 		}
				 	});
				 });
				 figure.append(figu);
				 figure.append(figcaption);
				 $('#content').append(figure);
			})
		}
	});
}


//搜索栏查询
function searchGoods(){
	var val = $('#isearch').val();
	$.ajax({
		type:"get",
		url:"http://datainfo.duapp.com/shopdata/selectGoodes.php",
		dataType:'jsonp',
		async:true,
		data:{selectText:encodeURI(val),pageCode:0,linenumber:10},
		success:function(data){
			if(data==0){
				getData(1);
				alert('您搜索的结果可能不存在哦')
			}else{
				$('#content').empty();
				console.log(data)
			data.forEach(function(v){
				var figure = $('<figure></figure>');
				var figu = $('<div class="figu">图片加载中。。。</div>');
				var oimg = $('<img src="'+v.goodsListImg+'"/>');
				 oimg.on('load',function(){
				 	figu.empty();
				 	figu.append(oimg);
				 	iscroll.refresh();
				 });
				 //点击跳转
				 oimg.on('touchstart',function(){
				 	
				 	window.location.href="detial.html?goodsID="+encodeURI(v.goodsID);
				 });
				var figcaption = $(`<figcaption>
						<h5>`+v.goodsName+`</h5>
						<p><b>￥`+v.price+`</b><i></i></p>
						<p>`+v.discount+`折</p>
						<a href="javascript:;" class="btn"><span class="iconfont">&#xe68f;</span></a>
					</figcaption>`);
					//点击添加到购物车
					figcaption.find('.btn').on('touchstart',function(){
				 	$.ajax({
				 		type:"post",
				 		url:" http://datainfo.duapp.com/shopdata/updatecar.php",
				 		data:{userID:'run123',goodsID:v.goodsID,numeber:1},
				 		async:true,
				 		success:function(data){
				 		}
				 	});
				 });
				 figure.append(figu);
				 figure.append(figcaption);
				 $('#content').append(figure);
				 iscroll.refresh();
			})
			}
		}
	});
}

//购物车
function goshopcar(){
	window.location.href = "shoplist.html"
}


//获取首页轮播图
function getBanner(){
	$.ajax({
		type:"get",
		url:" http://datainfo.duapp.com/shopdata/getBanner.php",
		async:true,
		dataType:'jsonp',
		success:function(data){
			data.forEach(function(v,k){
				var imgsrc = eval(v.goodsBenUrl)[0];
				var slide = $('<div class="swiper-slide"></div>');
				var img = $('<img src="'+imgsrc+'"/>')
				slide.append(img);
				$('#swiper-wrapper').append(slide);
				//myswiper.update();
			})
			setswiper();
		}
	});
}


