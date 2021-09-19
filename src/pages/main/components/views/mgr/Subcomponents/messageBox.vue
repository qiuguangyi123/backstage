<template>
    <div class="messageBox">
        <el-dialog
                title="提示"
                :visible.sync="dialogVisible"
                width="60%"
                :before-close="handleClose"
                @close="fClose">
            <!--            输入框-->
            <el-form  label-position="left" label-width="auto" :model="userInfo">
                <el-form-item :required="true" label="账户">
                    <el-input  v-model="userInfo.account"></el-input>
                </el-form-item>
                <el-form-item :required="true" label="密码">
                    <el-input v-model="userInfo.password"></el-input>
                </el-form-item>
                <el-form-item :required="true" label="名字">
                    <el-input v-model="userInfo.name"></el-input>
                </el-form-item>
                <el-form-item :required="true" label="生日">
                    <el-date-picker
                            v-model="userInfo.birthday"
                            align="right"
                            type="date"
                            placeholder="选择日期"
                            :picker-options="pickerOptions">
                    </el-date-picker>
                </el-form-item>
                <el-form-item :required="true" label="性别">
                    <el-radio v-model="userInfo.sex" :label="1">男</el-radio>
                    <el-radio v-model="userInfo.sex" :label="2">女</el-radio>
                </el-form-item>
                <el-form-item :required="true" label="邮箱">
                    <el-input v-model="userInfo.email"></el-input>
                </el-form-item>
                <el-form-item :required="true" label="电话">
                    <el-input v-model="userInfo.phone"></el-input>
                </el-form-item>
                <el-form-item :required="true" label="部门">
                    <el-cascader :options="options" :props="props"  :show-all-levels="false" v-model="userInfo.deptid" clearable></el-cascader>
                </el-form-item>
                <el-form-item :required="true" label="状态">
                    <el-radio v-model="userInfo.status" :label="0">启用</el-radio>
                    <el-radio v-model="userInfo.status" :label="1">冻结</el-radio>
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
    import {setUser} from '@/network/main'
    export default {
        name: "messageBox",
        props:['type','props','options','path'],
        data(){
          return {
              //弹窗状态
              dialogVisible:this.type,

              //要添加的用户信息
              userInfo:{
                  //账户
                  account:'',
                  //名字
                  name:'',
                  //密码
                  password:'',
                  //生日
                  birthday:'',
                  //性别
                  sex:1,
                  //邮箱
                  email:'',
                  //电话
                  phone:'',
                  //部门id
                  deptid:'',
                  //状态
                  status:0
              },
              //日期
              pickerOptions: {
                  disabledDate(time) {
                      return time.getTime() > Date.now();
                  },
                  shortcuts: [{
                      text: '今天',
                      onClick(picker) {
                          picker.$emit('pick', new Date());
                      }
                  }, {
                      text: '昨天',
                      onClick(picker) {
                          const date = new Date();
                          date.setTime(date.getTime() - 3600 * 1000 * 24);
                          picker.$emit('pick', date);
                      }
                  }, {
                      text: '一周前',
                      onClick(picker) {
                          const date = new Date();
                          date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                          picker.$emit('pick', date);
                      }
                  }]
              },
          }
        },
        methods:{
            fClose(){
                this.$emit('fClose',this.path)
            },
            //点击确定，发送请求
            fsetPass(){
                this.dialogVisible = false;
                this.setUser(this.userInfo)
                //子传父，确定的回调事件
                this.$emit('setUser',this.path)
            },
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(() => {
                        done();
                    })
                    .catch(() => {});
            },
            //发送添加用户请求
            setUser(params){
                setUser('/user',params,'post').then(res=>{
                    console.log(res)
                    if(res.msg == '成功'){
                        this.$message({
                            message: '添加成功',
                            type: 'success'
                        });
                    }
                    else{
                        this.$message.error(res.msg)
                    }
                })
            }
        },
        watch:{
            type(){
                this.dialogVisible = this.type;
            }
        },
        mounted(){

        }

    }
</script>

<style scoped>

</style>