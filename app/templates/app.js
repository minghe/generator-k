var debug = require('debug')('<%=basename%>');
var koa = require('koa');
//配置文件
var config = require('./config/config');

var app = koa();
app.use(function *(next){
    //config 注入中间件，方便调用配置信息
    if(!this.config){
        this.config = config;
    }
    yield next;
});

//log记录
var Logger = require('mini-logger');
var logger = Logger({
    dir: config.logDir,
    format: 'YYYY-MM-DD-[{category}][.log]'
});

//router use : this.logger.error(new Error(''))
app.context.logger = logger;

var onerror = require('koa-onerror');
onerror(app);

//xtemplate对koa的适配
var xtplApp = require('xtpl/lib/koa');
//xtemplate模板渲染
xtplApp(app,{
    //配置模板目录
    views: config.viewDir
});

<% if(db==="redis"){ %>
var redisStore = require('koa-redis')(config.redis);
app.redis = redisStore.client;
<% }%>

<% if(db==="none"){ %>
var session = require('koa-session');
app.use(session(app));
<% }else{%>
//session中间件
var session = require('koa-generic-session');
<% if(db==="mongodb"){ %>
var MongoStore = require('koa-sess-mongo-store');
var sessionConfig = {
    store: new MongoStore(),
    prefix: '<%=basename%>:sess:',
    key: '<%=basename%>.sid'
};
<%}else if(db==="redis"){%>
    var sessionConfig = {
    store: redisStore,
    prefix: '<%=basename%>:sess:',
    key: '<%=basename%>.sid'
    };
<%}%>
app.use(session(sessionConfig));
<% }%>

//post body 解析
var bodyParser = require('koa-bodyparser');
app.use(bodyParser());
//数据校验
var validator = require('koa-validator');
app.use(validator());

//静态文件cache
var staticCache = require('koa-static-cache');
var staticDir = config.staticDir;
app.use(staticCache(staticDir+'/js'));
app.use(staticCache(staticDir+'/css'));

//路由
var router = require('koa-router');
app.use(router(app));

//应用路由
var appRouter = require('./router/index');
appRouter(app);

app.listen(config.port);
console.log('listening on port %s',config.port);

module.exports = app;

