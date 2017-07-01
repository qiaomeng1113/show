$(function(){
				getUser();
			})
			function getUser(){
				var data = localStorage.getItem('token');
				if(data!=null){
					data = JSON.parse(data);
					$('#nickname').text(data.username);
					$('.lo').empty().append('<a href="javascript:;" onclick="zhuxiao()">注销</a>')
				}
			}
			
			function zhuxiao(){
				localStorage.removeItem('token');
				$('#nickname').text('未知');
				$('.lo').empty().append('<a href="login.html">登录</a><a href="register.html">注册 </a>')
			}
			$('#iback').click(function(){
				history.back()
			})