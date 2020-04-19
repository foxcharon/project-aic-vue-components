<template>
    <div class="bottom-topic-list" v-show="!isEmpty">
        <div class="comp-inner">
            <div class="left-arrow" @click="pervPageFunc"></div>  
            <div class="right-arrow" @click="nextPageFunc"></div>
            <div class="button-zone" v-if="bool">
                <!-- <my-button :style="{padding:'10px',margin:'0'}" title="这是一个很长的标题" :fade="true" /> -->
                <!-- <Tooltip :content="item.projectName"> -->
                    <my-button 
                    :style="{margin:'0'}" 
                    :title="item.projectName"
                    :light="item.islight"
                    :fade="!item.islight"
                    is-bottom-horizon
                    v-for="(item, index) in topicData.list"
                    :key="index"
                    @click.native="changeTopicFunc(item, index)" 
                    />
                    
                <!-- </Tooltip> -->
                <!-- <my-button :style="{padding:'10px'}" title="课题三" /> -->
            </div>
        </div>
    </div>
</template>

<script>

import { api_getProjectFunc, api_commonDelFunc } from '@/public_api.js'
import { topicListRowNumber } from '@/object_template/table_template.js'
import { urlStringObject } from '@/object_template/form_template.js'
import MyButton from '../comp/my_rect_button';

