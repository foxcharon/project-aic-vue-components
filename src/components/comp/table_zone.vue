<template>
    <div class="table-zone" :class="tableNpBoolean ? ' table-np' : ''">
        <div class="table-box" v-if="displayBoolean">            
            <Table 
            tooltip-theme="light"
            :columns="column" 
            :height="height" 
            :data="table" 
            @on-selection-change="onSelectionChangeFunc" 
            @on-row-click="onRowClickFunc"
            ></Table>            
        </div>
        <!-- EDIT ===>>> 0527 -->
        <div v-if="!displayBoolean" class="no-data-zone">
            {{ noDataWord }}
        </div>
        <!-- EDIT ===>>> END -->
        <div class="page-zone" v-if="displayPageBoolean">
            <Page
            :current.sync="item.pageNum"
            :page-size="5"
            :total="item.total" show-total prev-text="上一页" next-text="下一页" 
            @on-change="pageChangeFunc">
                <span></span>
            </Page>
        </div>
    </div>    
</template>

<script>
export default {
    // props: ['item'],
    props:{
        // EDIT ===>>> 0527
        noDataWord:{
            type:String,
            default:'暂无数据'
        },
        // EDIT ===>>> END
        item:{
            type:Object
        },
        column:{
            type:Array
        },
        table:{
            type:Array
        },
        displayBoolean:{
            type:Boolean,
            default:false
        },
        displayPageBoolean:{
            type:Boolean,
            default:true
        },
        tableNpBoolean:{
            type:Boolean,
            default:false
        },
        height:{
            default:'auto'
        }
    },
    data(){
        return{
            tableHeightNumber:395 - 70
        }
    },
    methods:{
        pageChangeFunc(now_page){
            this.$emit('page_change', now_page)
        },
        onSelectionChangeFunc(selection){
            this.$emit('on_selection_change', selection)
        },
        onRowClickFunc(row, index){
            this.$emit('on_row_click', row, index)
        },
        getCurrentPageFunc(){

        }
    }
}
</script>


<style scoped lang="less">
// mixin
@import "../../style/index.less";


.table-zone{
    padding: 0 40px;
    &.table-np{
        padding: 0;
    }
    // .table-box{

    // }
    .page-zone{
        width: 100%;
        height:100px;
        padding: 0px 0px 0 0;
        display: flex;
        flex-direction: row-reverse;
        position: absolute;
        left: 0;
        bottom:0;
    }
    // EDIT ===>>> 0527
    .no-data-zone{
        text-align: center;
        padding: 100px 0 0;
        color: #7D7D7D;
    }
    // EDIT ===>>> END
}

</style>
