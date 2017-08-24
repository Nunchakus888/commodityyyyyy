<template>
    <container>
        <div id="app" slot="content">
            <object-list>
                <h1 slot="header">商品管理</h1>
                <div slot="search">
                    <el-form label-width="100px" class="demo-form-inline">
                        <el-row>
                            <el-col :span="6">
                                <el-form-item label="商品编码">
                                    <!--todo 12位校验-->
                                    <el-input v-model="commodity.skuId"></el-input>
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
                                        <el-option v-for="(name, code) in COMMODITY_CODE.commodityStatus" :value="code" :label="name"></el-option>
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
                                    <el-input v-model="commodity.termCondition"></el-input>
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

                            <el-col :span="6" v-if="commodity.commodityDept === 'PB'">
                                <el-form-item label="现制现售" prop="isFreshSell">
                                    <el-radio-group v-model="commodity.isFreshSell">
                                        <el-radio :label="code" v-for="(name, code) in COMMODITY_CODE.isFreshSell">{{ name }}</el-radio>
                                    </el-radio-group>
                                </el-form-item>
                            </el-col>
                            <div v-else>
                                <el-col :span="6">
                                    <el-form-item label="物料" prop="isMateriel">
                                        <el-radio-group v-model="commodity.isMateriel">
                                            <el-radio :label="code" v-for="(name, code) in COMMODITY_CODE.isMateriel">{{ name }}</el-radio>
                                        </el-radio-group>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item label="日配" prop="isDailyDist">
                                        <el-radio-group v-model="commodity.isDailyDist">
                                            <el-radio :label="code" v-for="(name, code) in COMMODITY_CODE.isDailyDist">{{ name }}</el-radio>
                                        </el-radio-group>
                                    </el-form-item>
                                </el-col>
                            </div>
                        </el-row>

                        <el-row>
                            <el-col :span="5">
                                <el-form-item label="div">
                                    <el-select clearable v-model="commodity.divName" @change="commodity.depName=''">
                                        <el-option v-for="(name, code) in COMMODITY_CODE.divAndClass.div" :value="code" :label="name"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="5">
                                <el-form-item label="dep">
                                    <el-select clearable v-model="commodity.depName" @change="commodity.className=''">
                                        <el-option v-for="(name, code) in COMMODITY_CODE.divAndClass[commodity.divName]" :value="code" :label="name"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="5">
                                <el-form-item label="class">
                                    <el-select clearable v-model="commodity.className" @change="commodity.subclassName=''">
                                        <el-option v-for="(name, code) in COMMODITY_CODE.divAndClass[commodity.depName]" :value="code" :label="name"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="5">
                                <el-form-item label="subclass">
                                    <el-select clearable v-model="commodity.subclassName">
                                        <el-option v-for="(name, code) in COMMODITY_CODE.divAndClass[commodity.className]" :value="code" :label="name"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-row>

                    </el-form>

                    <el-row type="flex" justify="center">
                        <el-col :span="3">
                            <el-button class="submit-btn" type="primary" @click="addCommodity">新建商品</el-button>
                        </el-col>
                        <el-col :span="3">
                            <el-button class="submit-btn" type="primary" @click="query(1, size)">查询</el-button>
                        </el-col>
                    </el-row>
                </div>

                <el-table slot="table" :data="commodityList" stripe border>
                    <el-table-column type="index" prop="index" width="" label="序号"></el-table-column>
                    <el-table-column label="商品编码" prop="skuId"></el-table-column>
                    <el-table-column label="商品名称" prop="commodityName"></el-table-column>
                    <el-table-column label="商品简称" prop="commodityShort"></el-table-column>
                    <el-table-column label="商品部门" prop="commodityDept">
                        <template scope="scope"><span>{{ COMMODITY_CODE.commodityDept[scope.row.commodityDept] }}</span></template>
                    </el-table-column>
                    <el-table-column label="保存条件" prop="termCondition">
                        <template scope="scope"><span>{{ COMMODITY_CODE.termCondition[scope.row.termCondition] }}</span></template>
                    </el-table-column>
                    <el-table-column label="规格" prop="specifications"></el-table-column>
                    <el-table-column label="商品状态" prop="commodityStatus">
                        <template scope="scope">
                            <el-select @change="changeStatus(scope.row.skuId, scope.row.commodityStatus)" v-model="scope.row.commodityStatus">
                                <el-option v-for="(name, code) in COMMODITY_CODE.commodityStatus" :value="code" :label="name"></el-option>
                            </el-select>
                            <!--<span>{{ COMMODITY_CODE.commodityStatus[scope.row.commodityStatus] }}</span>-->
                        </template>
                    </el-table-column>
                    <el-table-column label="操作">
                        <template scope="scope">
                            <a href="./commodity-edit.html">编辑</a>
                            <a href="./commodity-view.html">查看</a><br/>
                        </template>
                    </el-table-column>
                </el-table>

                <el-pagination
                    slot="pager"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="1"
                    :pageCount="pageTotal"
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
                pageTotal: 0,
                commodity: {
                    skuId: '',
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
        },
        methods: {
            changeStatus(skuId, status) {
                changeCommodityStatus(skuId, status)
                    .then(r => {
                        if (r.code === 200) {
                            location.reload();
                        } else {
                            this.$alert(r.msg || '修改失败!', '提示', {
                                confirmButtonText: '确定',
                                type: 'error'
                            });
                        }
                    })
                    .catch(err => {
                        this.$alert(err.msg || '修改失败!', '提示', {
                            confirmButtonText: '确定',
                            type: 'error'
                        });
                    });
            },
            addCommodity() {
                location.href = './commodity-edit.html';
            },
            query(page, size) {
                this.commodityList = [
                    {
                        skuId: '101000000002',
                        commodityName: 'wa哈哈哈哈',
                        commodityShort: '1',
                        commodityDept: '1',
                        termCondition: '1',
                        specifications: '1',
                        commodityStatus: '20',
                    },
                    {
                        skuId: '101000000002',
                        commodityName: 'wa哈哈哈哈',
                        commodityShort: '1',
                        commodityDept: '1',
                        termCondition: '1',
                        specifications: '1',
                        commodityStatus: '20',
                    },
                    {
                        skuId: '101000000002',
                        commodityName: 'wa哈哈哈哈',
                        commodityShort: '1',
                        commodityDept: '1',
                        termCondition: '1',
                        specifications: '1',
                        commodityStatus: '20',
                    },
                    {
                        skuId: '101000000002',
                        commodityName: 'wa哈哈哈哈',
                        commodityShort: '1',
                        commodityDept: '1',
                        termCondition: '1',
                        specifications: '1',
                        commodityStatus: '20',
                    },
                    {
                        skuId: '101000000002',
                        commodityName: 'wa哈哈哈哈',
                        commodityShort: '1',
                        commodityDept: '1',
                        termCondition: '1',
                        specifications: '1',
                        commodityStatus: '20',
                    },
                    {
                        skuId: '101000000002',
                        commodityName: 'wa哈哈哈哈',
                        commodityShort: '1',
                        commodityDept: '1',
                        termCondition: '1',
                        specifications: '1',
                        commodityStatus: '20',
                    },
                    {
                        skuId: '101000000002',
                        commodityName: 'wa哈哈哈哈',
                        commodityShort: '1',
                        commodityDept: '1',
                        termCondition: '1',
                        specifications: '1',
                        commodityStatus: '20',
                    },
                ]
                const params = Object.assign(this.commodity, {pageNo: page, pageSize: size});
                searchCommodity(params)
                    .then(r => {
                        if (r.code === 200) {
                            this.commodityList = r.data;
                            this.pageTotal = r.pageTotal;
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
