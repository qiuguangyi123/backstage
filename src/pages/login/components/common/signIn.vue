<template>
    <div class="signIn">
        <el-form ref="form" :model="form" label-width="80px" class="signIn-input">
            <el-form-item label="账号" class="input-userName">
                <el-input v-model="form.name" name="userName"></el-input>
            </el-form-item >
            <el-form-item label="密码" class="input-password">
                <el-input v-model="form.password" name="userPassword"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button @click="onSubmit">立即登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    //网路请求函数
    import {fSignln} from "@/network/login";

    export default {
        name: "signIn",
        data(){
            return {
                form: {
                    name: '',
                    password:''
                }
            }
        },
        mounted(){
          if(localStorage.token&&localStorage.token != 'undefined'){
              location.href = './main.html'
          }
        },
        methods:{
            onSubmit(){
                if(this.form.name == ''){
                    this.$message.error('账号为空')
                }
                else if(this.form.password == ''){
                    this.$message.error('密码为空')
                }
                else{
                    fSignln('/account/login',{username:this.form.name,password:this.form.password},'post').then(res=>{
                        console.log(res)
                        if(res.success == false){
                            this.$message.error(res.msg)
                            return 0
                        }
                        localStorage.token = res.data.token;
                        location.href = './main.html'
                    }).catch(err=>{
                        console.log(err)
                        this.$message.error(err)
                    })
                }
            },
        }
    }
</script>

<style scoped lang="less">
    .signIn{
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%,-50%);
        .signIn-input{
            display: flex;
            flex-direction: column;
            align-items: center;

            color: #ffffff!important;
            .input-password{
                width: 450px;
            }
            .input-userName{
                width: 450px;
            }
        }
    }
</style>