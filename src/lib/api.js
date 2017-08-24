import request, {MIME_TYPE} from './request';

const pageSize = 20; //分页显示，每页的数量

/**
 * 根据条件查询供应商列表
 * @param {string} code
 * @return {Promise}
 */
export function searchSupplier(supplierName, supplierStatus, supplierApprovalStatus, supplierCreateBy, pageNum) {
    return request.get('/supplier/list', {supplierName, supplierStatus, supplierApprovalStatus, supplierCreateBy, pageNum, pageSize});
}

/**
 * 供应商分页查询
 * @param {string} pageNum
 * @returns {*|Promise}
 */
export function getPagination(supplierName, supplierStatus, supplierApprovalStatus, supplierCreateBy, pageNum) {
    return request.get('/supplier/list', {supplierName, supplierStatus, supplierApprovalStatus, supplierCreateBy, pageNum, pageSize});
}


/**
 * 根据供应商id 查看供应商的详细信息
 * @param {string} pageNum
 * @returns {*|Promise}
 */
export function getSupplierInfo(supplierId) {
    return request.get('/supplier/one/' + supplierId);
}

/**
 * 供应商审批时，选择 '通过' 还是 '驳回'
 * @param supplierId
 * @param approvalType
 * @param approvalMessage
 * @returns {*|Promise}
 */
export function approvalSave(supplierId, approvalType, approvalMessage) {
    return request.post('/supplier/approvalSave', {supplierId, approvalType, approvalMessage});
}

/**
 * div dep class subclass 四级联动
 * @param type
 * @param id
 * @returns {*|Promise}
 */
export function findFourSelect(itemType, id) {
    return request.post('/item/queryItem', {itemType, id});
}
//------------------------------------------------------------------------------------------------------------------------

/**
 *
 * @param {object} commodity
 * @return {Promise}
 */
export function addCommodity(commodity) {
    return request.post('/commodity/add', commodity);
}

/**
 *
 * @param {object} commodity
 * @return {Promise}
 */
export function updateCommodity(commodity) {
    return request.post('/commodity/save', commodity);
}

/**
 *
 * @param {string} id
 * @return {Promise}
 */
export function getCommodity(id) {
    return request.get(`/commodityManagement/commodity/${id}`);
}

/**
 *
 * @param {File} file
 */
export function uploadImage(file) {
    const formData = new FormData();
    formData.append('file', file);

    return request.fetch('/supplier/uploadpic', {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': MIME_TYPE.JSON
        }
    })
}

/**
 * 商品主档列表
 * @param {string} code
 * @return {Promise}
 */
export function searchCommodity(code) {
    return request.get('/commodity/list', code);
}

/**
 * 更改商品状态
 * @param {string} skuId
 * @return {Promise}
 */
export function changeCommodityStatus(skuId, status) {
    return request.get(`/commodity/change/${skuId}/${status}`);
}

/**
 * check 条码
 * @param {string} commodityEan
 * @return {Promise}
 */
export function checkCommodityEan(commodityEan) {
    return request.get(`/commodity/checkean/${(commodityEan)}`);
}