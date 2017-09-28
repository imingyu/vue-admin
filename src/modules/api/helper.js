import axios from 'axios';
import * as util from '../utils/index';
import $config from '$config';
import { method, envType } from './var.js';
import apiConfig from './config.js';

function isFormatUrl(url) {
    return url.indexOf('{') != -1 && url.indexOf('}') != -1;
}

function formatUrl(url, dataModel, options) {
    if (!options.hasOwnProperty('removeFormatModelProp')) {
        //默认移除datamodel中的已经在url中使用的format属性
        options.removeFormatModelProp = true;
    }
    if (isFormatUrl(url)) {
        if (dataModel) {
            Object.keys(dataModel).forEach(function(key) {
                var varName = '{' + key + '}';
                if (url.indexOf(varName) != -1) {
                    url = url.replace(new RegExp(varName, 'gm'), dataModel[key]);
                    //格式化url后是否将datamodel中的对应属性移除
                    if (options.removeFormatModelProp) {
                        delete dataModel[key];
                    }
                }
            });
        } else {
            url.split('{').forEach(function(item) {
                if (item.indexOf('}') === item.length - 1) {
                    url = url.replace('{' + item, '');
                }
            });
        }
        return url;
    } else {
        return url;
    }
}

/**
 * 继承默认配置
 * @param {any} ops 配置对象
 * @returns 返回继承后的配置
 */
function extendDefaultOptions(ops) {
    if (typeof ops != 'object') {
        ops = {};
    }
    return util.extend(true, {}, defaultAjaxOptions[(ops.method || method.Get)], ops);
}

function addUrlPrefix(envType, url) {
    return $config.apiUrlPrefix[envType] + url;
}

/**
 * 根据环境配置返回配置项中不同的url值
 *
 * @param {any} ops 配置对象
 * @param {any} apiEnvType 环境类型
 * @returns
 */
function adaptUrl(ops, apiEnvType) {
    if (typeof ops.url === 'string') {
        return ops.url;
    } else if (typeof ops.url === 'object') {
        ops.url = util.extend(true, {}, {
            rtm: addUrlPrefix(envType.Production, ''),
            testing: addUrlPrefix(envType.Testing, ''),
            dev: addUrlPrefix(envType.Development, ''),
        }, ops.url);
    }

    return ops.url[apiEnvType] || ops.url[envType.Production] || ops.url[envType.Development] || ops.url[envType.Static];
}

function adaptModel(apiName, model, options) {
    if (typeof model === 'object') {
        if (!model._mt) {
            if (!options._mt) {
                model._mt = apiName;
            } else {
                model._mt = options._mt;
            }
        }

        if (typeof model._aid === 'undefined') {
            if (!options._aid) {
                model._aid = '1';
            } else {
                model._aid = options._aid;
            }
        }
    }
}

/**
 * 根据环境类型将配置对象做不同适应
 * Production：必须获取production对应的url，method也不会变；
 * Development：先获取Development的url，没有在获取Static的url
 * Static：获取Static对应的url，并改变method为GET
 * @param {any} options 配置对象
 * @returns 适应后的配置对象
 */
function adaptEnv(options, dataModel, apiName) {
    adaptModel(apiName, dataModel, options);

    if (typeof dataModel === 'object' && dataModel != null) {
        options.url = formatUrl(options.url, dataModel, options);
        if (options.method !== method.Get) {
            options.data = options.data || {};
            util.extend(true, options.data, dataModel);
            //options.data = JSON.stringify(options.data);
        } else if (options.method === method.Get) {
            options.params = options.params || {};
            options.params = util.extend(true, {}, options.params, dataModel);
        }
    } else if (options.method === method.Get) {
        options.params = options.params || {};
        options.params = util.extend(true, {}, options.params, dataModel);
    } else {
        options.data = dataModel;
    }

    return options;
}

/**
 * 根据apiName获取api的配置
 *
 * @param {any} apiName
 * @param {any} otherOptions 其他的配置信息
 * @returns apiName的配置与otherOptions的合并
 */
function getApiOptions(apiName, otherOptions, dataModel) {
    var options = {};
    if (typeof apiName === 'string') {
        if (!apiConfig.hasOwnProperty(apiName)) {
            console.warn('[Api Warning]没有在API列表中查找到名称为"' + apiName + '"的接口配置，已将"' + apiName + '"作为默认url。');
            options = {
                apiName: apiName,
                url: apiName
            };
        } else {
            options = util.extend(true, {}, apiConfig[apiName]);
            options.apiName = apiName;
        }
    } else if (typeof apiName === 'object' && apiName.url) {
        options = util.extend(true, {}, apiName);
    } else {
        throw new TypeError('[Api Error]没有在API列表中查找到' + JSON.stringify(apiName) + '有关的配置');
    }

    if (typeof otherOptions === 'object') {
        options = util.extend(true, options, otherOptions);
    }

    if ($config.env === 'production') {
        options.url = adaptUrl(options, envType.Production);
    } else {
        var apiEnvType = options.apiEnvType || $config.apiEnvType;
        if (apiEnvType === 'static' && options.url['static']) {
            options.method = method.Get;
        }
        options.url = adaptUrl(options, apiEnvType || envType.Development);
    }

    options = extendDefaultOptions(options);
    options = adaptEnv(options, dataModel, apiName);
    return options;
}

