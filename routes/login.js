const express = require('express');
const router  = express.Router();
const users   = require('../controllers/users/index');
const email   = require('../controllers/email/index');
/* GET home page. */
router.get('/', function(req, res, next) {
    console.log('----weixin callback -----')
    res.render('index.ejs',{
        result: {title:'hello world'}
    });
});
router.get('/login', function(req, res, next) {

    function brows($agent){//移动终端浏览器版本信息
        return {
            ios: !!$agent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
            android: $agent.indexOf('Android') > -1 || $agent.indexOf('Linux') > -1, //android终端或者uc浏览器
            iPhone: $agent.indexOf('iPhone') > -1 || $agent.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
            iPad: $agent.indexOf('iPad') > -1, //是否iPad
        }
    }
    $a=brows(req.headers['user-agent']);
    console.log($a);
    $url="";
    if ($a.iPad)//当ipad终端时
    {$url = 'login2.ejs';}
    else if ($a.iPhone)//当iphone终端时
    {$url = 'login2.ejs'; }
    else if ($a.ios)//当ios终端时
    {$url = 'login2.ejs'; }
    else if ($a.android) //当Android终端时
    {$url = 'login2.ejs';}
    else//否则
        $url = 'login.ejs';

    res.render($url);
});

router.get('/login/redirectTo', function(req, res, next) {
    res.json({"userInfo":req.session.userInfo});
});


router.post('/login',function (req,res,next) {
console.log(11111)
    users.login(req,res,next)
});
//这里getUser方法需要自定义


router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});

router.get('/register',function (req,res,next) {
    console.log("注册")
    res.render('register/step1.ejs');
});
router.get('/register/step2',function (req,res,next) {
    console.log("注册成功 2")
    if(req.session.username && req.session.email){
        res.render("register/step2.ejs",{"result":{"username":req.session.username,"email":req.session.email}})
    }else{
        res.redirect('/register');
    }

});
router.get('/register/step3',function (req,res,next) {
    console.log("注册成功 3");
    console.log(req.session.tokenInfo)
    if(req.session.tokenInfo !== undefined){
        console.log(1111)
        res.render('register/step3.ejs',{"result":req.session.tokenInfo});
    }else{
        res.redirect('/register');
    }

});


router.post('/register',function (req,res,next) {
    console.log("注册用户")
    users.register(req,res,next)
});

router.post('/checkUserName',function (req,res,next) {
    console.log("检查用户名是否存在")
    users.checkUserName(req,res,next)
});

router.post('/checkEmail',function (req,res,next) {
    console.log("检查邮箱是否存在")
    users.checkEmail(req,res,next)
});

router.post('/validationEmail',function (req,res,next) {
    console.log("重复发送验证码")
    email.rePostEmail(req,res,next)
});

router.get('/register/ActivateAccount',function (req,res,next) {
    console.log("邮箱验证码验证")
    email.checkEmailToken(req,res,next)
});


router.get('/forgetPwd',function (req,res,next) {
    console.log("忘记密码")
    res.render('forgetpwd/step1.ejs');
});

router.post('/forgetPwd',function (req,res,next) {
    console.log("email 找回密码")
    users.postPwdEmail(req,res,next)
});

router.get('/forgetPwd/step2',function (req,res,next) {
    console.log("取回密码 2")
    if(req.session.username && req.session.email){
        res.render("forgetPwd/step2.ejs",{"result":{"username":req.session.username,"email":req.session.email}})
    }else{
        res.redirect('/login');
    }
    res.render('forgetPwd/step2.ejs');
});

router.post('/validationEmailPwd',function (req,res,next) {
    console.log("重复发送验证码")
    email.rePostEmail(req,res,next)
});

router.get('/forgetPwd/reSetPassword',function (req,res,next) {
    console.log("邮箱验证码验证")
    email.checkEmailToken(req,res,next)
});


router.get('/forgetPwd/step3',function (req,res,next) {
    console.log("找回密码 3");
    console.log(req.session.tokenPwdInfo)
    if(req.session.tokenPwdInfo !== undefined){
        res.render('forgetPwd/step3.ejs',{"result":req.session.tokenPwdInfo});
    }else{
        res.render('forgetPwd/step3.ejs',{"result":false,"info":"未知错误"});
    }
});



module.exports = router;