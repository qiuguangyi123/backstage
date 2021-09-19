<template>
    <div class="messageBox">
        <el-dialog
                title="提示"
                :visible.sync="dialogVisible"
                width="60%"
                :before-close="handleClose"
                @close="fClose">
<!--            输入框-->
            <el-form  label-position="left" label-width="auto" :model="objPass">
                <el-form-item :required="true" label="旧密码">
                    <el-input  v-model="objPass.oldPass"></el-input>
                </el-form-item>
                <el-form-item :required="true" label="新密码">
                    <el-input v-model="objPass.newPass"></el-input>
                </el-form-item>
                <el-form-item :required="true" label="再次输入新密码">
                    <el-input v-model="objPass.againPass"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="fsetPass">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import {setPassword} from '@/network/main.js'
    export default {
        name: "messageBox",
        props:{
            setdialogVisible:{
                type:Boolean,
                default:false
            }
        },
        data(){
            return {
                //修改密码的提示框是否显示
                dialogVisible:false,
                //修改密码框的数据
                objPass:{
                    oldPass:'',
                    newPass:'',
                    againPass:''
                },
                //用户密匙
                token:null
            }
        },
        mounted(){
          this.token = localStorage.token
          console.log(this.token)
        },
        watch:{
          setdialogVisible(){
              this.dialogVisible = this.setdialogVisible
              console.log(this.dialogVisible,this.setdialogVisible)
          }
        },
        methods: {
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(()=> {
                        done();
                    })
                    .catch(err=> {
                        console.log(err)
                    });
            },
            //关闭提示框回调函数
            fClose(){
                this.$emit('fClose')
                this.fEmpty()
            },
            //提交修改密码
            fsetPass() {
                console.log(this.objPass)
                if(!this.objPass.oldPass){
                    this.$message.error('请输入旧密码')
                }
                else if(!this.objPass.newPass){
                    this.$message.error('请输入新密码')
                }
                else if(!this.objPass.againPass){
                    this.$message.error('请再次输入新密码')
                }
                else if(this.objPass.newPass != this.objPass.againPass){
                    this.$message.error('两次密码不一致')
                }
                else{
                    let {oldPass:oldPassword,newPass:password,againPass:rePassword} = this.objPass
                    console.log('发送')
                    console.log(oldPassword,password,rePassword)
                    setPassword('/account/updatePwd',{oldPassword,password,rePassword},'post',{Authorization:this.token}).then(res=>{
                       if(res.code == '9999'){
                           this.$message.error(res.msg)
                       }
                    }).catch(()=>{
                        localStorage.clear()
                        location.href = '/login'
                    })
                    this.fEmpty()
                }
            },
            fEmpty(){
                for(let i of Object.keys(this.objPass)){
                    this.objPass[i] = ''
                }
                this.dialogVisible = false
            }
        }
    }
</script>

<style scoped>

</style>