
export function isArray(obj) {
    return Array.isArray(obj);
}

export function isObject(obj) {
    return Object.prototype.toString.call(obj) === '[object Object]';
}

export function parseQuery(search) {
    return search.slice(1).split('&')
        .map(seg => seg.split('='))
        .map(pair => pair.map(decodeURIComponent))
        .reduce((map, pair) => (map[pair[0]] = pair[1], map), {});
}
