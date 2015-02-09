//应用配置文件
var path = require('path');
var local = require('./local');
var _ = require('underscore');
var config = {
    "title":"",
    //默认生产环境
    "env":"production",
    "appName": "<%= basename%>",
    //端口号配置
    "port": 3000,
    "host": 'http://localhost:7070/',
    //是否开启调试，调试的情况下会输出错误信息
    "debug": true,
    //模板所在的目录
    "viewDir": path.join(__dirname,'..','view'),
    "logDir": path.join(__dirname,'..', 'log'),
    //静态文件所在的目录
    "staticDir": path.join(__dirname,'..', 'public')
    <% if(db==="redis"){ %>
    ,"redis":{
        "host": 'localhost',
        "port": 6379
    }
    <% }%>

};

//当NODE_ENV环境变量值为local时
//本地调试环境
if(process.env.NODE_ENV == 'local'){
    config = _.extend(config,local);
}

module.exports = config;