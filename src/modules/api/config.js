import Enum from '../enum';
export default {
    'user.login': {
        url: '/user/login',
        method: Enum.requestMethods.POST
    },
    'art.list': {
        url: 'http://cnodejs.org/api/v1/topics',
        method: Enum.requestMethods.GET
    }
}