import * as util from '../utils/index';
import * as UserApi from '../api/user'

export var isLogin = () => {
    return new Promise((resolve, reject) => {
        setTimeout(function() {
            resolve(getLoginUser() ? true : false);
        }, 0.1 * 1000)
    })
}

export var setLoginUser = (user, merge = true) => {
    if (user && typeof user === 'object') {
        var loginUser;
        if (merge) {
            loginUser = getLoginUser();
            if (loginUser) {
                util.extend(true, loginUser, user);
            }
        }
        if (!loginUser) {
            loginUser = user;
        }

        localStorage.setItem('$LoginUser', JSON.stringify(loginUser));
    }
}

export var getLoginUser = () => {
    var loginUser = localStorage.getItem('$LoginUser');
    if (loginUser) {
        try {
            loginUser = JSON.parse(loginUser);
        } catch (error) {
            loginUser = undefined;
        }
    }
    return loginUser;
}

export var login = loginModel => {
    return UserApi.login(loginModel).then(data => {
        setLoginUser(data);
        return data;
    })
}