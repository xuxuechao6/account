var user = $('.username');
var password = $('.password');
var userInfo = $('.usernameInfo');
var passwordInfo = $('.passwordInfo');
function checkUser() {
    if(user.val() === ""){
        passwordInfo.text("")
        userInfo.text("请输入用户名")
        user.focus()
    }else if (password.val() === ""){
        userInfo.text("")
        passwordInfo.text("请输入密码")
        password.focus()
    }else{
        userInfo.text("")
        passwordInfo.text("")
        $("#TencentCaptcha").click();
    }
}
user.keydown(function(event){
    if(event.keyCode==13){
        checkUser();
    }
});
password.keydown(function(event){
    if(event.keyCode==13){
        checkUser();
    }
});

