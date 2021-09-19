import {request, requestAll,  requestPost} from "@/network/index";

//请求左边列表数据
export function fMainList(url,params,method) {
    if(method == 'get'){
        return request({url,params,method})
    }
    else{
        return requestPost({url,params,method})
    }
}
//请求角色权限数据
export function fMainUser(url,params,method){
    if(method == 'get'){
        return request({url,params,method})
    }
    else{
        return requestPost({url,params,method})
    }
}

//修改密码---userinfo
export function setPassword (url,params,method) {
    if(method == 'get'){
        return request({url,params,method})
    }
    else{
        return requestPost({url,params,method})
    }
}

//请求文章数据---article
export function getArticle(){
    return requestAll()
}

//请求功能项信息
export function getMenu(url,params,method) {
    if(method == 'get'){
        return request({url,params,method})
    }
    else{
        return requestPost({url,params,method})
    }
}

//请求用户列表数据
export function getUserList(url,params,method){
    if(method == 'get'){
        return request({url,params,method})
    }
    else{
        return requestPost({url,params,method})
    }

}

//请求添加用户中部门信息
export function getDeptList(url,params,method){
    if(method == 'get'){
        return request({url,params,method})
    }
    else{
        return requestPost({url,params,method})
    }
}

//添加用户信息
export function setUser(url,params,method){
    if(method == 'get'){
        return request({url,params,method})
    }
    else{
        return requestPost({url,params,method})
    }
}
//获取角色权限id和名称
export function getRole(url,params,method){
    if(method == 'get'){
        return request({url,params,method})
    }
    else{
        return requestPost({url,params,method})
    }
}
//分配角色
export function setRoule(url,params,method){
    if(method == 'get'){
        return request({url,params,method})
    }
    else{
        return requestPost({url,params,method})
    }
}
//删除用户
export function deletUser(url,params,method){
    if(method == 'get'){
        return request({url,params,method})
    }
    else{
        return requestPost({url,params,method})
    }
}
//获取角色列表
export function getRoleList(url,params,method){
    if(method == 'get'){
        return request({url,params,method})
    }
    else{
        return requestPost({url,params,method})
    }
}

//添加角色
export function addUser(url,params,method){
    if(method == 'get'){
        return request({url,params,method})
    }
    else{
        return requestPost({url,params,method})
    }
}

//修改角色
export function modifyUser(url,params,method){
    if(method == 'get'){
        return request({url,params,method})
    }
    else{
        return requestPost({url,params,method})
    }
}
//删除角色
export function deletRole(url,params,method){
    if(method == 'delete'){
        return request({url,params,method})
    }
    else{
        return requestPost({url,params,method})
    }
}
//获取角色权限树
export function menuTreeListByRoleId(url,params,method){
    if(method == 'get'){
        return request({url,params,method})
    }
    else{
        return requestPost({url,params,method})
    }
}
//设置角色权限树
export function setRoleMenu(url,params,method){
    if(method == 'get'){
        return request({url,params,method})
    }
    else{
        return requestPost({url,params,method})
    }
}

//添加部门
export function addDep(url,params,method){
    if(method == 'get'){
        return request({url,params,method})
    }
    else{
        return requestPost({url,params,method})
    }
}
//修改部门
export function setDep(url,params,method){
    if(method == 'get'){
        return request({url,params,method})
    }
    else{
        return requestPost({url,params,method})
    }
}

//删除部门
export function deletDep(url,params,method){
    if(method == 'delete'){
        return request({url,params,method})
    }
    else{
        return requestPost({url,params,method})
    }
}

//获取菜单列表
export function getMenuList(url,params,method){
    if(method == 'get'){
        return request({url,params,method})
    }
    else{
        return requestPost({url,params,method})
    }
}

//添加菜单
export function setMenuList(url,params,method) {
    if(method == 'get'){
        return request({url,params,method})
    }
    else{
        return requestPost({url,params,method})
    }
}
//修改菜单
export function modifyMenu(url,params,method) {
    if(method == 'get'){
        return request({url,params,method})
    }
    else{
        return requestPost({url,params,method})
    }
}
//删除菜单
export function deletMenu(url,params,method) {
    if(method == 'delete'){
        return request({url,params,method})
    }
    else{
        return requestPost({url,params,method})
    }
}

//获得字典列表
export function getDict(url,params,method) {
    if(method == 'delete'){
        return request({url,params,method})
    }
    else{
        return requestPost({url,params,method})
    }
}

//添加字典
export function  addDict(url,params,method) {
    if(method == 'get'){
        return request({url,params,method})
    }
    else{
        return requestPost({url,params,method})
    }
}

//修改字典
export function  setDict(url,params,method) {
    return requestPost({url,params,method})
}

//删除字典
export function deleteDict(url,params,method) {
    if(method == 'delete'){
        return request({url,params,method})
    }
    else{
        return requestPost({url,params,method})
    }
}

//请求栏目信息
export function getChannel(url,params,method) {
    if(method == 'delete'){
        return request({url,params,method})
    }
    else{
        return requestPost({url,params,method})
    }
}

//添加栏目信息
export function addChannel(url,params,method) {
    if(method == 'get'){
        return request({url,params,method})
    }
    else{
        return requestPost({url,params,method})
    }
}
//修改栏目
export function setChannel(url,params,method){
    if(method == 'get'){
        return request({url,params,method})
    }
    else{
        return requestPost({url,params,method})
    }
}

//删除栏目
export function deleteChannel(url,params,method){
        return request({url,params,method})
}

//上传图片
export function fileImage(url,params,method){
    return requestPost({url,params,method})
}

//提交表单
export function fromSubmit(url,params,method){
    if(method == 'get'){
        return request({url,params,method})
    }
    else{
        return requestPost({url,params,method})
    }
}

//请求文章列表数据
export function getArticleList(url,params,method){
    if(method == 'get'){
        return request({url,params,method})
    }
    else{
        return requestPost({url,params,method})
    }
}

//删除文章
export function deleteArticle(url,params,method) {
    if(method == 'delete'){
        return request({url,params,method})
    }
    else{
        return requestPost({url,params,method})
    }
}

//请求文件管理列表
export function getFileList(url,params,method) {
    if(method == 'get'){
        return request({url,params,method})
    }
    else{
        return requestPost({url,params,method})
    }

}