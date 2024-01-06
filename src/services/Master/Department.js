import appConfig from 'configs/app.config'
import ApiService from '../ApiService'
import axios from 'axios'

export async function apiGetdepartment() {
    return ApiService.fetchData({
        url: '/department',
        method: 'get',
    })
}

export const Postdepartment = (data, token) => {
    return new Promise((resolve, reject) => {
        //console.log(param)

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: appConfig.apiPrefix + '/department/',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            data: data,
        }

        axios
            .request(config)
            .then((response) => {
                resolve(response)
            })
            .catch((errors) => {
                reject(errors)
            })
    })
}

export const Putdepartment = (data, token) => {
    return new Promise((resolve, reject) => {
        //console.log(param.Country)

        let config = {
            method: 'put',
            maxBodyLength: Infinity,
            url: `${appConfig.apiPrefix}/department/${data.Id}`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            data: data,
        }

        axios
            .request(config)
            .then((response) => {
                resolve(response)
            })
            .catch((errors) => {
                reject(errors)
            })
    })
}
