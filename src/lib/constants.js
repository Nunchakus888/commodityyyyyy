export const COMMODITY_CODE = {
    commodityDept: {
        1: 'PB',
        2: 'NB',
        3: 'EP'
    },
    isFreshSell: { //是否现制现售
        1: '是',
        0: '否'
    },
    isMateriel: { //是否物料
        1: '是',
        0: '否'
    },
    isDailyDist: { //是否日配
        1: '是',
        0: '否'
    },
    isPolymer: { //是否聚合品
        1: '是',
        0: '否'
    },
    isImport: { //是否进口
        1: '是',
        0: '否'
    },
    isSpecialSell: { //是否专卖
        10: '非专卖',
        20: '烟草专卖'
    },
    termCondition: { //储存条件
        1: '常温',
        2: '冷藏',
        3: '冷冻'
    },
    taxRate: { //进项税率
        '0.00': '0%',
        '11.00': '11%',
        '13.00': '13%',
        '17.00': '17%',
    },
    specType: { //规格类型
        1: '杯型',
        2: 'g重',
        3: '口味',
        4: '容量',
        5: '个数',
    },
    specUnit: { //规格类型
        1: '袋',
        2: '盒',
        3: '听',
        4: '罐',
        5: '个',
        6: '瓶',
        7: '件',
        8: '杯',
        9: '碗',
    },
    commodityStatus: [ //商品状态
        {value: '40', label: '售卖中'},
        {value: '30', label: '冻结'},
        {value: '20', label: '紧急下架'},
        {value: '10', label: '下架'},
    ],
    divLevel: {
        div: [],
        dep: [],
        class: [],
        subclass: [],
    },
    attributeVOList: {
        attrType: {
            1: '冰度',
            2: '糖度',
        },
        '冰度': {
            10: '加冰',
            12: '去冰',
        },
        '糖度': {
            20: '全糖',
            21: '半糖'
        },
    },
};
export const REGEXP = {
    zhCn_en_num: /^[a-z0-9A-Z\u4e00-\u9fa5]+$/, //中英文数字
    en_num: /^[a-z0-9A-Z]{1,13}$/, //数字字母长度1-13
    en_num_code: /^[a-z0-9A-Z]{13}$|^[a-z0-9A-Z]{6}$/, //数字字母长度6/13位
    num_code: /^[0-9]{13}$|^[0-9]{6}$/, //数字长度6/13位
    num_6_up: /^[0-9]{5}\d+$/, //6+位数字.
    num_6_to_13: /^[0-9]{6,13}$/, //6-13位数字.
    int_code: /^\d+$/, //整数
    zh_en_num_len: /^[\u4e00-\u9fa5]{1,7}$|^[\dA-Za-z_]{1,14}$/,
};
export default {
    REGEXP,
    COMMODITY_CODE,
};