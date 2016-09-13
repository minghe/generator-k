var router = require('koa-router')();
var controller = require('../controller/index');
module.exports = function(){
    //首页
    router.get('/',controller.index);
    return router;
};