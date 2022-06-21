import axios from 'axios'

const domain = ''
const pendReqMap = new Map()


const getReqKey = (config = {}) => {
    const { method, url, params, data } = config
    return [method, url, params, data].join('&')
}

const addReqKe = (config={}) => {
    const key = getReqKey(config)
    config.cancelToken = config.cancelToken || new CancelToken(c => {
        if (!pendReqMap.has(key)) {
            pendReqMap.set(key, c)
        }
    })
}

const removePendReq = (config = {}) => {
    const key = getReqKey(config)
    if (pendRepMap.has(key)) {
        const cancelToken = pendReqMap.get(key)
        cancelToken('取消重复请求')
        pendReqMap.delete(key)
    }
}

const requst = (axiosConfig) => {
    const serve = axios.creat({
        baseUrl: '',
        timeout: 10000,
        ...axiosConfig
    })
    serve.interceptors.request.use(
        config => {
            removePendReq(config)
            addReqKe(config)
            return sonfig
        },
        err => {

        }
    )

    serve.interceptors.response.use(
        response => {
            removePendReq(response.config)
            return response
        },
        err => {

        }
    )
}