
const validationEmail = require('../../middlewares/validationemail');
const email = require('../../models/index').email;
const activeEmail = require('../../middlewares/activeemail');

const rePostEmail =function (req,res,next) {
    // 创建一个邮件对象
    const _email = req.body.email
    // const _username = req.body.username
    const _username = req.body.username
    console.log("_email:",_email)
    console.log("_username:",_username)

    const getToken = activeEmail.getToken(_email);
    const postEmail = email.postEmail("register")
        .then(email)
    Promise.all([
        getToken,
        postEmail
    ]).then(([token,email]) =>{
        console.log("token:",token)
        console.log("email:",email)
        if (email.length >0 && token !== null) {
            const url = req.headers.origin+"/register/ActivateAccount?token="+token
            const _text = email[0].text.replace(/url/, url)
            let mail = {
                from:'"'+email[0].from_username+'"'+email[0].from_email, // 发件人
                subject: email[0].subject,// 主题
                to: _email,// 收件人
                text: '亲爱的用户 '+_username+'：您好！\n' + _text// 邮件内容，HTML格式
            };
            validationEmail.sendEmail(mail)
                .then(result => {
                    console.log("result",result)
                    if (result != null) {
                        res.json({"result": {"status": true,code:"250"}})
                    } else {
                        res.json({"result": {"status": false,code:""}})
                    }
                })
                .catch(err => {
                    console.log("系统错误！！！" , err)
                    console.log("errCode" , err.responseCode)
                    res.json({"result": {"status": false,"code":err.responseCode,"response":err.response}})
                });
        }
    })
}

const checkEmailToken = function (req,res,next) {
    if (req.query.token){
        checkToken(req,res,next)
    }
}

async function checkToken(req,res,next) {
    const result = await activeEmail.checkToken(req.query.token);
    console.log(result,"req.query.token")
    if(result){
        req.session.tokenInfo = true
        const result2 = await activeEmail.activeAccount(req.query.token);
        if(result2){
            res.redirect("/register/step3")
        }else{
            req.session.tokenInfo = false
            res.redirect("/register/step3")
            console.log("系统错误")
        }

    }else{
        req.session.tokenInfo = false
        res.redirect("/register/step3")
    }
}
exports.rePostEmail = rePostEmail;
exports.checkEmailToken = checkEmailToken;