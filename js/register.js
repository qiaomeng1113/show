function _register(){
				var username = $('#username').val();
				var password = $('#password').val();
				var repassword = $('#repassword').val();
				if(username==""){
					alert('用户名不能为空');
				}else if(password===repassword){
					var user = getUser(username,password);
					registerData(user);
				}else{
					alert('清确认两次输入密码是否一致');
				}
			}
			
			function getUser(username,password){
				var user = {
					userID:username,
					password:password
				};
				return user;
			}
			function registerData(user){
				$.ajax({
					type:"post",
					url:"http://datainfo.duapp.com/shopdata/userinfo.php",
					async:true,
					data:{status:'register',userID:user.userID,password:user.password},
					success:function(data){
						if(data==1){
							alert('注册成功')
						}else if(data==0){
							alert('该用户名已被注册，请重新输入')
						}else if(data==2){
							alert('发生了一些不可描述的错误，状态码550')
						}
					}
				});
			}
			
		$('#iback').click(function(){
						history.back()
					})