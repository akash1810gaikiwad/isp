import appConfig from 'configs/app.config'
const axios = require('axios')
const FormData = require('form-data')

const ApiServiceAuth = {
    fetchData(param) {
        return new Promise((resolve, reject) => {
            let data = new FormData()
            data.append('username', param.data.username)
            data.append('password', param.data.password)

            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: appConfig.apiPrefix + '/login',
                headers: {},
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
    },
}

export { ApiServiceAuth }
