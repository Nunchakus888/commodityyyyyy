export const COMMODITY_CODE = {
    commodityDept: {
        1: 'PB',
        2: 'NB',
        3: '设备'
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
        1: '是',
        0: '否'
    },
    termCondition: { //储存条件
        1: '常温',
        2: '冷藏',
        3: '冷冻'
    },
    taxRate: { //进项税率
        0: '0%',
        11: '11%',
        13: '13%',
        17: '17%',
    },
    specType: { //规格类型
        1: '杯型',
        2: 'g重',
        3: '口味',
        4: '容量',
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
    commodityStatus: { //商品状态
        40: '售卖中',
        30: '冻结',
        20: '紧急下架',
        10: '下架',
    },
    divAndClass: {
        div: {
            10: '快速食品',
            20: '米饭寿司'
        },

        10: {
            100: '炸物',
            101: '包子'
        },
        100: {
            1000: '微波炸物',
            1001: '其他炸物',
        },
        1000: {
            10000: '鸡肉',
            10001: '猪肉',
        },
    },
    attributeVOList: {
        attrType: {
            1: '冰度',
            2: '糖度',
        },
        1: {
            10: '加冰',
            11: '少冰',
            12: '去冰',
        },
        2: {
            20: '高',
            21: '中',
            22: '低',
        },
    },
};
export const REGEXP = {
    zhCn_en_num: /^[a-z0-9A-Z\u4e00-\u9fa5]+$/, //中英文数字
    en_num: /^[a-z0-9A-Z]{1,13}$/, //数字字母长度1-13
    en_num_code: /^[a-z0-9A-Z]{13}$|^[a-z0-9A-Z]{6}$/, //数字字母长度6/13位
    num_code: /^[0-9]{13}$|^[0-9]{6}$/, //数字长度6/13位
};
export default {
    REGEXP,
    COMMODITY_CODE,
};