export default {    
    data(){
        return{
            // 取了几个课题？
            topicDataListLength:0,
            // 如果发现没有课题，则isEmpty为true
            isEmpty:false,
            bool:true,
            isLightIndex:0,
            test:['1','2','3'],
            routeArray:[],
            oldProjectIdString:"",    // 删除用
            // newProjectIdString:"",    // 删除用
            nowProjectIdString:"",    // 切换课题验证用
            newProjectNameString:"",
            // 如果topicData.pageSize存在，则这个已经取过了
            topicData:{
                list:[]
            }
        }
    },
    watch:{
        isEmpty:function(new_value, old_value){
            // alert("?")
            if (new_value) {
                // alert(2)
                // EDIT ===>>> 0511
                this.topicData.list = []
                this.topicData.pageSize = -999
                this.TopicIsNoneStatusControlFunc()
                // EDIT ===>>> END
            }
        },
        // EDIT ===>>> 0514
        '$store.state.nowTopicObject':function(new_value, old_value){
            console.log("69===TOPIC CHANGE===")
            // console.log(this.$store.state.theUserDataObj)
            // 检查当前用户能不能删除当前课题
            this.displayTopicDeleteButtonFunc()            
        },
        '$store.state.theUserDataObj':function(new_value, old_value){
            console.log("75===USER CHANGE===")
            // console.log(this.$store.state.theUserDataObj)
            // 检查当前用户能不能删除当前课题
            this.displayTopicDeleteButtonFunc()            
        }
        // EDIT ===>>> END
        // topicDataListLength:function(new_value, old_value){
        //     // 如果没有课题
        //     // 显示缺省遮罩
        //     // 不显示顶部按钮
        //     if ((new_value === 8) && (typeof this.topicData.pageSize === "number")) {
                
        //     } else {
                
        //     }
        // }
    },
    methods:{
        // EDIT ===>>> 0514
        displayTopicDeleteButtonFunc(){
            let boolean
            if (!this.checkTopicCanDeleteFunc()) {
                boolean = false                
            } else {
                boolean = true                
            }
            this.$store.dispatch('setTheUserEditTheTopicBooleanAction', {
                theUserEditTheTopicBoolean:boolean
            })
            this.$parent._data.buttonDataArray.forEach((item) => {
                if (item.isAction && item.actionWord === "delete") {
                    item.isShow = boolean
                }
            })
        },        
        checkTopicCanDeleteFunc(){
            // return true
            // check 没有课题
            // 或者没有菜单
            // 或者没有权限
            // 或者没有删这个课题的权限
            if (this.topicData.list.length === 0) {
                console.log(1)
                return false
            }
            if (this.$parent._data.buttonDataArray.length === 0) {
                console.log(2)
                return false
            }
            if (!this.$store.state.theUserDataObj.code) {
                console.log(3)
                return false
            }
            if (!this.$store.state.nowTopicObject.createUser) {
                console.log(4)
                return false
            }
            if (
                ((arr) => {
                    // alert(5.1)
                    // console.log(arr)
                    if (!arr || arr.length === 0) {
                        return false
                    } else {
                        for (let i in arr) {
                            if (arr[i] === "project:index:del") {
                                return true
                            }
                        }
                        return false
                    }
                })(this.$store.state.subKeyArray)
            ) {
                if (this.$store.state.nowTopicObject.createUser === this.$store.state.theUserDataObj.code) {
                    return true
                }
                console.log(6)
                return false
            } else {
                console.log(5)
                return false
            }
        },
        // EDIT ===>>> END
        ajax_dispatch(boolean){
            this.$store.dispatch('setAjaxStatusAction', {
                ajaxStatus:boolean
            })
        },
        // 如果没有课题
        // TopicIsNoneStatus true
        // 显示缺省遮罩
        // 不显示顶部按钮
        TopicIsNoneStatusControlFunc(){
            const length = this.topicDataListLength
            // alert(length === 0)
            // alert(typeof this.topicData.pageSize === "number")
            if ((length === 0) && (typeof this.topicData.pageSize === "number")) {
                // alert("!!!")
                this.$store.dispatch('setTopicIsNoneStatusAction', {
                    TopicIsNoneStatus:true,
                    topMenuDisplayStatus:false,
                    TopicIsNoneBlockDisplayStatus:true
                })
            } else {
                
            }
        },
        topicTitleGetter(){
            
            // console.log(this.topicData.list)
            const l = this.topicData.list
            for (let x in l) {
                if (l[x].islight) {
                    return l[x].projectName
                }
            }
        },
        // projectId 课题id
        // projectName 课题名称
        setNowTopicToStoreFunc(item){
            this.$store.dispatch('setTopicObject', item)
        },
        getTablePageFunc(now_page){
            if (this.topicData.list.length === 0 || !now_page) {
                // console.log("当前不指定页码")
                return 1
            } else {
                // console.log("当前指定页码！")
                return now_page
            }
        },
        // x === 0 初次进入项目
        // x === 1 翻页
        // x === 2 删除课题后重新取课题
        getFunc(x, page){
            const re = 
            {
                "page": this.getTablePageFunc(page),
                "rows": topicListRowNumber
            }
            // console.log("api_getProjectFunc", new Date().getTime())
            api_getProjectFunc(this, re).then((res) => {
                // EDIT ===>>> 0430
                let light_boolean = true
                // setLightFunc
                const setLightFunc = (item, index, light_boolean, this_arr) => {
                    // console.log("===99 ", item.projectName)
                    if (light_boolean) {
                        item.islight = true
                        item.isLightIndex = index
                        this.nowProjectIdString = item.projectId
                    }                    
                }
                // EDIT END
                // 测试缺省状态
                if (res[0] === 200 && res[1].list.length > 0) {
                    // EDIT ===>>> 0511
                    this.isEmpty = false
                    // EDIT ===>>> END
                    this.topicData = res[1]
                    this.topicDataListLength = res[1].list.length
                    // 判断是否显示缺省遮罩和顶部按钮是否显示
                    this.TopicIsNoneStatusControlFunc()
                    // EDIT ===>>> 0430
                    // this.topicData.list.length = res[1].list.length
                    // EDIT ===>>> END
                    this.topicData.list = res[1].list.map((item, index, this_arr) => {  
                        // console.log(item)                      
                        // 删除后取新列表中的第一个课题
                        if (x === 2 && index === 0) {
                            this.newProjectIdString = item.projectId
                            // this.newProjectNameString = item.projectName

                            this.$store.dispatch('setTopicObject', item)
                        }
                        if (!item.projectName) {
                            item.projectName = "UNKNOWN"
                        }
                        // 临时的
                        // if (true) {
                        //     item.projectName = "TESTTESTTEST"
                        // }
                        // EDIT ===>>> 0430
                        // 删除后获取执行 item.projectId === this.newProjectIdString
                        // 其他执行 item.projectId === this.$route.params.id
                        if (item.projectId === this.$route.params.id) {
                            setLightFunc(item, index, light_boolean, this_arr)

                            // console.log("===>>>=== 118 ", x)
                            // console.log((item.projectId === this.$route.params.id), (item.projectId === this.newProjectIdString))                            
                            // item.islight = true
                            // item.isLightIndex = index
                            // this.nowProjectIdString = item.projectId
                            // 把当前|新的课题放进对象
                            // console.log(85)
                            // console.log(item)
                            // this.setNowTopicToStoreFunc(item)
                        } else if (item.projectId === this.newProjectIdString && x === 2) {
                            setLightFunc(item, index, light_boolean, this_arr)
                        } else {
                            item.islight = false
                        }
                        // EDIT END
                        return item
                    })
                    // 通知父亲 主题获取完毕 只在第一次进入的时候触发
                    if (x === 0) {
                        this.$parent._data.isReadyBoolean = true
                    }
                    if (x === 2) {                        
                        this.redirectNewTopicWhenDeleteTopic(this.routeArray)
                    }
                    if (x === 1) {
                        // 翻页成功后不会有课题处于点亮状态
                        this.reloadIsLightIndex()
                    }
                } else if (res[0] === 200 && res[1].list.length === 0) {
                    // alert("isEmpty")
                    this.topicDataListLength = 0
                    this.isEmpty = true
                }
            })
        },
        pervPageFunc(){
            if (this.topicData.pageNum < 2) {
                this.$Message.destroy()
                this.$Message.warning("已经是第一页")
                return
            }
            this.topicData.pageNum--
            this.getFunc(1, this.topicData.pageNum)
        },
        nextPageFunc(){
            if (this.topicData.list && this.topicData.list.length < topicListRowNumber) {
                this.$Message.destroy()
                this.$Message.warning("已经是最后一页")
                return
            }
            this.topicData.pageNum++
            this.getFunc(1, this.topicData.pageNum)
        },
        reloadIsLightIndex(){
            this.isLightIndex = 0
        },
        changeTopicFunc(item, index){
            // 点击自己时不做任何操作
            if (item.projectId === this.$route.params.id) {
                this.$Message.destroy()
                this.$Message.warning("您已经处于这个课题中")
                return
            }
            // console.log(item)
            // item.islight = true
            // item.islight = true
            // this.topicData.list[index].islight = true
            // this.topicData.list.length = 0
            // 取消向导状态
            // this.$route.params.isnew = 0
            // 点暗
            // alert(this.isLightIndex)

            this.topicData.list.map(item => {
                item.islight = false
            })

            // console.log("===>>>===175")
            // this.$set(this.topicData.list, this.isLightIndex, {...this.topicData.list[this.isLightIndex], islight:false})

            // this.topicData.list.forEach((item, index, this_arr) => {
            //     this.$set(this_arr, index, {...this.topicData.list[this.isLightIndex], islight:false})
            // })
            // 点亮
            this.$set(item, 'islight', true)
            this.$set(this.topicData.list, index, {...item})
            // 把当前|新的课题放进对象
            this.setNowTopicToStoreFunc(item)            
            // 更新isLightIndex
            this.isLightIndex = index
            this.$emit('change_topic', item)
        },
        // 修改课题基本信息后 修改课题栏的当前课题的名称
        changeTheTopicNameFunc(new_value){
            this.topicData.list.forEach((item, index) => {
                if (item.islight) {
                    // item.name = new_value
                    // this.$set(item, 'name', new_value)
                    this.$set(this.topicData.list, index, {...item, projectName:new_value})
                }
            })
            console.log(this.topicData.list)
        },
        // 删除课题
        // address route
        deleteTheTopicFunc(arr){
            console.log("136", arr)
            const url = urlStringObject.topic_index
            this.routeArray = arr
            // 课题ID 在数组的倒数第二个
            this.oldProjectIdString = arr[arr.length - 2]
            const re = [this.oldProjectIdString]
            if (!this.$store.state.ajaxStatus) {
                this.$Message.destroy()
                this.$Message.warning("您的操作太频繁，请稍候...")
                return false
            }
            this.ajax_dispatch(false)
            api_commonDelFunc(this, re, url).then((res) => {
                if (res[0] === 200) {
                    this.getFunc(2)

                    this.ajax_dispatch(true)
                } else {
                    this.ajax_dispatch(true)
                }
            })
        },
        redirectNewTopicWhenDeleteTopic(arr){
            let route_string = ""
            arr[arr.length - 2] = this.newProjectIdString
            // 如果处于向导状态，就回到普通状态
            if (arr[arr.length - 1] == 1) {
                arr[arr.length - 1] = 0
            }
            console.log("149", arr)
            const parseRoute = ((arr) => {
                arr.forEach((item, index) => {
                    if (index === 0) {
                        return
                    } else {
                        route_string += ('/' + item)
                    }                    
                })
            })(arr)
            console.log(route_string)
            this.$router.push(route_string)
        }
    },
    created(){
        this.ajax_dispatch(true)

        this.getFunc(0)
    },
    beforeDestroy(){
        
    },
    components:{
        MyButton
    }
}
</script>


<style scoped lang="less">
// mixin
@import "../../style/index.less";

.bottom-topic-list{
    position: absolute;
    box-sizing: border-box;
    padding: 0 83px 0 60px;
    width: 100%;
    height: 54px;
    left: 0;
    bottom: 0;
    .comp-inner{
        position: relative;
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        border: 1px solid #EEEEEE;
        background-color: #FFFFFF;
        border-bottom-width: 0;
        .button-zone{
            padding: 10px 37px 0;
        }
        .left-arrow,.right-arrow{
            .abs_ele_mixin(7px, 12px);
            top:21px;
            cursor: pointer;
        }
        .left-arrow{
            left: 20px;
            .background_image_init_mixin(@url:@icon_008,@bs:cover);
        }
        .right-arrow{
            right: 20px;
            .background_image_init_mixin(@url:@icon_007,@bs:cover);
        }
    }
}

</style>
