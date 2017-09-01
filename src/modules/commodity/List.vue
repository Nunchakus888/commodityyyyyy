<template>
    <container>
        <div id="app" slot="content">
            <object-list class="commodity-main">
                <h1 slot="header">商品管理</h1>
                <div slot="search">
                    <el-form label-width="100px" class="demo-form-inline">
                        <el-row>
                            <el-col :span="6">
                                <el-form-item label="商品编码">
                                    <el-input v-model="commodity.skuCode"></el-input>
                                </el-form-item>
                            </el-col>

                            <el-col :span="6">
                                <el-form-item label="商品名称">
                                    <el-input v-model="commodity.commodityName"></el-input>
                                </el-form-item>
                            </el-col>

                            <el-col :span="6">
                                <el-form-item label="商品状态">
                                    <el-select clearable v-model="commodity.commodityStatus">
                                        <el-option v-for="item, index in COMMODITY_CODE.commodityStatus" :value="item.value" :label="item.label" :key="index"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-row>

                        <el-row>
                            <el-col :span="6">
                                <el-form-item label="商品简称">
                                    <el-input v-model="commodity.commodityShort"></el-input>
                                </el-form-item>
                            </el-col>

                            <el-col :span="6">
                                <el-form-item label="保存条件">
                                    <el-select clearable v-model="commodity.termCondition">
                                        <el-option v-for="(name, code) in COMMODITY_CODE.termCondition" :value="code" :label="name"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-row>

                        <el-row>
                            <el-col :span="6">
                                <el-form-item label="商品部门">
                                    <el-select clearable v-model="commodity.commodityDept" @change="commodity.isMateriel=commodity.isFreshSell=commodity.isDailyDist=''">
                                        <el-option v-for="(name, code) in COMMODITY_CODE.commodityDept" :value="code" :label="name"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>

                            <el-col :span="6">
                                <el-form-item label="现制现售" prop="isFreshSell">
                                    <el-radio-group v-model="commodity.isFreshSell">
                                        <el-radio :label="code" v-for="(name, code) in COMMODITY_CODE.isFreshSell">{{ name }}</el-radio>
                                    </el-radio-group>
                                </el-form-item>
                            </el-col>
                            <!--<el-col :span="5">
                                <el-form-item label="物料" prop="isMateriel">
                                    <el-radio-group v-model="commodity.isMateriel">
                                        <el-radio :label="code" v-for="(name, code) in COMMODITY_CODE.isMateriel">{{ name }}</el-radio>
                                    </el-radio-group>
                                </el-form-item>
                            </el-col>-->
                            <el-col :span="6">
                                <el-form-item label="日配" prop="isDailyDist">
                                    <el-radio-group v-model="commodity.isDailyDist">
                                        <el-radio :label="code" v-for="(name, code) in COMMODITY_CODE.isDailyDist">{{ name }}</el-radio>
                                    </el-radio-group>
                                </el-form-item>
                            </el-col>
                        </el-row>

                        <el-row>
                            <el-col :span="5">
                                <el-form-item label="div">
                                    <el-select v-model="commodity.divName" @change="linkageLevelData(2, commodity.divName);commodity.depName=''">
                                        <el-option v-for="item in COMMODITY_CODE.divLevel.div" :value="item.classId" :label="item.className"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="5">
                                <el-form-item label="dep">
                                    <el-select v-model="commodity.depName" @change="linkageLevelData(3, commodity.depName);commodity.className=''">
                                        <el-option v-for="item in COMMODITY_CODE.divLevel.dep" :value="item.classId" :label="item.className"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="5">
                                <el-form-item label="class">
                                    <el-select v-model="commodity.className" @change="linkageLevelData(4, commodity.className);commodity.subclassName=''">
                                        <el-option v-for="item in COMMODITY_CODE.divLevel.class" :value="item.classId" :label="item.className"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="5">
                                <el-form-item label="subclass">
                                    <el-select v-model="commodity.subclassName">
                                        <el-option v-for="item in COMMODITY_CODE.divLevel.subclass" :value="item.classId" :label="item.className"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-row>

                    </el-form>

                    <el-row type="flex" justify="center">
                        <el-col :span="4">
                            <el-button class="submit-btn" type="primary" @click="addCommodity">新建商品</el-button>
                        </el-col>

                        <el-col :span="4">
                            <el-button class="submit-btn" type="primary" @click="query(currentPage, size)">查询</el-button>
                        </el-col>

                        <el-col :span="4">
                            <el-button class="submit-btn" type="primary" @click="emptyFilterValue()">清空条件查询</el-button>
                        </el-col>
                    </el-row>
                </div>

                <el-table class="commodity-table" slot="table" :data="commodityList" stripe border>
                    <el-table-column type="index" prop="index" width="" label="序号"></el-table-column>
                    <el-table-column label="商品编码" prop="skuCode"></el-table-column>
                    <el-table-column label="商品名称" prop="commodityName"></el-table-column>
                    <el-table-column label="商品简称" prop="commodityShort"></el-table-column>
                    <el-table-column label="商品部门" prop="commodityDept">
                        <template scope="scope"><span>{{ COMMODITY_CODE.commodityDept[scope.row.commodityDept] }}</span></template>
                    </el-table-column>
                    <!--<el-table-column label="subclass" prop="subclassName"></el-table-column>-->
                    <el-table-column label="保存条件" prop="termCondition">
                        <template scope="scope"><span>{{ COMMODITY_CODE.termCondition[scope.row.termCondition] }}</span></template>
                    </el-table-column>
                    <el-table-column label="规格" prop="specifications"></el-table-column>
                    <el-table-column label="商品状态" prop="commodityStatus">
                        <template scope="scope">
                            <select @change="changeStatus(scope.row.skuCode, scope.row.commodityStatus)" v-model="scope.row.commodityStatus">
                                <option v-for="item, index in COMMODITY_CODE.commodityStatus" :value="item.value" :label="item.label" :key="index"></option>
                            </select>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作">
                        <template scope="scope">
                            <!--<el-button type="text"  @click="edit(scope.row.spuId)">编辑</el-button>-->
                            <a :href="`/commodity/edit/${scope.row.skuCode || ''}`">编辑</a>
                            <a :href="`/commodity/view/${scope.row.skuCode || ''}`">查看</a><br/>
                            <a :href="`/product/create/${scope.row.skuId || ''}`">新建采购品</a>
                        </template>
                    </el-table-column>
                </el-table>

                <el-pagination
                        slot="pager"
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="1"
                        :pageCount="totalPage"
                        :page-sizes="[20, 50, 100]"
                        :page-size="size"
                        layout="prev, pager, next, sizes"
                >
                </el-pagination>
            </object-list>
        </div>
    </container>
