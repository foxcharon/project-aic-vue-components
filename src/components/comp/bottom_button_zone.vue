<template>
    <div class="bottom-button-zone" >
        <my-button 
        v-for="(item, index) in buttonData" 
        :key="index"
        :style="{padding:'10px 20px',
        margin:((index === buttonData.length - 1) && (buttonData.length > 1))
         ? '0 0 0 40px' : '0'}" 
        :title="item.title" 
        :light="item.class ? false : true"
        :shadow="item.class === 'shadow' ? true : false" 
        @click.native="handleClickLink(item.type)"
        />
    </div>    
</template>

<script>

import MyButton from '../comp/my_rect_button';

export default {
    props:{
        buttonData:{
            type:Array,
            default:[]
        }
    },
    data(){
        return{
            // data:['上一步', '下一步']
        }
    },
    methods:{
        handleClickLink(type){
            if (type === "submit") {
                this.$emit('post')
            }
            if (type === "back") {
                this.$emit('back')
            }
        }
    },
    components:{
        MyButton
    }
}
</script>


<style scoped lang="less">
// mixin
@import "../../style/index.less";


.bottom-button-zone{
    position: absolute;
    height: 80px;
    bottom: 0;
    left: 0;
    width: 20%;
    padding: 20px 0 0 40%;
    text-align: center;
    box-sizing: content-box;
}

</style>
