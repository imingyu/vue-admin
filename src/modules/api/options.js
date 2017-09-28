import Qs from 'qs';
import Enum from '../enum';

export default {
    'default': {
        paramsSerializer: function(params) {
            return Qs.stringify(params, { arrayFormat: 'brackets' })
        }
    },
    [Enum.GET]: {},
    [Enum.POST]: {
        headers: {
            Accept: '*/*',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        transformRequest: [function(data) {
            return Qs.stringify(data);
        }]
    },
    [Enum.DELETE]: {
        headers: {
            'Content-Type': 'application/json'
        }
    },
    [Enum.PUT]: {
        headers: {
            'Content-Type': 'application/json'
        }
    }
}