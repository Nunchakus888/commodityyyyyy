import 'whatwg-fetch';

export const MIME_TYPE = {
    JSON: 'application/json'
};

const DEFAULT_OPTIONS = {
    method: 'GET',
    credentials: 'include',
    mode: 'cors',
    redirect: 'follow'
};

function _genFetchOptions(options) {
    return Object.assign({}, DEFAULT_OPTIONS, options);
}

function _fetch(url, options = {}) {
    const opt = _genFetchOptions(options);

    return fetch(url, opt)
        .then(function(response) {
            const json = response.json();
            if (response.ok) {
                return json;
            } else {
                return json.then(err => { throw err })
            }
        });
}

function _serialize(obj, prefix) {
    const arr = [];

    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            const val = obj[key];
            const newKey = prefix ? prefix + '[' + key + ']' : key;

            if (Array.isArray(val) || typeof val === 'object') {
                arr.push(_serialize(val, newKey));
            } else {
                arr.push(`${encodeURIComponent(newKey)}=${encodeURIComponent(val)}`);
            }
        }
    }

    return arr.join('&');
}

const HTTP = {
    /**
     * 以GET方式请求一个json资源
     * @param {String} url 请求的url
     * @param {Object} [query] 如提供，会作为query拼接在url中
     * @param {Object} [options] 其他Fetch API的init参数
     * @return {Promise}
     */
    get: (url, query, options = {}) => {
        options.method = 'GET';
        options.headers = {
            'Accept': MIME_TYPE.JSON
        };
        return _fetch(HTTP.genQueryUrl(url, query), options);
    },

    /**
     * 以POST方式请求一个json资源，并附加可选的json数据
     * @param {String} url 请求的url
     * @param {Object} [data] 如提供，会作为body传递 (application/json)
     * @param {Object} [options] 其他Fetch API的init参数
     * @return {Promise}
     */
    post: (url, data, options = {}) => {
        options.method = 'POST';
        options.headers = {
            'Accept': MIME_TYPE.JSON,
            'Content-Type': MIME_TYPE.JSON
        };
        options.body = JSON.stringify(data);

        return _fetch(url, options);
    },

    /**
     *
     * @param {String} input 请求资源的地址
     * @param {Object} [init] 配置参数
     * @return {Promise}
     */
    fetch: (input, init = {}) => {
        return _fetch(input, init);
    },

    genQueryUrl(url, data) {
        if (!data) {
            return url;
        }

        const index = url.indexOf('?');

        return url + (index !== -1 ? '&' : '?') + _serialize(data);
    }
};

export default HTTP;
