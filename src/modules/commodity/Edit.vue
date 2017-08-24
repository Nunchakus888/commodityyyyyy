<template>
    <div>
        <container>
            <div id="app" slot="content">
                <main>
                    <div class="form-header">
                        <h1>{{pageTitle}}</h1>
                    </div>
                    <el-form :rules="rules" :model="commodity" label-width="100px" ref="mainForm">
                        <el-row>
                            <el-col :span="8">
                                <el-form-item label="商品名称" prop="commodityName" :rules="rules.commodityName">
                                    <el-input :maxlength="50" v-model="commodity.commodityName"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="*商品简称" prop="commodityShort">
                                    <el-input v-model="commodity.commodityShort"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>

                        <!--<el-row v-if="isEdit">
                            <el-col :span="8">
                                <el-form-item label="*SPUID">
                                    <el-input readonly v-model="commodity.spuId"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>-->

                        <div class="title-line"><span>基本信息</span></div>

                        <el-row>
                            <el-col :span="5">
                                <el-form-item label="产品部门" prop="commodityDept">
                                    <el-select v-model="commodity.commodityDept" @change="commodityDeptChange(commodity)">
                                        <el-option v-for="(name, code) in COMMODITY_CODE.commodityDept" :value="code" :label="name"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>

                            <el-col :span="5" v-if="commodity.commodityDept === '1'">
                                <el-form-item label="现制现售" prop="isFreshSell">
                                    <el-radio-group v-model="commodity.isFreshSell" @change="resetFreshValue(commodity.isFreshSell)">
                                        <el-radio :label="code" v-for="(name, code) in COMMODITY_CODE.isFreshSell">{{ name }}</el-radio>
                                    </el-radio-group>
                                </el-form-item>
                            </el-col>
                            <el-col :span="5">
                                <el-form-item label="物料" prop="isMateriel">
                                    <el-radio-group v-model="commodity.isMateriel">
                                        <el-radio :label="code" v-for="(name, code) in COMMODITY_CODE.isMateriel">{{ name }}</el-radio>
                                    </el-radio-group>
                                </el-form-item>
                            </el-col>
                            <el-col :span="5">
                                <el-form-item label="日配" prop="isDailyDist">
                                    <el-radio-group v-model="commodity.isDailyDist">
                                        <el-radio :label="code" v-for="(name, code) in COMMODITY_CODE.isDailyDist">{{ name }}</el-radio>
                                    </el-radio-group>
                                </el-form-item>
                            </el-col>
                        </el-row>

                        <el-row>
                            <el-col :span="10">
                                <el-form-item label="专卖" prop="isSpecialSell">
                                    <el-radio-group v-model="commodity.isSpecialSell">
                                        <el-radio :label="code" v-for="(name, code) in COMMODITY_CODE.isSpecialSell">{{ name }}</el-radio>
                                    </el-radio-group>
                                </el-form-item>
                            </el-col>

                            <el-col :span="10">
                                <el-form-item label="进口标志" prop="isImport">
                                    <el-radio-group v-model="commodity.isImport">
                                        <el-radio :label="code" v-for="(name, code) in COMMODITY_CODE.isImport">{{ name }}</el-radio>
                                    </el-radio-group>
                                </el-form-item>
                            </el-col>
                        </el-row>

                        <el-row>
                            <el-col :span="10">
                                <el-form-item label="存储条件" prop="termCondition">
                                    <el-select v-model="commodity.termCondition">
                                        <el-option v-for="(name, code) in COMMODITY_CODE.termCondition" :value="code" :label="name"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="10">
                                <el-form-item label="进项税率" prop="taxRate">
                                    <el-select v-model="commodity.taxRate">
                                        <el-option v-for="(name, code) in COMMODITY_CODE.taxRate" :value="code" :label="name"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-row>

                        <div class="title-line"></div>

                        <el-row v-model="commodity.commoditySkuVO" v-for="item, index in commodity.commoditySkuVO" :key="index">
                            <el-col :span="20">
                                <el-form-item label="规格类型" :prop="'commoditySkuVO['+index+'].specType'" :rules="rules.specType">
                                    <el-select v-model="item.specType">
                                        <el-option v-for="(name, code) in COMMODITY_CODE.specType" :value="code" :label="name"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>

                            <!--<el-col :span="12">
                                <el-form-item v-if="index + 1 === commodity.commoditySkuVO.length">
                                    <div class="add-btn" @click="commodity.commoditySkuVO.push(commoditySkuVODataModel())">
                                        <i class="el-icon-plus"></i>
                                    </div>
                                </el-form-item>
                                <el-form-item v-else>
                                    <div class="add-btn" @click="commodity.commoditySkuVO.splice(index, 1)">
                                        <i class="el-icon-minus"></i>
                                    </div>
                                </el-form-item>
                            </el-col>-->

                            <div v-for="unit, index2 in item.skuMemberList" :key="index2">

                                <el-col :span="10" v-if="isEdit">
                                    <el-form-item label="商品编码">
                                        <el-input readonly v-model="item.skuId"></el-input>
                                    </el-form-item>
                                </el-col>

                                <el-col :span="isEdit ? 10 : 20">
                                    <el-form-item label="商品状态" :prop="'commoditySkuVO['+index+'][skuMemberList]['+index2+'][commodityStatus]'" :rules="rules.commodityStatus">
                                        <el-select v-model="unit.commodityStatus">
                                            <el-option v-for="(name, code) in COMMODITY_CODE.commodityStatus" :value="code" :label="name"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>

                                <el-col :span="5">
                                    <el-form-item label="规格" :prop="'commoditySkuVO['+index+'][skuMemberList]['+index2+'][specValue]'" :rules="rules.specValue">
                                        <el-input v-model="unit.specValue" placeholder="ml/g/杯型"></el-input>
                                    </el-form-item>
                                </el-col>

                                <el-col :span="5">
                                    <el-form-item label="单位" :prop="'commoditySkuVO['+index+'][skuMemberList]['+index2+'][specUnit]'" :rules="rules.specUnit">
                                        <el-select v-model="unit.specUnit">
                                            <el-option v-for="(name, code) in COMMODITY_CODE.specUnit" :value="code" :label="name"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>

                                <el-col :span="8">
                                    <el-form-item label="体积" :prop="'commoditySkuVO['+index+'][skuMemberList]['+index2+'][specVolume]'" :rules="rules.specVolume">
                                        <input v-model="unit.specVolume" hidden/>
                                        <div class="volume">
                                            <el-input class="volume-size" size="small" type="number" min="0" v-model="unit.specVolume[0]" placeholder="长/cm"></el-input><i class="el-icon-close"></i>
                                            <el-input class="volume-size" size="small" type="number" min="0" v-model="unit.specVolume[1]" placeholder="宽/cm"></el-input><i class="el-icon-close"></i>
                                            <el-input class="volume-size" size="small" type="number" min="0" v-model="unit.specVolume[2]" placeholder="高/cm"></el-input>
                                        </div>
                                    </el-form-item>
                                </el-col>

                                <el-col :span="2" v-if="commodity.isFreshSell == 1">
                                    <el-form-item v-if="index2 + 1 === item.skuMemberList.length">
                                        <div class="add-btn" @click="item.skuMemberList.unshift(unitDataModel()[0])">
                                            <i class="el-icon-plus"></i>
                                        </div>
                                    </el-form-item>
                                    <el-form-item v-else>
                                        <div class="add-btn" @click="item.skuMemberList.splice(index2, 1)">
                                            <i class="el-icon-minus"></i>
                                        </div>
                                    </el-form-item>
                                </el-col>

                                <el-col :span="21">
                                    <el-form-item label="条码" :prop="`commoditySkuVO[${index}][skuMemberList][${index2}][commodityEan]`" :rules="rules.commodityEan">
                                        <span :key="i" class="ean-code" v-for="tag, i in unit.commodityEan">{{ tag }}
                                            <i class="el-icon-close" @click="deleteEanCode(unit.commodityEan, i, index, index2);"></i>
                                        </span>

                                        <div class="add-btn-sm" @click="showInput = index2;inputValue = ''">
                                            <input
                                                placeholder="多个用回车分割"
                                                :class="{'input-error': codeError, 'add-code-input': !codeError}"
                                                autofocus
                                                ref="addEanInput"
                                                @click.stop
                                                :onchange="checkCodeValue()"
                                                @blur="handleInputConfirm(unit.commodityEan, index, index2)"
                                                @keyup.enter="handleInputConfirm(unit.commodityEan, index, index2);"
                                                v-if="showInput === index2"
                                                v-model="inputValue"
                                            />
                                            <span v-if="showInput === index2 && codeError">条码为6或13位数字且不能有非法字符</span>
                                            <i class="el-icon-plus"></i>
                                        </div>

                                    </el-form-item>
                                </el-col>

                                <el-col :span="24">
                                    <div class="title-line"><span v-if="index2 + 1 === item.skuMemberList.length">分类信息</span></div>
                                </el-col>
                            </div>

                        </el-row>

                        <el-row>
                            <el-col :span="5">
                                <el-form-item label="div" prop="divName">
                                    <el-select v-model="commodity.divName" @change="commodity.depName=''">
                                        <el-option v-for="(name, code) in COMMODITY_CODE.divAndClass.div" :value="code" :label="name"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="5">
                                <el-form-item label="dep" prop="depName">
                                    <el-select v-model="commodity.depName" @change="commodity.className=''">
                                        <el-option v-for="(name, code) in COMMODITY_CODE.divAndClass[commodity.divName]" :value="code" :label="name"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="5">
                                <el-form-item label="class" prop="className">
                                    <el-select v-model="commodity.className" @change="commodity.subclassName=''">
                                        <el-option v-for="(name, code) in COMMODITY_CODE.divAndClass[commodity.depName]" :value="code" :label="name"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="5">
                                <el-form-item label="subclass" prop="subclassName">
                                    <el-select v-model="commodity.subclassName">
                                        <el-option v-for="(name, code) in COMMODITY_CODE.divAndClass[commodity.className]" :value="code" :label="name"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-row>

                        <el-row v-for="item, index in commodity.attributeVOList" :key="index">
                            <el-col :span="8">
                                <el-form-item label="属性类型" :prop="'attributeVOList'" :rules="rules.attributeVOList">
                                    <el-select v-model="item.attrType" @change="item.attrValue=[]">
                                        <el-option v-for="(name, code) in COMMODITY_CODE.attributeVOList.attrType" :value="code" :label="name"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="属性标签" :prop="'attributeVOList'" :rules="rules.attrValue">
                                    <el-select multiple v-model="item.attrValue">
                                        <el-option v-for="(name, code) in COMMODITY_CODE.attributeVOList[item.attrType]" :value="code" :label="name"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>

                            <el-col :span="8">
                                <el-form-item v-if="index + 1 === commodity.attributeVOList.length">
                                    <div class="add-btn" @click="commodity.attributeVOList.unshift(new Object({attrType: '', attrValue: []}));">
                                        <i class="el-icon-plus"></i>
                                    </div>
                                </el-form-item>
                                <el-form-item v-else>
                                    <div class="add-btn" @click="commodity.attributeVOList.splice(index, 1)">
                                        <i class="el-icon-minus"></i>
                                    </div>
                                </el-form-item>
                            </el-col>
                        </el-row>

                        <el-row>
                            <el-col :span="5" v-for="item, index in commodity.pictureUrl">
                                <el-form-item :span="5" :label="index === 0 ? '商品图片' : ''">
                                    <div class="commodity-image">
                                        <i class="el-icon-delete" @click="commodity.pictureUrl.splice(index, 1)"></i>
                                        <img @click="originalImage=item;showImage=true" :src="`${item}?x-oss-process=image/resize,h_100`" class="avatar-uploader-icon"/>
                                    </div>
                                </el-form-item>
                            </el-col>

                            <el-col :span="5" v-if="commodity.pictureUrl.length === 0 ? !0 : !1">
                                <el-form-item prop="pictureUrl" :label="!commodity.pictureUrl.length ? '商品图片' : ''" :rules="rules.pictureUrl">
                                    <file-upload type="image" v-model="commodity.pictureUrl" :isUploading="isUploading" @selectfile="uploadWindowPic"></file-upload>
                                </el-form-item>
                            </el-col>
                        </el-row>

                        <div v-if="showImage" class="big-image-container" @click="showImage=false">
                            <div class="image-overlayer">
                                <i class="el-icon-close close-button"></i>
                            </div>
                            <div class="big-image-container">
                                <img :src="originalImage"/>
                            </div>
                        </div>

                        <el-row type="flex" justify="center">
                            <!--<el-col :span="2">
                                <el-button class="submit-btn" type="primary" @click="submitForm()" :disabled="isSubmitting">保存</el-button>
                            </el-col>-->
                            <el-col :span="2">
                                <el-button class="submit-btn" type="primary" @click="resetUpdate()" :disabled="isSubmitting">撤销</el-button>
                            </el-col>
                            <el-col :span="2">
                                <el-button class="submit-btn" type="primary" @click="submitForm()" :disabled="isSubmitting">提交</el-button>
                            </el-col>
                        </el-row>
                    </el-form>
                </main>
            </div>
        </container>
    </div>
