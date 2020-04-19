<template>
    <div class="input-control color-input">
        <input :value="value"
               :id="id"
               :style="commonStyleGetter"
               type="button"
               class="jscolor-input {hash:true,styleElement:'',onFineChange:'jsColorOnFineChange(this)'}"
               @change="onChange($event.target)"
               @input="onChange($event.target)"
               @focus="showColorPicker"
               @blur="hideColorPicker"
               @onFineChange="onFineChange"
               ref="color_input"
               maxlength="7"
        />
        <span class="color-value" ref="color_span" @click="showColorPicker"></span>
    </div>

</template>

<script>
const iconString = require('../../assets/icon_028.png')
    // import jscolor from './../plugins/jscolor/jscolor.js';
    // import jscolor from '../../../static/jscolor/jscolor.js';
    import jscolor from 'jscolor-picker';
    export default {
        name: 'jscolor',
        data(){
            return {
                // iconString: require('../../assets/icon_028.png'),
                color: '',
                commonStyle:{
                    width:'40px',
                    fontSize:'0',
                    height:'40px',
                    margin: '0',
                    padding: '0',
                    border: '1px solid #EEEEEE', //自定义边框
                    outline: 'none',    //消除默认点击蓝色边框效果
                    borderRadius:'50%',
                    backgroundImage:`url(${require('../../assets/icon_028.png')})`,
                    backgroundSize: '24px 24px',
                    backgroundPosition:'center center',
                    backgroundRepeat:'no-repeat',
                    cursor:'pointer'
                },
                normalStyle:{
                    backgroundColor:'#FE6225'
                }
            }
        },
        props: [
            'value',
            'id',
            'styleStatus'
        ],
        computed:{
            commonStyleGetter(){
                return {
                    ...this.commonStyle,...this.normalStyle
                }
            }
        },
        watch:{
            styleStatus:function(new_value, old_value){
                if (new_value) {
                    // alert(new_value)
                } else {
                    // alert(new_value)
                }
            }
        },
        methods: {
            onChange(target){
                this.color = target.jscolor.toHEXString();
                this.$refs.color_span.style.backgroundColor = this.color;
                this.$emit('input', this.color);
            },
            onFineChange(e){
                this.color = '#' + e.detail.jscolor;
                this.$refs.color_span.style.backgroundColor = this.color;
                this.$emit('input', this.color);
            },
            showColorPicker(){
                console.log("show")
                this.$refs.color_input.jscolor.show();
            },
            hideColorPicker(){
                console.log("hide")
            }
        },
        mounted: function () {
            window.jscolor.installByClassName('jscolor-input');
        },
        updated: function () {
            this.$refs.color_span.style.backgroundColor = this.value;
        }
    }
    window.jsColorOnFineChange = function(thisObj){
        thisObj.valueElement.dispatchEvent(new CustomEvent("onFineChange", {detail: {jscolor: thisObj}}));
    }
</script>