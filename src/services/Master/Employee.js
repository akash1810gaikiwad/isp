import appConfig from 'configs/app.config'
import ApiService from '../ApiService'
import axios from 'axios'

export async function apiGetemployee() {
    return ApiService.fetchData({
        url: '/employee',
        method: 'get',
    })
}

export const PostEmployee = (data, token) => {
    return new Promise((resolve, reject) => {
        //console.log(param)

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: appConfig.apiPrefix + '/employee/',
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

export const PutEmployee = (data, token) => {
    return new Promise((resolve, reject) => {
        //console.log(param.Country)

        let config = {
            method: 'put',
            maxBodyLength: Infinity,
            url: `${appConfig.apiPrefix}/employee/${data.Id}`,
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
