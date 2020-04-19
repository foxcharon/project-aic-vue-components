<template>
    <div :class="
    'my-mark-button ' 
    + (mark ? 'mark ' : '') 
    + (menu ? 'menu ' : '')
    + (light ? 'light ' : '') 
    + (disable ? 'disable ' : '')
    + (x2 ? 'x2 ' : '')
    "
    >
        <!--  -->
        <span v-if="type === 'rect'" class="icon rect"></span>
        <span v-if="type === 'rect'">矩形</span>
        <!--  -->
        <span v-if="type === 'ellipse'" class="icon ellipse"></span>
        <span v-if="type === 'ellipse'">椭圆</span>
        <!--  -->
        <span v-if="type === 'polygon'" class="icon polygon"></span>
        <span v-if="type === 'polygon'">多边形</span>
        <!--  -->
        <span v-if="type === 'left'" class="icon left"></span>
        <span v-if="type === 'left'">上一例</span>
        <!--  -->
        <span v-if="type === 'up'" class="icon up"></span>
        <span v-if="type === 'up'">上一张</span>
        <!--  -->
        <span v-if="type === 'down'" class="icon down"></span>
        <span v-if="type === 'down'">下一张</span>
        <!--  -->
        <span v-if="type === 'right'" class="icon right"></span>
        <span v-if="type === 'right'">下一例</span>
        <!--  -->
        <span v-if="type === 'save'" class="icon save"></span>
        <span v-if="type === 'save'">保存数据</span>
        <!--  -->
        <span v-if="type === 'complete'" class="icon complete"></span>
        <span v-if="type === 'complete'">序列完成</span>
        <!-- 切图 -->
        <span v-if="type === 'change'" ></span>
        <span v-if="type === 'change'">序列</span>
        <!-- 缩放 -->
        <span v-if="type === 'zoom'" ></span>
        <span v-if="type === 'zoom'">缩放</span>
        <!-- 绘制标注 -->
        <span v-if="type === 'tag'" ></span>
        <span v-if="type === 'tag'">绘制标注</span>
    </div>    
</template>

<script>
export default {
    props:{
        light:{
            type:Boolean,
            default:false
        },
        disable:{
            type:Boolean,
            default:false
        },
        mark:{
            type:Boolean,
            default:false
        },
        menu:{
            type:Boolean,
            default:false
        },
        type:{
            type:String,
            default:''
        },
        x2:{
            type:Boolean,
            default:false
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

@base_button_height:39px;

.my-mark-button{
    text-align: center;
    border: 1px solid #D0D0D0;
    border-radius: 5px;
    font-size: 12px;
    color: #7d7d7d;
    letter-spacing: 0.09px;
    cursor: pointer;
    vertical-align: 0;
    height: @base_button_height;
    line-height: @base_button_height;
    // EDIT ===>>> 0513
    &.x2{
        height: @base_button_height * 2;
        line-height: @base_button_height * 2;
    }
    // EDIT ===>>> END
    &.mark{
        // EDIT ===>>> 0513
        // width:150px;
        // flex:1 1 150px;
        // EDIT ===>>> END
    }
    &.menu{
        // width: 116px;
        // height: @base_button_height * 2;
        // line-height: @base_button_height * 2;
    }
    // EDIT ===>>> 0513
    // &.left, &.right{
    //     height: @base_button_height * 2;
    //     line-height: @base_button_height * 2;
    // }
    // EDIT ===>>> END
    &.disable{
        cursor: default;
        background-color: #EFEFEF;
    }
    &.light{
        background-image: linear-gradient(-270deg, #FF965C 0%, #FE6225 100%);
        border-color:#fff;
        color: #fff;
        .icon{
            &.rect{
                background-image: @icon_011_b;
            }
            &.ellipse{
                background-image: @icon_012_b;
            }
            &.polygon{
                background-image: @icon_013_b;
            }
        }
    }
    .icon{
        @width:12px;
        @height:12px;
        margin: 0 5px 0 0;
        .background_image_init_mixin(@bs:@width @height);
        width: @width;
        height: @height;
        display: inline-block;
        vertical-align: -1px;
        &.rect{
            background-image: @icon_011_a;
        }
        &.ellipse{
            background-image: @icon_012_a;
        }
        &.polygon{            
            background-image: @icon_013_a;
        }
        &.left{
            background-image: @icon_015_a;
        }
        &.right{
            background-image: @icon_014_a;
        }
        &.up{
            background-image: @icon_031;
        }
        &.down{
            background-image: @icon_032;
        }
        &.save{
            background-image: @icon_016_a;
        }
        &.complete{
            background-image: @icon_016_a;
        }
    }
}
</style>