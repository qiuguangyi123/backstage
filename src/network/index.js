import axios from 'axios';
let token
//设置请求头
const requestHeader = axios.create({
    baseURL:'http://39.101.217.150:8086',
    timeout:5000
})
if(localStorage.token){
    token = localStorage.token
}

//设置请求拦截
requestHeader.interceptors.request.use(res=>{
    console.log(res,'请求')
    if(res.url == '/account/login'){
        return res
    }
    else if(res.url == '/file'){
        res.headers.Authorization = token
        res.headers['constnet-type'] = 'multipart/form-data'
        return res
    }
    else{
        res.headers.Authorization = token
        return res
    }
},err=>{
    console.log(err)
})
//设置相应拦截
requestHeader.interceptors.response.use(res=>{
    console.log(res,'响应')
    let data = res.data
    return data;
},err=>{
    console.log(err)
    if(err.statusCode == 401){
        location.href = '/login'
    }
})

export function requestPost({url,params,method}){
   return requestHeader({
        method,
        url,
        data:params,
    })
}
export function request({url,params,method}){
    return requestHeader({
        method,
        url,
        params,
    })
}

export function requestAll(){
    return axios.all([
        request({url:'channel/list',params:{},method:'get'}),
        request({url:'article/articlebychannel',params:{},method:'get'})
    ])
}

export function requestNoHeader({url,params,method}){
    return axios({
        url,
        method,
        data:params
    })
}