</template>
<script>
    import FileUpload from '../../components/FileUpload.vue';
    import { updateCommodity, checkCommodityEan, uploadImage } from '../../lib/api';
    import { COMMODITY_CODE, REGEXP } from '../../lib/constants';
    import Container from '@components/Container';

    const defaultCommodityData = {
        commodityName: '',
        commodityShort: '',
        spuId: '',
        commodityDept: '',
        isFreshSell: '',
        isMateriel: '',
        isDailyDist: '',
        isSpecialSell: '',
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
                        specVolume: ['', '', ''],
                    },
                ]
            },
        ],
        divName: '',
        depName: '',
        className: '',
        subclassName: '',
        pictureUrl: [],

        attributeVOList: [
            {attrType: '', attrValue: []}
        ],
    };

    export default {
        name: 'CommodityEdit',
        data() {
            const commodityData = window.INIT_APP_DATA.commodityData || {};
            return {
                codeError: false,
                showInput: false,
                showImage: false,
                inputValue: '',
                isUploading: false,
                isSubmitting: false,
                isEdit: commodityData.spuId ? !0 : false,
                COMMODITY_CODE: COMMODITY_CODE,
                commodity: commodityData.spuId ? commodityData : defaultCommodityData,
                commoditySkuVODataModel: () => { //添加规格数据模型 初始化value
                    return {
                        specType: '', //规格类型
                        skuMemberList: this.unitDataModel(),
                    }
                },
                unitDataModel: () => { //添加商品规格详情数据模型 初始化value
                    return [
                        {
                            skuId: '',
                            specValue: '', //规格值
                            specUnit: '', //单位
                            commodityStatus: '', //商品状体
                            commodityEan: [], //条码
                            specVolume: ['', '', ''],
                        }
                    ]
                },
                rules: {
                    commodityName: { validator: (rule, value, cb) => {
                        if (!value) {
                            cb(new Error('请选择商品名称'));
                        } else if (REGEXP.zhCn_en_num.test(value)) {
                            cb();
                        } else {
                            cb(new Error('非法字符'));
                        }
                    } },
                    commodityShort: { validator: (rule, value, cb) => {
                        if (!value) {
                            cb(new Error('请选择商品简称'));
                        } else if (REGEXP.zhCn_en_num.test(value)) {
                            let byteLength = 0;
                            for (const i of value) {
                                if (i.charCodeAt() > 255) {
                                    byteLength += 2;
                                } else {
                                    byteLength++;
                                }
                            }
                            if (byteLength > 22) {
                                cb(new Error('简称不超过11个汉字或22个字母数字'));
                            } else {
                                cb();
                            }
                        } else {
                            cb(new Error('非法字符'));
                        }
                    } },
                    commodityEan: { validator: (rule, value, cb) => {
                        if (!value.length && this.commodity.commodityDept == 2) {
                            cb(new Error('请选择条码'));
                        } else if (value.length) {
                            let tag = 0;
                            for (let i = 0; i < value.length; i++) {
                                for (let j = i + 1; j < value.length; j++) {
                                    if (value[i] === value[j]) {
                                        cb(new Error('条码重复'));
                                        tag = 1;
                                        break;
                                    } else {
                                        cb();
                                    }
                                }
                                if (tag) {
                                    break;
                                } else {
                                    cb();
                                }
                            }
                        } else {
                            cb();
                        }
                    } },
                    isImport: { required: true, message: '请选择进口标志' },
                    commodityDept: { required: true, message: '请选择产品部门' },
                    isFreshSell: { required: true, message: '请选择现制现售' },
                    isMateriel: { required: true, message: '请选择物料' },
                    isDailyDist: { required: true, message: '请选择日配' },
                    isSpecialSell: { required: true, message: '请选择专卖' },
                    termCondition: { required: true, message: '请选择存储条件' },
                    taxRate: { required: true, message: '请选择进项税率' },
                    specType: { validator: (rule, value, cb) => {
                        !value ? cb(new Error('请选择规格类型')) : cb();
                    } },
                    commodityStatus: { validator: (rule, value, cb) => {
                        !value ? cb(new Error('请选择商品状态')) : cb();
                    } },
                    specValue: { validator: (rule, value, cb) => {
                        !value ? cb(new Error('请选择规格')) : cb();
                    } },
                    specUnit: { validator: (rule, value, cb) => {
                        !value ? cb(new Error('请选择单位')) : cb();
                    } },
                    specVolume: { validator: (rule, value, cb) => {
                        value[0] * value[1] * value[2] ? cb() : cb(new Error('请填写体积'));
                    } },
                    divName: { required: true, message: '请选择div' },
                    depName: { required: true, message: '请选择dep' },
                    className: { required: true, message: '请选择class' },
                    subclassName: { required: true, message: '请选择subclass' },
                    attributeVOList: { validator: (rule, value, cb) => {
                        let flag = 0;
                        if (value[0].attrType) {
                            for (let i = 0; i < value.length; i++) {
                                for (let j = i + 1; j < value.length; j++) {
                                    if (value[i].attrType === value[j].attrType) {
                                        cb(new Error('属性类型重复'));
                                        flag = 1;
                                        break
                                    }
                                }
                                if (flag === 1) {
                                    break;
                                } else {
                                    flag = 2;
                                }
                            }
                            if (flag === 2) cb();
                        } else {
                            cb();
                        }
                    } },
                    attrType: { validator: (rule, value, cb) => {
                        !value ? cb(new Error('请选择属性类型')) : cb();
                    } },
                    attrValue: { validator: (rule, value, cb) => {
                        for (const i of value) {
                            if (i.attrType !== '' && i.attrType !== undefined) {
                                if (!i.attrValue.length) {
                                    cb(new Error('请选择属性标签'));
                                    break;
                                } else {
                                    cb();
                                }
                            } else {
                                cb();
                            }
                        }
                    } },
                    pictureUrl: { validator: (rule, value, cb) => {
                        this.isUploading ? cb(new Error('请等待图片上传完成')) : cb();
                    } }
                }
            };
        },
        components: {
            FileUpload,
            Container
        },
        computed: {
            pageTitle() {
                return this.isEdit ? '编辑商品' : '新增商品';
            }
        },
        methods: {
            commodityDeptChange(commodity) {
                commodity.isMateriel = '';
                commodity.isDailyDist = '';
                commodity.isFreshSell = '';
                this.resetFreshValue('');
            },
            resetFreshValue(v) {
                if (v != 1) { //选中非现制现售，remove添加的规格选项.
                    const commoditySkuVO = this.commodity.commoditySkuVO;
                    commoditySkuVO.forEach(i => {
                        if (i.skuMemberList.length > 1) {
                            i.skuMemberList = [i.skuMemberList.pop()]; //只留最后一个.
                        }
                    });
                }
            },
            deleteEanCode(codes, index, index1, index2) { //删除条码
                codes.splice(index, 1);
                this.$refs.mainForm.validateField(`commoditySkuVO[${index1}][skuMemberList][${index2}][commodityEan]`);
            },
            checkCodeValue() { //条码格式检查
                const inputValue = this.inputValue;
                if (inputValue) { //校验失败codeError===false
                    if (!REGEXP.num_code.test(inputValue)) {
                        this.codeError = true;
                        return false;
                    } else {
                        this.codeError = false;
                    }
                } else {
                    this.codeError = false;
                }
            },
            handleInputConfirm(ean, index1, index2) {
                const inputValue = this.inputValue;
                if (inputValue && !this.codeError) {
                    checkCommodityEan(inputValue).then(data => {
                        if (data.code === 200) {
                            ean.push(inputValue);
                            this.$refs.mainForm.validateField(`commoditySkuVO[${index1}][skuMemberList][${index2}][commodityEan]`);
                        } else {
                            this.$alert(data.msg || '条码校验失败!', '提示', {
                                confirmButtonText: '确定',
                                type: 'error'
                            });
                        }
                    }).catch(err => {
                        this.$alert(err.msg || '条码校验失败!', '提示', {
                            confirmButtonText: '确定',
                            type: 'error'
                        });
                    });
                    this.$refs.mainForm.validateField(`commoditySkuVO[${index1}][skuMemberList][${index2}][commodityEan]`);
                }
                this.inputValue = '';
                this.showInput = undefined;
            },

            submitForm() {
                this.$refs.mainForm.validate(valid => {
                    if (valid) {
                        this.submit();
                    }
                });
            },
            resetUpdate() {
                location.reload();
            },
            uploadWindowPic(file) {
                this.isUploading = true;
                uploadImage(file).then(data => {
                    if (data.code === 200) {
                        this.commodity.pictureUrl.push(data.data);
                    } else {
                        this.$alert(data.msg || '图片上传失败!', '提示', {
                            confirmButtonText: '确定',
                            type: 'error'
                        });
                    }
                    this.isUploading = false;
                    this.$refs.mainForm.validateField('pictureUrl');
                }).catch(err => {
                    this.isUploading = false;
                    this.$alert(err.msg || '图片上传失败!', '提示', {
                        confirmButtonText: '确定',
                        type: 'error'
                    });
                    this.$refs.mainForm.validateField('pictureUrl');
                });
            },
            submit() {
                this.isSubmitting = true;
                updateCommodity(this.commodity).then((r) => {
                    if (r.code === 200) {
                        this.$alert('保存成功！', '提示', {
                            confirmButtonText: '确定',
                            type: 'success',
                            callback: () => {
                                location.href = '/commodity/info/list';
                            }
                        });
                    } else {
                        this.$alert(r.msg || '保存失败!', '提示', {
                            confirmButtonText: '确定',
                            type: 'error'
                        });
                    }
                    this.isSubmitting = false;
                })
                    .catch(err => {
                        this.$alert(err.msg || '保存失败!', '提示', {
                            confirmButtonText: '确定',
                            type: 'error'
                        });
                        this.isSubmitting = false;
                    });
            }
        },
    };
</script>
<style scoped lang="less">
    @import 'commodity.less';
</style>
