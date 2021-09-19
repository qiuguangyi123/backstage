<template>
    <div class="container">
        <el-container>
<!--                左侧栏-->
                <el-aside  style="width:auto;overflow: hidden" >
                    <el-menu default-active="1-4-1" :unique-opened="true" class="el-menu-vertical-demo" :collapse="isCollapse" :collapse-transition="true">
                        <el-menu-item index="30">
                            <i  :class="'iconfont icon-shouye'"></i>
                            <span slot="title">首页</span>
                        </el-menu-item>

                        <el-submenu :index="item.id" v-for="item in meu" :key="item.id">
                            <template slot="title" >
                                <i :class="'iconfont '+iconList[item.id]"></i>
                                <span slot="title">{{item.name}}</span>
                            </template>
                            <el-menu-item-group v-if="user.permissions" style="background:rgba(0,0,0,0.5)">
                                <el-menu-item route @click="fJump(item1.path)" :index="item1.id" :key="item1.id" v-for="item1 in item.children" :disabled="user.permissions.indexOf(item1.path) == -1">
                                    <i :class="'iconfont '+iconList[item1.id]"></i>
                                    {{item1.name}}
                                </el-menu-item>
                            </el-menu-item-group>
                        </el-submenu>
                    </el-menu>
                </el-aside>
<!--            右边栏-->
            <el-container>
<!--                头部-->
                <el-header style="background: #999999;line-height: 60px;display: flex;justify-content: space-between;align-items: center">
                    <el-radio-group v-model="isCollapse">
                        <el-radio-button :label='false'>展开</el-radio-button>
                        <el-radio-button :label="true">收起</el-radio-button>
                    </el-radio-group>
                    <div @click="fInfo">
                        用户名称：
                        <span style="color:orangered;font-weight: bold">{{user.name}}</span>
                    </div>
                </el-header>
<!--                内容-->
                <el-main style="background: rgba(0,0,0,.5)">
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    export default {
        name: "container",
        props:{
          meu:{
              type:Array,
              default(){
                  return []
              }
          },
         user:{
             type:Object,
             default(){
                 return {}
             }
         }
        },
        methods:{
            fInfo(){
                this.$router.push('/info')
            },
            fJump(path){
                console.log(path)
                this.$router.push(path)
            }
        },
        data(){
            return {
                isCollapse:true,
                iconList:{
                    1:'icon-xitongguanli',
                    2:'icon-huaban',
                    4:'icon-yonghuguanli',
                    12:'icon-jiaoseguanli',
                    21:'icon-bumenguanli',
                    17:'icon-caidanguanli',
                    22:'icon-zidianguanli',
                    41:'icon-lanmuguanli',
                    46:'icon-xinjian',
                    42:'icon-wenzhang',
                    45:'icon-wenjianguanli',
                }
            }
        }
    }
</script>

<style scoped lang="less">
    .container{
        width: 100%;
        height: 100vh;

        overflow: hidden;
        section{
            width: 100%;
            height: 100%;
            overflow: hidden;

            .iconfont{
                margin-right: 10px;

                font-size: 20px;
            }
        }
        .el-aside{
            background: rgba(0,0,0,.3);
        }
        .el-menu{
            height: 100%;
            background: rgba(0,0,0,.3);

            border-right: none;
        }
        .el-menu-item{
            color: #ffffff;
        }
        .el-menu-item:hover{
            background: rgba(0,0,0,.6);
        }
        .el-submenu__title{
            color: #ffffff;
        }
    }
</style>