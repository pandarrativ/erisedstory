import axios from 'axios'
const baseUrl = 'http://127.0.0.1:5000/backend'

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
    obj.url = 'https://api.openai.com' + url;
    obj.header.authorization = 'Bearer ' + openaiKey;
    return axios.request(obj)
}

const createCompletion = (data) => {
    return axios.post('/openai/api/v1/completions', data, {
        header: {
            authorization: 'Bearer ' + openaiKey;
        }
    })
}

export {request, baseUrl, createCompletion, postToOpenAI}
