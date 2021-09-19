export default {
    main:{
        state:()=>({
            //列表数据
            meu:[],
            //用户信息
            user:{},
            //用户权限
            meuList:{}
        }),
        mutations:{
            setList(state,params){
                state.meu = params.data
            },
            setUser(state,params){
                state.user = params.data
            },
            setMeuList(state,param){
                state.meuList = param
            }
        }
    }
}