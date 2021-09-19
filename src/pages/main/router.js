import Vue from 'vue'
import Router from 'vue-router'
let userInfo = ()=>import('./components/views/userInfo/userInfo')
let article = ()=>import('./components/views/article/article')
let msg = ()=>import('./components/views/mgr/mgr')
let role = ()=>import('./components/views/roleManagement/roleManagement')
let dept = ()=>import('./components/views/depManagement/depManagement')
let menu = ()=>import('./components/views/menu/menu')
let dict = ()=>import('./components/views/dict/dict')
let channel = ()=>import('./components/views/channel/channel')
let articleEdit = ()=>import('./components/views/articleEdit/articleEdit')
let fileMgr = ()=>import('./components/views/fileMgr/fileMgr')

Vue.use(Router)

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

export default new Router({
    mode:'history',
    routes:[
        {
            path:'/',
            redirect:'/info'
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