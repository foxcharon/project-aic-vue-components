<template>
    <div class="mark-data-box">
        <div class="box-inner" @click="pageJump(boxIndex)">
            <p class="title">{{ boxData.name }}</p>
            <p class="number">{{ boxData.tagNum }}{{ typeof boxData.tagNum === "number" && typeof boxData.imgCount === "number" ? '／' : ''}}{{ boxData.imgCount }}</p>
        </div>
        <div v-show="canDel" :class="'del' + (unlock ? ' unlock' : '')" @click="delFunc(boxIndex)"></div>
    </div>
</template>

<script>


export default {
    props:{
        boxData:{
            type:Object,
            default:{}
        },
        boxIndex:{
            type:Number,
            default:null
        },
        canDel:{
            type:Boolean,
            default:true
        },
        unlock:{
            type:Boolean,
            default:false
        },
    }, 
    data(){
        return{

        }
    },
    methods:{
        delFunc(index){
            this.$emit('del', index)
        },
        pageJump(index){
            this.$emit('jump', index)
        }
    },
    created(){
        // console.log("boxData")
        // console.log(this.boxData)
    }
}
</script>


<style scoped lang="less">
// mixin
@import "../../style/index.less";
.del(){
    @w:16px;
    width:@w;
    height:@w;
    top:-@w/2;
    right:-@w/2;
    background-color: #FFFFFF;
    position: absolute;
    display: block;
    z-index: 10;
    content: ' ';
    .background_image_init_mixin(@icon_021, center, center, 16px 16px)
}
.mark-data-box{
    position: relative;
    width: 11.363%;
    height: 100px;
    background: #FFFFFF;
    box-shadow: 0 8px 24px 0 rgba(208,212,227,0.50);
    border-radius: 5px;
    margin:0 3.409% 2.272% 0;
    flex-shrink:0;
    cursor: pointer;
    .background_image_init_mixin(@icon_009, center, 18px, 32px 28px);
    &:nth-child(7n){
        margin-right: 0;
    }
    .box-inner{
        width: 100%;
        height: 100%;
    }
    p{
        font-size: 12px;
        color: #7D7D7D;
        letter-spacing: 0.13px;
        text-align: center;
        line-height: 15px;
        &.title{
            padding: 57px 0 0;
            // EDIT ===>>> 0516
            white-space:nowrap; 
            overflow:hidden;
            text-overflow:ellipsis;
            // EDIT ===>>> END
        }
    }
    .del{
        .del();
        display: none;
        &.unlock{
            background-image: @icon_036;
            background-size: 14px 16px;
            width: 14px;
        }
    }
    &:hover{        
        border:1px solid #FE6225;
        .del{
            display: block;
        }
    }
}

</style>
