<template>
    <Tooltip :offset="-10" placement="top" theme="light" transfer v-if="isBottomHorizon">
        <div :style="{padding:'10px',maxWidth:'100px',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}" :class="'my-button' + (light ? ' light' : '') + (shadow ? ' shadow' : '') + (fade ? ' fade' : '')">
        <!-- <div :class="'my-button' + (light ? ' light' : '') + (shadow ? ' shadow' : '') + (fade ? ' fade' : '')"> -->
            {{ title }}
        </div>
        <div slot="content" :style="{whiteSpace:'normal', wordBreak: 'break-word'}">
            {{ title }}
        </div>
    </Tooltip>
    <div v-else :class="'my-button' + (light ? ' light' : '') + (shadow ? ' shadow' : '') + (fade ? ' fade' : '')">
        {{ title }}
    </div>
</template>

<script>
export default {
    props:{
        // 是不是用作底部课题栏
        isBottomHorizon:{
            type:Boolean,
            default:false
        },
        light:{
            type:Boolean,
            default:false
        },
        shadow:{
            type:Boolean,
            default:false
        },
        fade:{
            type:Boolean,
            default:false
        },
        title:{
            type:String,
            default:''
        }
    },
    data(){
        return{
        }
    },
    methods:{
        
    }
}
</script>

<style scoped lang="less">
// mixin
@import "../../style/index.less";

.my-button{
    border: 1px solid #D0D0D0;
    border-radius: 5px;
    font-size: 12px;
    color: #666;
    letter-spacing: 0.09px;
    padding: 5px 10px;
    margin: 0 20px 0 0;
    cursor: pointer;
    vertical-align: 0;
    display: inline-block;
    box-sizing: border-box;
    &.light{
        background-image: linear-gradient(-270deg, #FF965C 0%, #FE6225 100%);
        box-shadow: 0 2px 10px 0 #FBB498;
        color: #fff;
        padding: 6px 12px;
        border-width: 0;
    }
    &.shadow{
        border-width: 0;
        box-shadow: 0 8px 24px 0 rgba(208,212,227,0.50);
    }
    &.fade{
        border-width: 0;
        // EDIT ===>>> 0528
        &:hover{
            color:#FE6225;
        }
        // EDIT ===>>> END
    }
    // EDIT ===>>> 0528
    &:not(.light){
        &:hover{
            color:#FE6225;
            border-color:#FE6225;
        }
        // &:not(.shadow, .fade){
        //     &:hover{
        //         border-color:#FE6225;
        //     }
        // }
    }
    // EDIT ===>>> END
}
</style>