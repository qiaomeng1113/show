var myscroll;
			var total;
			var totalprice;
			$(function(){
				getScroll();
				getData();
			});
			
			function getScroll(){
				myscroll = new IScroll('#iscroll',{
					mouseWheel:true,
					scrollbars:true
				})
			}
			
			
			function getData(){
				total=0;
				totalprice=0;
				$.ajax({
					type:"get",
					url:"http://datainfo.duapp.com/shopdata/getCar.php",
					async:true,
					dataType:'jsonp',
					data:{userID:'run123'},
					success:function(data){
						if(data!=0){
							$.each(data, function(k,v) {
							var figure = $(`<figure></figure>`);
							var figurecon = $(`<img src="`+v.goodsListImg+`"/>
						<figcaption>
							<p>`+v.goodsName+`</p>
							<p>单价：<span class="red">￥`+v.price+`</span><b>L</b></p>
							<p><i>数量:</i><a href="javascript:;" class="reduce">-</a><input type="text" name="num" class="num" value=`+v.number+` /><a href="javascript:;" class="add">+</a></p>
							<i class="iconfont laji" >&#xe665;</i>
						</figcaption>`);
						/*	$('#wrapper').append(`<figure>
						<img src="`+v.goodsListImg+`"/>
						<figcaption>
							<p>`+v.goodsName+`</p>
							<p>单价：<span class="red">￥`+v.price+`</span><b>L</b></p>
							<p><i>数量:</i><a href="javascript:;">-</a><input type="text" name="num" class="num" value=`+v.number+` /><a href="javascript:;">+</a></p>
							<i class="iconfont laji" >&#xe665;</i>
						</figcaption>
					</figure>`);*/
					figure.append(figurecon);
					//点击垃圾箱移除商品
					var laji = figure.find('.laji');
					laji.on('touchstart',function(){
						$.ajax({
							type:"post",
							url:"http://datainfo.duapp.com/shopdata/updatecar.php",
							async:true,
							data:{userID:"run123",goodsID:v.goodsID,number:0},
							success:function(data){
								$('#wrapper').empty();
								getData();
							}
						});
					});
					//点击减号减少商品
					var ireduce = figure.find('.reduce');
					ireduce.on('touchstart',function(){
						$.ajax({
							type:"post",
							url:"http://datainfo.duapp.com/shopdata/updatecar.php",
							async:true,
							data:{userID:"run123",goodsID:v.goodsID,number:(v.number-1)},
							success:function(data){
								$('#wrapper').empty();
								getData();
							}
						});
					})
					//点击加号增加商品数量
					var iadd = figure.find('.add');
					iadd.on('touchstart',function(){
						$.ajax({
							type:"post",
							url:"http://datainfo.duapp.com/shopdata/updatecar.php",
							async:true,
							data:{userID:"run123",goodsID:v.goodsID,number:(parseInt(v.number)+1)},
							success:function(data){
								$('#wrapper').empty();
								getData();
								console.log(data)
							}
						});
					});
					
					//计算总价,总数量
					$('#wrapper').append(figure);
					total = total + parseInt(v.number);
					totalprice = totalprice+v.price*v.number;
						$('.total').text(total);
						$('.totalprice').text('￥'+totalprice);
						$('#f-shop i').text(total);
						myscroll.refresh();
						});
						}
						else{
							$('#content').empty();
							$('#content').append(`
							<h3>您的购物车空空如也~</h3>
							<img src="img/shopcar.jpg" class="kongimg"/>
							<a href="home.html" id="gobuy">去逛逛</a>`)
						}
					}
				});
			}
			
			$('#iback').click(function(){
				history.back()
			})