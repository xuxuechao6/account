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
    res.render('login.ejs');
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
    console.log("注册成功")
    if(req.session.username && req.session.email){
        res.render("register/step2.ejs",{"result":{"username":req.session.username,"email":req.session.email}})
    }else{
        res.redirect('/register');
    }

});
router.get('/register/step3',function (req,res,next) {
    console.log("注册成功");
    console.log(req.session.tokenInfo)
    if(req.session.tokenInfo !== undefined){
        console.log(1111)
        res.render('register/step3.ejs',{"result":req.session.tokenInfo});
    }else{
        res.redirect('/register');
    }

});


router.post('/register',function (req,res,next) {
    console.log("注册")
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

module.exports = router;