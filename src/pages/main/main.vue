<template>
  <div class="app">
    <container :meu="meu" :user="user"></container>
  </div>
</template>

<script>
  import container from "@/pages/main/components/comput/container";
  import {fMainList,fMainUser} from "@/network/main";
  import {getMenu} from '@/network/main'

  import { mapState,mapMutations } from 'vuex'
  // const { mapState} = createNamespacedHelpers('mainList')
export default {
  name: 'App',
  components: {
    container
  },
  computed:{
    ...mapState({
      meu:state=>state.main.meu,
      user:state=>state.main.user,
    })
  },
  methods:{
    ...mapMutations(['setList','setUser','setMeuList']),
    //网路请求函数

    //请求左边列表数据
    fMainList(){
      fMainList('/menu/listForRouter',{},'get').then(res=>{
        //将数据存储到vuex里
        this.setList(res)
      }).catch((err)=>{
        console.log(err)
      })
    },

    //请求角色权限数据
    fMainUser(){
      fMainUser('/account/info',{},'get').then(res=>{
        //将数据存储到vuex里
        this.setUser(res)
        console.log(res)
      }).catch(()=>{
        localStorage.clear()
        location.href = '/login'
      })
    },
    //请求功能权限
    getMenu(){
      let json = {};
      getMenu('/menu/list',{},'get').then(res=>{
        console.log(res)
        //父级迭代
        for(let i of res.data){
          //子级迭代
          for(let g of i.children){
            this.$set(json,g.url,g.children)
          }
        }
        console.log(json)
        this.setMeuList(json)
      })
    }
  },
  mounted(){
    //请求左边列表数据
    this.fMainList()
    //请求角色权限数据
    this.fMainUser()
    //获取功能权限
    this.getMenu()

  }
}
</script>

<style scoped lang="less">
  @import "~@/assets/css/normalize.css";
  @import "~@/assets/css/icon.css";
  .app{
      width: 100vw;
      height: 100vh;
      background-image: url("~@/assets/image/1.jpg");
      background-size: 100%;
  }
</style>
