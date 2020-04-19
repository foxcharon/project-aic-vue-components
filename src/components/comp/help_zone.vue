<template>
    <div id="help_zone">
        <div class="main">
            <div class="inner">
                <div class="box">
                    <div class="core">
                        <Collapse                    
                        simple accordion>
                            <Panel
                            v-for="(item, index) in data"
                            :key="index" 
                            >
                                <span v-html="item.q"></span>
                                <p slot="content"> 
                                    <span v-html="item.a"></span>    
                                </p>
                            </Panel>
                        </Collapse>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'help_zone',
    props:{
        data:Array,
        default:[]
    },
    data(){
        return {
            
        }
    },
    created(){
    },
    components:{
        
    }
}
</script>

<style scoped lang="less">


#help_zone{
    width: 100%;
    height: 100%;
    .main,.inner,.box,.core{
        width: 100%;
        height: 100%;
    }
    .main{
        padding: 80px 100px;
        .inner{
            background: #FFFFFF;
            box-shadow: 0 8px 24px 0 rgba(208,212,227,0.50);
            border-radius: 5px;
            // margin: 20px 0;
            overflow-y: auto;
            // .core{
            //     // overflow-y: auto;
            // }
            .box{
                height: calc(100% - 40px);        
                margin:20px 0;
                padding: 0 168px;
                // .core{
                //     padding: 0 0 20px;
                // }
            }
        }
    }
} 
</style>