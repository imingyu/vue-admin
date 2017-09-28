import Enum from '../enum';
export default {
    'default': {
        url: '',
        host: 'default', //接口host名称（request url = host + api.url），通过host名称去'../../config.js'中取值
        method: Enum.requestMethods.GET,
        auth: true, //此接口是否需要登录才能正常请求成功
        jsonp: false //此接口是否以jsonp方式跨域发送
    },
    'user.login': {
        url: '/user/login',
        method: Enum.requestMethods.POST,
        auth: false
    },
    'art.list': {
        url: 'http://cnodejs.org/api/v1/topics',
        method: Enum.requestMethods.GET
    }
}