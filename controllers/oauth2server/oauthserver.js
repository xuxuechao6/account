'use strict';

// Register supported grant types.
//
// OAuth 2.0 specifies a framework that allows users to grant client
// applications limited access to their protected resources.  It does this
// through a process of the user granting access, and the client exchanging
// the grant for an access token.

const db          = require('../../models/clients');
const oauth2orize = require('oauth2orize');
const login       = require('connect-ensure-login');
const oauth2       = require('../../models/oauth2.0');



// create OAuth 2.0 server
const OAuth2Server = require('oauth2-server');



const oauth = new OAuth2Server({
    model: require('./model')
});

// const Request = OAuth2Server.Request;
// const Response = OAuth2Server.Response;
//
// let request = new Request({/*...*/});
// let response = new Response({/*...*/});
//
// exports.authorization = oauth.authorize(request, response)
//     .then((code) => {
//         // The resource owner granted the access request.
//     })
//     .catch((err) => {
//         if (err instanceof AccessDeniedError) {
//             // The resource owner denied the access request.
//         } else {
//             // Access was not granted due to some other error condition.
//         }
//     });




const checkLogin = async (req, res, next)=>{
    if (!req.session.user) {
        //   重新组装 登陆 的URL 并重定向到 登陆页面
         const result = await findClientInfo(req, res);
        const url = redirectLogin(req,res,result);
        res.redirect(url)
    }else{
        next();
    }


}

function redirectLogin(req,res,result) {
    let url = "";
    if (req.query.which==="error") {
        //错误页面  抛出错误
        return false;
    }else{   // 重定向URL    遇到错误抛出错误
        if(req.query.client_id!==result.client_id){
             url ='/account/oauth2.0/login?which=error&display='+req.session.display+'&error=100010&response_type='+req.query.response_type+'&client_id='+req.query.client_id+'&redirect_uri='+req.query.redirect_uri+'&scope='+req.query.scope
            console.log("redirect uri is illegal(100010)")

        }else if(req.query.redirect_uri!==result.redirect_uri){
             url ='/account/oauth2.0/login?which=error&display='+req.session.display+'&error=100010&response_type='+req.query.response_type+'&client_id='+req.query.client_id+'&redirect_uri='+req.query.redirect_uri+'&scope='+req.query.scope
            console.log("redirect uri is illegal(100010)")

        }else {
             url ='/account/oauth2.0/login?display='+req.session.display+'&response_type='+req.query.response_type+'&client_id='+req.query.client_id+'&redirect_uri='+req.query.redirect_uri+'&scope='+req.query.scope
        }
        return url;
    }
}

async function findClientInfo(req, res) {
    const result = await  oauth2.checkClientInfo(req.query.client_id)
    console.log("result333",result)
    if(result.length>0){
        return result[0];
    }else{
        //错误的client_id  抛出异常
        console.log("client_id未注册")
        res.render("error.ejs")
    }
}

async function checkClientInfo(req,res) {
    const result = await findClientInfo(req,res);
    const url =redirectLogin(req,res,result)
if(url){
       res.render("login.ejs")
}else{
    console.log("client_id未注册")
    res.render("error.ejs")
}

}


//==============================================
exports.checkClientInfo = checkClientInfo;
exports.checkLogin = checkLogin;
