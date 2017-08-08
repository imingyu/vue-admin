//import Enum from './modules/enum.js';
var env = process.env.NODE_ENV,
    config = {};

/**
 * ApiHost说明
 * 发送api request前，将会读取apiHost的值，然后与api的url拼接得到完整的api request url；
 * 在api配置中，host配置项无，则默认读取apiHost['default']的值，否则读取apiHost[apiConfig.host]
 * 如果api接口是部署在一个服务器的，则不用改下面的配置，否则
 * 可针对不同api服务器起不同的名字，然后作为apiHost的key，之后在配置api信息时，加入host配置项，并指定值
 * 这样框架会做自动处理
 */
var apiHost = {
    'default': {
        development: '',
        production: '',
        testing: ''
    }
};
Object.keys(apiHost).forEach(key => {
    apiHost[key] = apiHost[key][env];
});

export default config;