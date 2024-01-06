import ApiService from '../ApiService'

export async function apiGetdesignationDrop() {
    return ApiService.fetchData({
        url: '/userdesignation/drop/',
        method: 'get',
    })
}
export async function apiGetdepartmentDrop() {
    return ApiService.fetchData({
        url: '/department/drop/',
        method: 'get',
    })
}
