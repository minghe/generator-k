## generator-k

generator-k 是 简单的koa项目工程生成器，带有经过筛选的优秀中间件，比如

* koa-router ：路由中间件
* koa-generic-session ： session中间件
* koa-bodyparser ：body 解析中间件
* koa-onerror ：错误处理中间件
* ...

可以选择基于的数据库 redis 或 mongodb，默认为 none。

使用 [xtemplate](https://github.com/xtemplate/xtemplate/blob/master/docs/syntax-cn.md) 模板引擎，xtemplate是非常优秀的模板引擎，性能和拓展性都出类拔萃。

### 安装

    npm install -g yo generator-k

### 生成工程

    yo k
    
生成的目录结构如下：

    .
    ├── controller
    │   └── index.js 
    ├── router
    │   └── index.js
    ├── model
    ├── config
    |   ├── config
    |   └── local 
    ├── public
    |   ├── js
    |   └── css 
    ├── test
    |   └── index-router-spec.js
    ├── view
    |   ├── index.xtpl
    |   └── layout
    ├── app.js
    └── package.json

### 运行服务

NodeJS 必须 >= v0.11.3

    npm start
    
运行的命令等价于：

    NODE_ENV=local DEBUG=xxx node --harmony app.js
    
二个环境变量：

* NODE_ENV 用于配置应用环境，local 为本地调试环境，会使用config/local.js的配置项
* DEBUG 为 debug 模块使用，用于输出调试信息
    
### 测试用例

    npm test