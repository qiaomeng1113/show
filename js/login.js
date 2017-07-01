//打开页面时
$(function(){
	var data = localStorage.getItem("token");
	if(data&&data!=''){
		$('#username').val(JSON.parse(data).username);
		$('#password').val(JSON.parse(data).password);
	}
})

function _login(){
				var username = $('#username').val();
				var password = $('#password').val();
				var user = getUser(username,password);
				if(username===''){
					alert('请输入账号')
				}else if(password ===''){
					alert('请输入密码')
				}else{
				var user = getUser(username,password);
					loginData(user);
					
					
				}
			}
			
			function getUser(name,password){
				var user = {
					username:name,
					password:password
				}
				return user;
			}
			
			function loginData(user){
				var check = $('#rbpassword').attr('checked');
				$.ajax({
					type:"post",
					url:"http://datainfo.duapp.com/shopdata/userinfo.php",
					data:{status:'login',userID:user.username,password:user.password},
					async:true,
					success:function(data){
						if(data==0){
							console.log('用户名不存在!')
						}else if(data==2){
							console.log('密码错误！')
						}else{
							console.log('登录成功!');
							console.log(check);
							window.location.href = "myshow.html";
							if(check){
								var str = JSON.stringify(user);
								localStorage.setItem("token",str);
							}
							
							
						}
					}
				});
			}
			$('#iback').click(function(){
				history.back()
			})