<template>
    <div class="userInfo">
        <p>姓名：{{user.name}}</p>
        <p>修改密码：<span @click="fSetPassword">修改密码</span></p>
        <p>性别：{{user.profile.sex == 1?'男':'女'}}</p>
        <p>手机号：{{user.profile.phone}}</p>
        <p>创建时间：{{user.profile.createTime}}</p>
        <p>邮箱：{{user.profile.email}}</p>
        <p>部门：xx部门</p>
        <messageBox @fClose="fClose" :setdialogVisible="setdialogVisible"></messageBox>
        <el-button type="danger" @click="signOut" round>退出登录</el-button>
    </div>

</template>

<script>
    //组件
    import messageBox from "@/pages/main/components/views/userInfo/Subcomponents/messageBox";

    import {mapState} from 'vuex'
    export default {
        name: "userInfo",
        data(){
          return {
              setdialogVisible:false
          }
        },
        components:{
            messageBox,
        },
        computed:{
            ...mapState({
                user:state=>state.main.user
            })
        },
        methods:{
            //点击修改密码
            fSetPassword(){
                this.setdialogVisible =  true
            },
            //关闭修改密码弹窗回调函数
            fClose() {
                this.setdialogVisible = false
            },
            signOut(){
                localStorage.clear()
                location.href = './login.html'
            }
        }
    }
</script>

<style scoped>

</style>