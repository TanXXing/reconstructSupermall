/*
对axios这个第三库进行封装，如果不对它进行一层封装的话，那么我们每次在不同页面直接使用
axios库里面的函数进行开发后，如果遇到该库后期不再维护的话，那么每个页面都将需要编码，
但是，如果，我们在某个一个文件对该库进行封装之后，即使该库不再维护了，但是我们只需要修改
一个文件就可以了，这样就实现了，面向多文件开发变成了只面向一个文件开发
*/

// 导入第三方库：axios
import axios from 'axios'

// 创建axios实例, 并自定义实例的默认值, 创建axios实例是因为我们可能会访问不同的服务器


// 发起请求
function request({method, url, params, data}) {

  // 一般，我们会把这个instance放在这个里面去写
  const instance = axios.create({
    baseURL: 'http://152.136.185.210:7878/api/hy66',
    timeout: 5000
  })

  // 配置请求和响应拦截器：有什么应用呢？
  // 请求拦截器
  instance.interceptors.request.use(config => {
    return config
  }, err => {
    // 不知道这个地方的return Promise.reject(err)返回到了哪里，可以肯定的是，这个地方的return 并不是返回到了request被
    //调用后，那个catch那里，具体什么用去查
    return Promise.reject(err)
  })


  // 响应拦截器
  instance.interceptors.response.use(res => {
    return res.data
  }, err => {
    //不知道这个地方的return Promise.reject(err)返回到了哪里，可以肯定的是，这个地方的return 并不是返回到了request被
    //调用后，那个catch那里，具体什么用去查
    return Promise.reject(err)
  })


  // 注意，这个地方返回的是一个Promise对象，因为instace()执行发送请求的任务后，会返回一个Promise对象
  return instance({
    method,
    url,
    params,
    data
  })
}

export default request
