import appConfig from 'configs/app.config'
import ApiService from '../ApiService'
import axios from 'axios'

export async function apiGetbranch() {
    return ApiService.fetchData({
        url: '/branch',
        method: 'get',
    })
}

export const Postbranch = (data, token) => {
    return new Promise((resolve, reject) => {
        //console.log(param)

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: appConfig.apiPrefix + '/branch/',
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

export const Putbranch = (data, token) => {
    return new Promise((resolve, reject) => {
        //console.log(param.Country)

        let config = {
            method: 'put',
            maxBodyLength: Infinity,
            url: `${appConfig.apiPrefix}/branch/${data.Id}`,
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
