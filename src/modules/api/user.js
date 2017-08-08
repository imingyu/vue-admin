export var login = loginModel => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(Object.assign({}, loginModel, {
                id: 1
            }));
        }, 3 * 1000)
    })
}