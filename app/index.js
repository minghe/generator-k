'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var KGenerator = module.exports = function KGenerator(args, options) {
    yeoman.generators.Base.apply(this, arguments);

    this.on('end', function () {
        this.installDependencies({ skipInstall: options['skip-install'] });
    });

    this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
    //目录名即项目名称
    this.basename = path.basename(process.cwd());
};

util.inherits(KGenerator, yeoman.generators.Base);

KGenerator.prototype.welcome = function () {
    // welcome message
    var welcome = '\n\n欢迎使用 k ！\n k 是koa工程构建器，自带必备优秀的koa中间件。\n';

    console.log(welcome);
};

KGenerator.prototype.ask = function(){
    var cb = this.async();
    //是否使用数据库
    var prompts = [{
        type: 'list',
        choices:['none','redis','mongodb'],
        name: 'db',
        message: 'use db :',
        default: 'none'
    }];

    this.prompt(prompts, function (props) {
        this.db = props.db;
        cb();
    }.bind(this));
};

KGenerator.prototype.app = function app() {
    this.mkdir('model');
    this.mkdir('public/js');
    this.mkdir('public/css');
    this.mkdir('test');
    this.mkdir('log');
    this.directory('config', 'config');
    this.directory('view', 'view');
    this.directory('controller', 'controller');
    this.directory('router', 'router');
    this.directory('test', 'test');

    this.template('_package.json', 'package.json');
    this.template('app.js', 'app.js');
};
