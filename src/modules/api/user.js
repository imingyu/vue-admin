import * as ApiHelper from './helper.js';
export var login = loginModel => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(Object.assign({}, loginModel, {
                id: 1
            }));
        }, 3 * 1000)
    })
}

export var getList = ApiHelper.createApiRequest('user.list');

//使用
var request = getList({
    pageNo: 1,
    pageSize: 10
}).then(data => {
    data.forEach(item => {
        console.log(item);
    });
});
request.abort(); //终止发送