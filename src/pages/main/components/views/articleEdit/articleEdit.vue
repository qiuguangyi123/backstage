<template>
    <div class="articleEdit">
        <div class="articleEdit-submit">
            <el-button type="primary" @click="fSubmit">提交</el-button>
        </div>
        <div class="articleEdit-nav">
            <el-form ref="form" :model="form" label-width="80px">
                <el-row :gutter="20">
                    <el-col :span="18">
                        <el-form-item >
                            <el-input placeholder="标题" v-model="form.Title"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-select v-model="form.idChannel" placeholder="文章的类型">
                            <el-option v-for="item in selectList" :label="item.name" :key="item.id" :value="item.id"></el-option>
                        </el-select>
                    </el-col>
                </el-row>
            </el-form>
        </div>
        <div ref="wangeditor" class="wangeditor"></div>
    </div>
</template>

<script>
    //vuex
    import {mapState} from 'vuex'

    //引入轻量级富文本编辑器
    import wangeditor from 'wangeditor'

    //网络请求的方法
    import {fileImage,getChannel,fromSubmit} from "@/network/main";

    export default {
        name: "articleEdit",
        data(){
            return {
                form:{
                    Title:'',
                    idChannel:''
                },
                selectList:[],

                //轻量级富文本编辑器new出来的对象
                wangEditor:''
            }
        },
        methods:{
            getChannel(params){
                getChannel('/channel/list',params,'get').then(res=>{
                    console.log(res)
                })
            },
            //提交表单
            fSubmit(){
                let that = this
                let json = {
                    author:this.user.name,
                    content:this.wangEditor.txt.html().replace(/%*/g,'%25'),
                    Title:this.form.Title,
                    idChannel: parseInt(this.form.idChannel)
                }
                console.log(json)
                fromSubmit('article',json,'post').then(res=>{
                    console.log(res)
                    if(res.msg == '成功'){
                        this.$message({
                            message: '提交表单成功',
                            type:'success'
                        })
                        that.form.Title = '';
                        that.form.idChannel = '';
                        that.wangEditor.txt.clear()
                    }
                }).catch(err=>{
                    this.$message.error(err)
                    console.log(err)
                })
            },
        },
        mounted(){
            //富文本编辑器
            this.wangEditor = new wangeditor(this.$refs.wangeditor)
            this.wangEditor.config.uploadImgServer = '/upload-img'
            this.wangEditor.config.uploadImgMaxLength = 1
            //上传图片
            this.wangEditor.config.customUploadImg = function (resultFiles,insertImgFn) {
                // resultFiles 是 input 中选中的文件列表
                // insertImgFn 是获取图片 url 后，插入到编辑器的方法
                let d = resultFiles[0]
                let g = new FormData
                g.append('file',d)
                console.log(g)
                fileImage('/file',g,'post').then(res=>{
                    console.log(res)
                    // 上传图片，返回结果，将图片插入到编辑器中
                    insertImgFn(res.realFileName)
                }).catch(err=>{
                    console.log(err)
                })
            }
            this.wangEditor.create()

            //请求分类数据
            this.getChannel(this.params)
        },
        computed:{
            ...mapState({
                user:state=>state.main.user
            })
        }
    }
</script>

<style scoped>
    .articleEdit-nav{
        position: relative;
        margin: 15px 0;
        z-index: 2;
    }
    .wangeditor{
        position: relative;
        z-index: 1;
    }
</style>