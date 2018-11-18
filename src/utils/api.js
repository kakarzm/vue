import axios from 'axios'
import {Message} from 'element-ui'

axios.interceptors.request.use(config => {
  return config
}, err => {
  Message.error({message: '请求超时'})
  return Promise.resolve(err)
})
axios.interceptors.response.use(data => {
  if (data.status && data.status === 200 && data.data.status === 'error') {
    Message.error({message: data.data.msg})
    return
  }
  return data
}, err => {
  if (err.response.status === 504 || err.response.status === 404) {
    Message.error({message: '服务器被修空调的搬走了'})
  } else if (err.response.status === 403) {
    Message.error({message: '别瞎点, 你没权限'})
  } else {
    Message.error({message: '我特么也不知道怎么了' + err.response.status})
  }
  return Promise.resolve(err)
})

let base = ''

export const postRequest = (url, params) => {
  return axios({
    method: 'post',
    url: `${base}${url}`,
    data: params,
    transformRequest: [function (data) {
      let ret = ''
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}
export const uploadFileRequest = (url, params) => {
  return axios({
    method: 'post',
    url: `${base}${url}`,
    data: params,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
export const putRequest = (url, params) => {
  return axios({
    method: 'put',
    url: `${base}${url}`,
    data: params,
    transformRequest: [function (data) {
      let ret = ''
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}
export const deleteRequest = (url) => {
  return axios({
    method: 'delete',
    url: `${base}${url}`
  })
}
export const getRequest = (url) => {
  return axios({
    method: 'get',
    url: `${base}${url}`
  })
}
