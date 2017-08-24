
import 'whatwg-fetch';
import {
    serialize,
} from '@lib/url';

const BODY_TYPE = {
    FORM_DATA: 'multipart/form-data',
    URL_SEARCH_PARAMS: 'application/x-www-form-urlencoded;charset=UTF-8',
    PLAIN: 'text/plain;charset=UTF-8',
    JSON: 'application/json',
};

const HTTP = {
    DEFAULT_PARAMS: {
        method: 'GET',
        contentType: BODY_TYPE.JSON,
        credentials: 'include',
    },

    request: (options) => {
        HTTP._fetch(options);
    },

    get: (options) => {
        options.method = 'GET';

        HTTP._fetch(options);
    },

    post: (options) => {
        options.method = 'POST';

        HTTP._fetch(options);
    },

    _fetch: (options = {}) => {
        console.log('options-----', options);

        const opt = HTTP.genRequestParams(options);

        fetch(opt.url, opt.params)
            .then(function(response) {
                const json = response.json();

                if (response.ok) {
                    return json;
                } else {
                    return json.then(err => { throw err });
                // let error = new Error(response.msg);
                // error.response = response;
                // throw error;
                }
            }).then(function(response) {
                options.success && options.success(response);
            }).catch(function(error) {
                options.error && options.error(error);
                console.log('There has been a problem with your fetch operation: ' + error.message);
            });
    },

    genRequestParams(options) {
        const opt = Object.assign({}, HTTP.DEFAULT_PARAMS, options);

        const headers = HTTP.genHeader(opt);
        const method = opt.method.toUpperCase();

        let url = opt.url || '';
        let body;

        if (method === 'GET') {
            url = HTTP.genQueryString(url, opt.data);
        }

        if (method === 'POST') {
            body = HTTP.genBody(opt);
        }

        return {
            url: url,
            params: {
                method: method,
                mode: opt.mode,
                headers: headers,
                credentials: opt.credentials || 'include',
                body: body,
            },
        };
    },

    genHeader(options) {
        const headers = new Headers({
            'Content-Type': options.contentType,
        });

        // if (options.xxx) {
        //     headers.append('xxx', xx);
        // }

        return headers;
    },

    genQueryString(url, data) {
        if (!data) {
            return url;
        }

        const index = url.indexOf('?');

        return url + (index !== -1 ? '&' : '?') + serialize(data);//TODO:暂简单处理
    },

    genBody({ data, contentType }) {
        // json format
        if (contentType === BODY_TYPE.JSON) {

            return (typeof data === 'string') ?
                data :
                JSON.stringify(data || {});
        }

        // url search params format
        if (contentType === BODY_TYPE.URL_SEARCH_PARAMS) {
            return serialize(data);
        }

        // 其他类型直接返回
        // TODO: 后面加上其他类型的处理
        return data;
    },
};

export default HTTP;
