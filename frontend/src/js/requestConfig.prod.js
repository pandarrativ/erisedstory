import axios from 'axios'
const baseUrl = '/backend'

const request = (method, url, params, data) => {
    return axios.request({
        method: method,
        url: baseUrl + url,
        params: params,
        data: data
    })
}

const postToOpenAI = (url, obj) => {
    if (!('header' in obj)) { obj.header = {} }
    obj.method = 'post'
    obj.url = '/openai/api' + url;
    return axios.request(obj)
}

const createCompletion = (data) => {
    return axios.post('/openai/api/v1/completions', data)
}

export {request, baseUrl, createCompletion, postToOpenAI}