function defaultCheckResolve(data, xhr) {
    if (!data || !data.stat || data.stat.code != 0) {
        return false;
    }
}

function defaultTransformResolve(data, xhr) {
    if (data && data.stat && data.stat.code == 0) {
        if (typeof data.content === 'object') {
            data.content._source = data;
        }
        return data.content;
    }
};

function defaultTransformReject(data, xhr, requestError) {
    if (data && data.stat && data.stat.code != 0) {
        var stateList = data.stat.stateList,
            stateError = stateList && stateList.length > 0 ? stateList[0] : {
                code: 'unkown.stat',
                msg: '未知错误'
            };
        return {
            code: stateError.code,
            message: stateError.msg,
            _source: data
        };
    } else if (!data && xhr) {
        if (xhr.status === 0 && xhr.statusText !== 'NO-LOGIN') {
            return {
                code: 0,
                message: '无法连接到服务器，或者链接超时！'
            };
        } else if (xhr.responseText && xhr.responseText.indexOf('<!DOCTYPE') != -1) {
            return {
                code: xhr.status || 500,
                message: '服务器错误'
            };
        } else {
            return {
                code: xhr.statusText === 'NO-LOGIN' ? '401' : xhr.status,
                message: (xhr.responseText || xhr.statusText) === 'NO-LOGIN' ? '你还未登录，或者登录已超时，请重新登录！' : (xhr.responseText || xhr.statusText)
            };
        }
    } else if (requestError) {
        return {
            code: 'unkown.request',
            message: requestError.message
        };
    } else {
        return {
            code: 'unkown',
            message: '未知错误'
        };
    }
};

/**
 * 根据API配置创建一个可发送request的函数
 *
 * @param {any} apiName api name
 * @param {any} checkResolve 判断请求返回的的结果是通过的函数
 * @param {any} transformResolve 转换返回的结果为通过函数使用的数据
 * @param {any} transformReject 转换返回的结果为拒绝函数使用的数据
 * @returns
 */
function createApiRequest(apiName, checkResolve, transformResolve, transformReject) {
    checkResolve = typeof checkResolve === 'function' ? checkResolve : defaultCheckResolve;
    transformResolve = typeof transformResolve === 'function' ? transformResolve : defaultTransformResolve;
    transformReject = typeof transformReject === 'function' ? transformReject : defaultTransformReject;
    return function(dataModel, otherAjaxOptions, filterResolveDate) {
        var ops = getApiOptions(apiName, otherAjaxOptions, dataModel);
        ops.checkResolve = checkResolve;
        ops.transformResolve = transformResolve;
        ops.transformReject = transformReject;
        return sendApiRequest(ops, filterResolveDate);
    }
}

function sendApiRequest(requestOptions, filterResolveDate) {
    var ops = requestOptions,
        checkResolve = typeof ops.checkResolve === 'function' ? ops.checkResolve : defaultCheckResolve,
        transformResolve = typeof ops.transformResolve === 'function' ? ops.transformResolve : defaultTransformResolve,
        transformReject = typeof ops.transformReject === 'function' ? ops.transformReject : defaultTransformReject;
    return new Promise(function(resolve, reject) {
        axios.request(ops).then(function(response) {
            var data = response.data,
                rejectData = transformReject(data, response),
                resolveData = transformResolve(data, response);
            if (checkResolve(data, response) === false) {
                reject(rejectData);
            } else {
                if (typeof filterResolveDate === 'function') {
                    resolveData = filterResolveDate(resolveData);
                }
                resolve(resolveData, data);
            }
        }).catch(function(error) {
            reject(transformReject(null, null, error));
        });
    });
}

function getApiReturnMessage(apiReturnData) {
    if (apiReturnData && apiReturnData.message) {
        return apiReturnData.message;
    }
}

function getApiErrorMessage(apiReturnData) {
    return '错误码：' + (apiReturnData ? apiReturnData.code || '未知' : '未知') + '<br />错误消息：' + (getApiReturnMessage(apiReturnData) || '未知错误');
}

exports.defaultAjaxOptions = defaultAjaxOptions;
exports.getApiOptions = getApiOptions;
exports.createApiRequest = createApiRequest;
exports.getApiReturnMessage = getApiReturnMessage;
exports.getApiErrorMessage = getApiErrorMessage;
exports.sendApiRequest = sendApiRequest;