import Vue from 'vue'
import Router from 'vue-router'

let userInfo = ()=>import('../pages/main/components/views/userInfo/userInfo')
let article = ()=>import('../pages/main/components/views/article/article')
let msg = ()=>import('../pages/main/components/views/mgr/mgr')
let role = ()=>import('../pages/main/components/views/roleManagement/roleManagement')
let dept = ()=>import('../pages/main/components/views/depManagement/depManagement')
let menu = ()=>import('../pages/main/components/views/menu/menu')
let dict = ()=>import('../pages/main/components/views/dict/dict')
let channel = ()=>import('../pages/main/components/views/channel/channel')
let articleEdit = ()=>import('../pages/main/components/views/articleEdit/articleEdit')
let fileMgr = ()=>import('../pages/main/components/views/fileMgr/fileMgr')


Vue.use(Router)

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            beforeEnter() {
                window.location = "./login.html"
            }
        },
        {
            path: '/login',
            beforeEnter() {
                window.location = "./login.html"
            }
        },
        {
            path: '/main',
            beforeEnter() {
                window.location.href = './main.html'
            }
        },
        {
            path:'/info',
            component:userInfo
        },
        {
            path:'/article',
            component:article
        },
        {
            path:'/mgr',
            component:msg
        },
        {
            path:'/role',
            component:role
        },
        {
            path:'/dept',
            component:dept
        },
        {
            path:'/menu',
            component:menu
        },
        {
            path:'/dict',
            component:dict
        },
        {
            path:'/channel',
            component:channel
        },
        {
            path:'/cms/articleEdit',
            component:articleEdit
        },
        {
            path:'/fileMgr',
            component:fileMgr
        }
    ]
})