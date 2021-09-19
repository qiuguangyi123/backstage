<template>
    <div class="messageBox">
        <el-dialog
                title="提示"
                :visible.sync="dialogVisible"
                width="60%"
                :before-close="handleClose"
                @close="fClose">
            {{parveDept}}
            <el-form  label-position="left" label-width="auto" :model="userInfo">

                <el-form-item :required="true" label="字典名称">
                    <el-input  v-model="userInfo.dictName"></el-input>
                </el-form-item>
                <div v-if="status.length > 0">
                    <div>字典详情</div>
                    <el-row :gutter="20" v-for="(item,index) in this.status" :key="index">
                        <el-col :span="10">
                            <el-form-item :required="true" label="状态码">
                                <el-input  v-model="item.status"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10">
                            <el-form-item :required="true" label="含义">
                                <el-input  v-model="item.content"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="4">
                            <el-button type="danger" @click="fRemove(index)">移除</el-button>
                        </el-col>
                    </el-row>
                </div>
            </el-form>
            <span slot="footer" class="dialog-footer">
                 <el-button @click="fDickAdd">添加字典详情</el-button>
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="fsetPass">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import {setDict} from '@/network/main'
    import {mapState} from 'vuex'
    export default {
        name: "messageBox",
        props:['type','path','parveDept'],
        data(){
            return {
                //弹窗状态
                dialogVisible:this.type,

                //要添加的角色信息
                userInfo:{
                    //字典名称
                    dictName:''
                },
                //字典详情字段数组
                status:[]
            }
        },
        methods:{
            //关闭窗口
            fClose(){
                this.$emit('fClose',this.path)
                this.status = []
                this.userInfo.dictName = ''
            },
            //点击添加字典
            fDickAdd(){
                this.status.push({
                    status:'',
                    content:''
                })
            },
            //点击移除字典
            fRemove(index){
                this.status.splice(index,1)
            },
            //点击确定，发送请求
            fsetPass(){
                this.dialogVisible = false;
                this.setDict(this.userInfo)
            },
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(() => {
                        done();
                    })
                    .catch(() => {});
            },
            //处理字典格式
            fStatus(status){
                let str = '';
                for(let i of status){
                    str += i.status+':'+i.content+';'
                }
                return str
            },
            //发送添加用户请求
            setDict(params){
                //检测修改输入框是否都有数据
                if(this.status.length != 0){
                    for (let i of this.status){
                        if (i.status == '' || i.content == ''){
                            this.$message.error('请补全字典详情信息')
                            return 0
                        }
                    }
                }
                if(this.userInfo.dictName == ''){
                    this.$message.error('请补全字典名称信息')
                    return 0
                }
                //获得特定的字典格式
                let dictValues = this.fStatus(this.status);
                console.log(params,this.fStatus(this.status));
                //发送修改请求
                setDict(`/dict?dictName=${params.dictName}&dictValues=${dictValues}&id=${this.parveDept.id}`,{},'Put').then(res=>{
                    if(res.msg == '成功'){
                        this.$message({
                            message: '修改字典成功',
                            type: 'success'
                        });
                        this.$emit('dictModify',this.path)
                    }
                    else{
                        this.$message.error(res.msg)
                    }
                }).catch(err=>{
                    console.log(err)
                    this.$message.error(err)
                })
            }
        },
        computed:{
            ...mapState({
                user:state=>state.main.user
            })
        },
        watch:{
            type(){
                this.dialogVisible = this.type;
            },
            parveDept(){
                if(this.parveDept != ''){
                    this.userInfo.dictName = this.parveDept.name;
                    for(let i of this.parveDept.detail.split(',')){
                        this.status.push({
                            status:i.slice(0,i.indexOf(':')),
                            content:i.slice(i.indexOf(':')+1)
                        })
                    }
                }
            }
        },

    }
</script>

<style scoped>

</style>