</template>
<script>
    import { searchCommodity, changeCommodityStatus } from '../../lib/api';
    import Container from '@components/Container';
    import ObjectList from '@components/ObjectList';
    import { COMMODITY_CODE } from '../../lib/constants';
    import { linkageLevelData } from '../../lib/utils';

    export default {
        components: {
            Container,
            ObjectList,
        },
        name: 'app',
        data() {
            return {
                currentPage: 1,
                size: Number(localStorage.getItem('size')) || 50,
                COMMODITY_CODE: COMMODITY_CODE,
                totalPage: 0,
                commodity: {
                    skuCode: '',
                    commodityDept: '',
                    commodityStatus: '',

                    commodityName: '',
                    commodityShort: '',
                    termCondition: '',
                    divName: '',
                    depName: '',
                    className: '',
                    subclassName: '',

                    isFreshSell: '',
                    isMateriel: '',
                    isDailyDist: '',
                },
                commodityList: []
            };
        },
        mounted() {
            this.query(this.currentPage, this.size);
            this.linkageLevelData(1, 1);
        },
        methods: {
            linkageLevelData: linkageLevelData,
            changeStatus(skuCode, status) {
                changeCommodityStatus(skuCode, status)
                .then(r => {
                    if (r.status !== 200) {
                        this.$alert(r.msg || '修改失败!', '提示', {
                            confirmButtonText: '确定',
                            type: 'error',
                        });
                        this.query(this.currentPage, this.size);
                    }
                })
                .catch(err => {
                    this.$alert(err.msg || '修改失败!', '提示', {
                        confirmButtonText: '确定',
                        type: 'error',
                    });
                    this.query(this.currentPage, this.size);
                });
            },
            addCommodity() {
                location.assign('/commodity/edit/0');
            },
            emptyFilterValue() {
                Object.keys(this.commodity).forEach(i => {
                    this.commodity[i] = '';
                });
            },
            query(page, size) {
                const params = Object.assign(this.commodity, {pageNo: page, pageSize: size});
                searchCommodity(params)
                .then(r => {
                    if (r.status === 200) {
                        this.commodityList = r.data;
                        this.totalPage = r.totalPage;
                    } else {
                        this.$alert(r.msg || '请求失败!', '提示', {
                            confirmButtonText: '确定',
                            type: 'error'
                        });
                    }
                })
                .catch(err => {
                    this.$alert(err.msg || '请求失败!', '提示', {
                        confirmButtonText: '确定',
                        type: 'error'
                    });
                    this.commodityList = [];
                });
            },
            handleSizeChange(val) {
                this.size = val;
                localStorage.setItem('size', val);
                this.currentPage = 1;
                this.query(this.currentPage, this.size);
            },
            handleCurrentChange(page) {
                this.currentPage = page;
                this.query(page, this.size);
            },
        }
    }
</script>
<style scoped lang="less">
    @import '../../less/button.less';

    .commodity-table,
    .commodity-main {
        min-width: 940px;
    }

    table.commodity-list {
        width: 100%;
        border: 1px solid #999;
        border-collapse: collapse;
        th,
        td {
            border: 1px solid #999;
            padding: 2px 5px;
        }
    }

    .submit-btn {
        width: 120px;
        font-weight: 600;
        margin-bottom: 15px;
    }
    .search,
    .control {
        margin-bottom: 15px;
    }

    .pagination {
        text-align: center;
        margin-top: 15px;
    }

    .operate-wrap {
        margin-bottom: 20px;
    }

    .create-btn {
        cursor: pointer;
        .info-btn();
        padding: 10px 20px;
    }
</style>
