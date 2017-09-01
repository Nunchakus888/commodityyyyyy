<template>
    <div>
        <container>
            <div id="app" slot="content">
                <main>
                    <div class="form-header">
                        <h1>查看商品</h1>
                    </div>
                    <el-form label-width="100px" ref="mainForm">
                        <el-row>
                            <el-col :span="10">
                                <el-form-item label="商品名称:">
                                    <label v-text="commodity.commodityName"></label>
                                </el-form-item>
                            </el-col>
                            <el-col :span="10">
                                <el-form-item label="商品简称:">
                                    <label v-text="commodity.commodityShort"></label>
                                </el-form-item>
                            </el-col>
                        </el-row>

                        <!--<el-row>
                            <el-col :span="8">
                                <el-form-item label="SPUID:">
                                    <label v-text="commodity.spuId"></label>
                                </el-form-item>
                            </el-col>
                        </el-row>-->

                        <div class="title-line"><span>基本信息</span></div>

                        <el-row>
                            <el-col :span="10">
                                <el-form-item label="产品部门:">
                                    <label v-text="COMMODITY_CODE.commodityDept[commodity.commodityDept]"></label>
                                </el-form-item>
                            </el-col>

                            <el-col :span="10">
                                <el-form-item label="进口标志:" prop="isImport">
                                    <label v-text="COMMODITY_CODE.isImport[commodity.isImport]"></label>
                                </el-form-item>
                            </el-col>

                            <el-col :span="10">
                                <el-form-item label="专卖:">
                                    <label v-text="COMMODITY_CODE.isSpecialSell[commodity.isSpecialSell]"></label>
                                </el-form-item>
                            </el-col>

                            <el-col :span="10">
                                <el-form-item label="现制现售:">
                                    <label v-text="COMMODITY_CODE.isFreshSell[commodity.isFreshSell]"></label>
                                </el-form-item>
                            </el-col>

                            <div>
                                <el-col :span="10">
                                    <el-form-item label="物料:">
                                        <label v-text="COMMODITY_CODE.isMateriel[commodity.isMateriel]"></label>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="10">
                                    <el-form-item label="日配:">
                                        <label v-text="COMMODITY_CODE.isDailyDist[commodity.isDailyDist]"></label>
                                    </el-form-item>
                                </el-col>
                            </div>
                        </el-row>

                        <el-row>
                            <el-col :span="10">
                                <el-form-item label="存储条件:">
                                    <label v-text="COMMODITY_CODE.termCondition[commodity.termCondition]"></label>
                                </el-form-item>
                            </el-col>
                            <el-col :span="10">
                                <el-form-item label="进项税率:">
                                    <label v-text="COMMODITY_CODE.taxRate[commodity.taxRate]"></label>
                                </el-form-item>
                            </el-col>
                        </el-row>

                        <div class="title-line"></div>

                        <el-row v-for="item, index in commodity.commoditySkuVO" :key="index">
                            <el-col :span="20">
                                <el-form-item label="规格类型:">
                                    <label v-text="item.specType"></label>
                                </el-form-item>
                            </el-col>

                            <div v-for="unit, index2 in item.skuMemberList" :key="index2">
                                <el-col :span="10">
                                    <el-form-item label="商品状态:">
                                        <label v-text="codeToLabel('commodityStatus', unit.commodityStatus)"></label>
                                    </el-form-item>
                                </el-col>

                                <el-col :span="10">
                                    <el-form-item label="商品编码:">
                                        <label v-text="unit.skuId"></label>
                                    </el-form-item>
                                </el-col>

                                <el-col :span="10">
                                    <el-form-item label="规格:">
                                        <label v-text="unit.specValue"></label>
                                    </el-form-item>
                                </el-col>

                                <el-col :span="10">
                                    <el-form-item label="单位:">
                                        <label v-text="unit.specUnit"></label>
                                    </el-form-item>
                                </el-col>

                                <el-col :span="10">
                                    <el-form-item label="体积:">
                                        <label v-text="`${unit.specVolume[0] || 0} x ${unit.specVolume[1] || 0} x ${unit.specVolume[2] || 0} mm³`"></label>
                                    </el-form-item>
                                </el-col>

                                <el-col :span="21" v-if="unit.commodityEan && unit.commodityEan.length">
                                    <el-form-item label="条码:">
                                        <span :key="i" class="ean-code" v-for="tag, i in unit.commodityEan">{{ tag }}</span>
                                    </el-form-item>
                                </el-col>

                                <el-col :span="24">
                                    <div class="title-line"><span v-if="index2 + 1 === item.skuMemberList.length">分类信息</span></div>
                                </el-col>
                            </div>

                        </el-row>

                        <el-row>
                            <el-col :span="5">
                                <el-form-item label="div:">
                                    <label v-text="commodity.divName"></label>
                                </el-form-item>
                            </el-col>

                            <el-col :span="5">
                                <el-form-item label="dep:">
                                    <label v-text="commodity.depName"></label>
                                </el-form-item>
                            </el-col>

                            <el-col :span="5">
                                <el-form-item label="class:">
                                    <label v-text="commodity.className"></label>
                                </el-form-item>
                            </el-col>

                            <el-col :span="5">
                                <el-form-item label="subclass:">
                                    <label v-text="commodity.subclassName"></label>
                                </el-form-item>
                            </el-col>
                        </el-row>

                        <el-row v-for="item, index in commodity.attributeVOList" :key="index">
                            <el-col :span="10">
                                <el-form-item label="属性类型:">
                                    <label v-text="item.attrType"></label>
                                </el-form-item>
                            </el-col>

                            <el-col :span="10">
                                <el-form-item label="属性标签:">
                                    <label v-for="i, k in item.attrValue" v-text="i" :key="k"></label>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row v-if="commodity.pictureUrl">
                            <el-col :span="24">
                                <div class="title-line"><span v-if="commodity.pictureUrl">商品图片</span></div>
                            </el-col>

                            <el-col :span="5">
                                <el-form-item :span="5" label="商品图片">
                                    <div class="commodity-image">
                                        <img :src="commodity.pictureUrl" @click="originalImage = commodity.pictureUrl;showImage = true" class="avatar-uploader-icon"/>
                                    </div>
                                </el-form-item>
                            </el-col>
                        </el-row>

                        <div v-if="showImage" class="big-image-container" @click="showImage = false">
                            <div class="image-overlayer">
                                <i class="el-icon-close close-button"></i>
                            </div>
                            <div class="big-image-container">
                                <img :src="originalImage"/>
                            </div>
                        </div>

                        <div class="title-line"><span>操作日志</span></div>
                    </el-form>

                    <el-row class="log-table">
                        <el-col :span="2" :offset="1">
                            日志
                        </el-col>

                        <el-col :span="12">
                            <el-table :data="operationsLog">
                                <el-table-column prop="operation" label="性质"></el-table-column>
                                <el-table-column prop="operator" label="最终作业人"></el-table-column>
                                <el-table-column prop="time" label="最终作业时间">
                                    <template scope="scope">
                                        <span>{{ mmToY4M2D2TH2M2S2(scope.row.time) }}</span>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </el-col>
                    </el-row>

                    <el-row type="flex" justify="center">
                        <el-col :span="3">
                            <el-button class="submit-btn" type="primary" @click="commodityList()">返回商品列表</el-button>
                        </el-col>
                    </el-row>
                </main>
            </div>
        </container>
    </div>
