<template>
    <div class="button-father">        
        <div :class="'my-button' + (light ? ' light' : '') + (shadow ? ' shadow' : '') + (fade ? ' fade' : '') + (ellipse ? ' ellipse' : '')">
            {{ title }}
            <p class="type-number">{{ typeNumber }}</p>
            <p class="close" @click="deleteFunc" v-if="typeNumber !== ''"></p>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        typeNumber:{
            type:String,
            default:''
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
        },
        ellipse:{
            type:Boolean,
            default:true
        }
    },
    data(){
        return{
        }
    },
    methods:{
        deleteFunc(){
            this.$emit('del')
        }
    }
}
</script>

<style scoped lang="less">
// mixin
@import "../../style/index.less";
.button-father{
    display: inline-block;
    padding: 10px 0 0;
    position: relative;
    .type-number{
        top:-12px;
        left:0;
        font-size: 12px;
        color: #7D7D7D;
        position: absolute;
        line-height: 1;
        width: 100%;
        text-align: center;
    }
    .close{
        top:-10px;
        right:-8px;
        width: 16px;
        height: 16px;
        background-color: #fff;
        .background_image_init_mixin(@url:@icon_021, @bp_x:center, @bp_y:center, @bs:16px 16px);
        position: absolute;
    }
}
.my-button{
    position: relative;
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
        // padding: 6px 12px;
        border-color: #FBB498;
    }
    &.shadow{
        border-width: 0;
        box-shadow: 0 8px 24px 0 rgba(208,212,227,0.50);
    }
    &.fade{
        border-width: 0;
    }
    &.ellipse{
        border-radius: 13px;
    }
}
</style>