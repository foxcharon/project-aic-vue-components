<template>
    <Tooltip v-if="interfaceClass2 === ''" placement="top" theme="light" :content="nameMap[interfaceClass]" transfer >
        <div :class="'my-button ' + interfaceClass + ' ' + interfaceClass2">
            
        </div>
    </Tooltip>
    <Tooltip v-else placement="top" theme="light" :content="nameMap[interfaceClass] + nameMap2[interfaceClass2]" transfer >
        <div :class="'my-button ' + interfaceClass + ' ' + interfaceClass2">
            
        </div>
    </Tooltip>
</template>

<script>
export default {
    props:{
        interfaceClass:{
            type:String,
            default:''
        },
        interfaceClass2:{
            type:String,
            default:''
        }
    },
    data(){
        return{
            // interfaceClass
            // add
            // delete
            // exit
            // pause
            // start
            // model_test
            // refresh
            // show
            // hidden
            nameMap:{
                add:'新增',
                add2:'获取',
                add3:'上传',
                exit:'退出',
                // EDIT ===>>> 0517
                exit2:'返回上一级',
                // EDIT ===>>> END
                show:'显示AI结果',
                show2:'查看测试任务',
                show:'显示AI结果',
                hidden:'隐藏AI结果',
                delete:'删除',
                start:'任务开始',
                pause:'任务暂停',
                model_test:'模型测试',
                refresh:'刷新',
                // EDIT ===>>> 0521
                lock:'锁定',
                unlock:'解锁',
                // EDIT ===>>> END

                _test:'切图/缩放'
            },
            nameMap2:{
                member:'成员',
                data:'数据',
                test_data:'测试数据',
                mark_type:'标签',
                mark:'标注任务',
                model:'训练任务',
                test_task:'测试任务',
            },
        }
    },
    methods:{
        
    },
    created(){
        // console.log(this.interfaceClass)
    }
}
</script>

<style scoped lang="less">
// mixin
@import "../../style/index.less";

.my-button{
    .background_image_init_mixin(@url:none, @bp_x:center, @bp_y:center, @bs:50%);
    border: 1px solid #EEEEEE;
    cursor: pointer;
    width: 40px;
    height: 40px;
    background-color: #FE6225;
    border-radius: 50%;
    display: inline-block;

    // EDIT ===>>> 0528
    &:hover{
        background-color:#FF965C;
    }
    // EDIT ===>>> END

    // 添加
    &.add{
        background-image: @icon_003;
    }
    // 添加 标注列表用
    &.add2{
        background-image: @icon_003;
    }
    // 添加 训练模型测试记录用
    &.add3{
        background-image: @icon_003;
    }
    // 删除
    &.delete{
        background-image: @icon_004;
    }
    // 退出
    &.exit{
        background-image: @icon_018;
    }
    &.exit2{
        background-image: @icon_033;
    }
    // 暂停
    &.pause{
        background-image: @icon_024;
        background-size: 10px 16px;
    }
    // 开始
    &.start{
        background-image: @icon_023;
        background-size: 10px 16px;
        background-position: 55% center;
    }
    // 模型测试
    &.model_test{
        background-image: @icon_022;
    }
    // 刷新
    &.refresh{
        background-image: @icon_027;
    }
    // 显示
    &.show, &.show2{
        background-image: @icon_025;
    }
    // 隐藏
    &.hidden{
        background-image: @icon_026;
    }
    // 锁定
    &.unlock{
        background-image: @icon_034;
    }
    // 解锁
    &.lock{
        background-image: @icon_035;
    }
}
</style>