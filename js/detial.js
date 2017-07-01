			var swiper1;
			$(function(){
				loadSwiper();
				loadDetail();
			})
			//加载轮播图
			function loadSwiper(){
				swiper1 = new Swiper('#wraper',{
					autoplay:1000,
					looper:true,
					pagination:'.swiper-pagination',
					paginationBulletRender:function(index,className){
					return  "<span class="+className+"></span>";
				}
			});
			}
			function getQueryString(name){
				var url = location.search;
				console.log(url)
				var reg = new RegExp("(^|&)"+name+"=([^&]*)(&|$)");
				var r = url.substr(1).match(reg);
				console.log(r)
				if(r!=null){
					return decodeURI(r[2])
				}
				return null
			};
			function loadDetail(goodsID){
				var goodsID = getQueryString("goodsID");
				$.ajax({
					type:"get",
					url:" http://datainfo.duapp.com/shopdata/getGoods.php",
					async:true,
					data:{goodsID:goodsID},
					dataType:'jsonp',
					success:function(data){
						var data = data[0].imgsUrl;
						    data = eval(data);
						    $(data).each(function(k,v){
						    	var img = $('<img src="'+v+'"/>');
						    	var wraper = $('.swiper-wrapper');
						    	var slide = $('<div class="swiper-slide"></div>');
						    	slide.append(img);
						    	wraper.append(slide);
						    	loadSwiper();
						    })
					}
				});
			}