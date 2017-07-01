var iscroll;
			$(function(){
				loadScroll();
				getData();
			})
			
			
			function loadScroll(){
				iscroll = new IScroll('#content',{
				mouseWheel:true,
				scrollbars:true
				})
			}
			
			//加载订单信息
			function getData(){
				$.ajax({
					type:"get",
					url:"http://datainfo.duapp.com/shopdata/getCar.php",
					async:true,
					data:{userID:'run123'},
					dataType:'jsonp',
					success:function(data){
						if(data!=0){
							$.each(data,function(k,v){
							var figure = $('<figure></figure>');
							var img = $('<img src="'+v.goodsListImg+'"/>');
							var figcaption = $(`<figcaption>
									<p>`+v.goodsName+`</p>
									<p>单价：<span class="red">￥`+v.price+`</span></p>
									<p><i>数量:</i><b>`+v.number+`</b></p>
									<b class="laji" >L</b>
								</figcaption>`);
								//添加事件的元素要单独声明创建
							var odelete = $("<a href='javascript:;' class='nobuy'>取消订单</a>")
							figcaption.append(odelete)
							figure.append(img);
							figure.append(figcaption);
							$('#wrapper').append(figure);
							//取消订单
							odelete.on("touchstart",function(){
								console.log(odelete)
								$.ajax({
									type:"post",
									url:"http://datainfo.duapp.com/shopdata/updatecar.php",
									async:true,
									data:{userID:'run123',goodsID:v.goodsID,number:0},
									success:function(data){
										if(data==1){
											console.log('取消订单成功');
											$(this).parent().parent().remove();
											return;
										}else{
											console.log('取消订单失败');
										}
									}.bind(this)
								})
							})
							iscroll.refresh();
						})
						}
					}
				});
			}