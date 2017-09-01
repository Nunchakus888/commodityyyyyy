
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

import { findFourSelect } from '../lib/api';
import { COMMODITY_CODE } from '../lib/constants';
export function linkageLevelData(level, id, levelModel = COMMODITY_CODE.divLevel) {
    if (id) {
        return findFourSelect(level, id)
            .then(r => {
                if (r.status === 200) {
                    switch (level) {
                        case 1:
                            levelModel.div = r.returnList;
                            levelModel.dep = [];
                            levelModel.class = [];
                            levelModel.subclass = [];
                            break;
                        case 2:
                            levelModel.dep = r.returnList;
                            levelModel.class = [];
                            levelModel.subclass = [];
                            break;
                        case 3:
                            levelModel.class = r.returnList;
                            levelModel.subclass = [];
                            break;
                        case 4:
                            levelModel.subclass = r.returnList;
                            break;
                        default:
                            console.log('我做了什么？િ🙄ી');
                    }
                } else {
                    levelModel.dep = [];
                    levelModel.class = [];
                    levelModel.subclass = [];
                    window.alert(r.msg || '获取分类信息失败');
                }
            })
            .catch(r => {
                levelModel.dep = [];
                levelModel.class = [];
                levelModel.subclass = [];
                window.alert(r.msg || '获取分类信息失败');
            });
    }
}

/**
 * code to 文本
 * @param listKey 状态列表key
 * @param status 状态值
 */
export function codeToLabel(listKey, status) {
    const item = COMMODITY_CODE[listKey].filter(i => i.value === status);
    if (item[0]) {
        return item[0].label;
    }
}