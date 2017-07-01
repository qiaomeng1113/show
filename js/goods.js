var goodsID = getQueryString("goodsID");
			$(function(){
				loadGoods(goodsID);
			})
			
			
			
			function getQueryString(name){
				var url = location.search;
				var reg = new RegExp("(^|&)"+name+"=([^&]*)(&|$)");
 				var r = window.location.search.substr(1).match(reg);
				if(r!=null){
					return decodeURI(r[2])
				}
				return null;
			};
			
			function loadGoods(goodsID){
				$.ajax({
					type:"get",
					url:" http://datainfo.duapp.com/shopdata/getGoods.php",
					async:true,
					data:{goodsID:goodsID,linenumber:1},
					dataType:'jsonp',
					success:function(data){
						   var v = eval(data)[0];
						   console.log(v.buynumber)
/*						    <figure>
								<img src="img/good.jpg"/>
								<figcaption>
									<h3><span id="fang"><i id="cir"></i></span> ￥259 灰色印花短袖T恤</h3>
									<p>市场价：<span>￥439</span> 4.8折  <b>125人购买</b></p>
								</figcaption>
							</figure>*/
						    	var figure = $(`<figure>
								<img src="`+v.goodsListImg+`"/>
								<figcaption>
									<h3><span id="fang"><i id="cir"></i></span><a href="javascript:;"> ￥`+v.price+v.goodsName+` </a></h3>
									<p>市场价：<span>￥439</span> `+v.discount+`折  <b>`+v.buynumber+`人购买</b></p>
								</figcaption>
							</figure>`);
						    	$('#content').append(figure)
					}
				});
			}
			//跳转详情页
			function getDetial(){
				$.ajax({
					type:"get",
					url:"http://datainfo.duapp.com/shopdata/getGoods.php",
					async:true,
					data:{goodsID:goodsID,linenumber:1},
					dataType:'jsonp',
					success:function(data){
						   var v = eval(data)[0];
						   console.log(v)
						   /*<div>
								<img src="img/detial.jpg"/>
								<div class="txt">
									<p>
										<span>产地：土耳其</span>
										<span>品牌：LIU·JO</span>
										<span>商品名称：灰色个性团印花短袖T恤（配饰品）</span>
									</p>					
									<p>这衣服真他么丑，牌子还没听过，居然还敢卖这么贵。买的人都是弱智么。这衣服真他么丑，牌子还没听过，居然还敢卖这么贵。买的人都是弱智么。这衣服真他么丑，牌子还没听过，居然还敢卖这么贵。买的人都是弱智么。</p>
									<p>细节亮点：印花、配装物品</p>
									<p>这衣服真他么丑，牌子还没听过，居然还敢卖这么贵。买的人都是弱智么。这衣服真他么丑，牌子还没听过，居然还敢卖这么贵。买的人都是弱智么。这衣服真他么丑，牌子还没听过，居然还敢卖这么贵。买的人都是弱智么。这衣服真他么丑，牌子还没听过，居然还敢卖这么贵。买的人都是弱智么。</p>
									<p>这衣服真他么丑，牌子还没听过，居然还敢卖这么贵。买的人都是弱智么。这衣服真他么丑，牌子还没听过，居然还敢卖这么贵。买的人都是弱智么。这衣服真他么丑，牌子还没听过，居然还敢卖这么贵。买的人都是弱智么。这衣服真他么丑，牌子还没听过，居然还敢卖这么贵。买的人都是弱智么。</p>
								</div>
							</div>*/
						   var detial = $(`<div>
								<img src="`+v.goodsListImg+`" class="detialImg"/>
								<div class="txt">
									<p>
										`+v.detail+`
									</p>					
								</div>
							</div>`);
							$('#deadline').remove();
							$('#content').empty().append(detial);
						  }
				});
			}
			//跳转实拍页
			function getPic(){
				$.ajax({
					type:"get",
					url:"http://datainfo.duapp.com/shopdata/getGoods.php",
					async:true,
					data:{goodsID:goodsID,linenumber:1},
					dataType:'jsonp',
					success:function(data){
						   var v = eval(data)[0];
						   console.log(v);
						   imglist = eval(v.imgsUrl);
						   var wraprer =$(`<div class="swiper-wrapper" id="swiper-wrapper">`);
						   var container = $(`<div class="swiper-container">`);
						   var pagination = $(`<div class="swiper-pagination"></div>`)
						   imglist.forEach(function(v,k){
						   	var slide = $(`<div class="swiper-slide"><img src="`+v+`"/></div>`);
						   	 wraprer.append(slide);
						   })
						   container.append(wraprer);
						   container.append(pagination);
						    $('#deadline').remove();
							$('#content').empty().append(container);
							var myswiper = new Swiper(".swiper-container",{
								pagination:".swiper-pagination",
								autoplay:1000,
								loop:true,
								observer:true,//修改swiper自己或子元素时，自动初始化swiper
			    				observeParents:true,//修改swiper的父元素时，自动初始化swiper
							})
						  }
				});
					
			}
			//跳转介绍页
			function getInt(){
				if($('#deadline').length==0){
					var deadline = $(`<div id="deadline">
						<h3>距离结束时间：01天01小时01分01秒</h3>
					</div>`);
					deadline.insertBefore($('#content'));
				}
				$('#content').empty();
				loadGoods(goodsID);
			}