</template>
<script>
    import { COMMODITY_CODE } from '../../lib/constants';
    import { codeToLabel } from '../../lib/utils';
    import Container from '@components/Container';
    const defaultCommodityData = {
        commodityName: '',
        commodityShort: '',
        spuId: '',
        commodityDept: '',
        isFreshSell: '',
        isMateriel: '',
        isDailyDist: '',
        isImport: '',
        termCondition: '',
        taxRate: '',
        commoditySkuVO: [
            {
                specType: '', //规格类型
                skuMemberList: [
                    {
                        skuId: '',
                        specValue: '', //规格值
                        specUnit: '', //单位
                        commodityStatus: '', //商品状体
                        commodityEan: [], //条码
                        specVolume: [],
                    },
                ]
            },
        ],
        divName: '',
        depName: '',
        className: '',
        subclassName: '',
        pictureUrl: '',

        attributeVOList: [
            {attrType: '', attrValue: []}
        ],
    };

    export default {
        name: 'CommodityEdit',
        data() {
            const commodityData = window.INIT_APP_DATA.commodityData || {};
            const operationsLog = window.INIT_APP_DATA.operationsLog || {};
            return {
                showImage: false,
                COMMODITY_CODE: COMMODITY_CODE,
                commodity: commodityData.spuId ? commodityData : defaultCommodityData,
                operationsLog: operationsLog.length ? operationsLog : [],
            };
        },
        components: {
            Container
        },
        methods: {
            codeToLabel: codeToLabel,
            commodityList() {
                location.href = './commodity-list.html';
            },
            mmToY4M2D2TH2M2S2(millionSeconds) { //1503565755531-->2017-08-24 09:09:15
                if (millionSeconds) {
                    return new Date(millionSeconds.replace('CST', 'UTC')).toJSON().replace('T', ' ').split('.')[0]
                }
            },
        },
    };
</script><style scoped lang="less">
    @import './commodity.less';
</style>
