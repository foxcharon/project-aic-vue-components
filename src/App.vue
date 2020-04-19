<template>
  <div id="app">
    
  </div>
</template>

<script>

export default {
  name: 'App',
  data(){
    return {
      isReady:false 
    }
  },
  created(){

    // rem 适配
    (function(win) {
        var docEl = win.document.documentElement;
        function refreshRem() {
            var width = docEl.getBoundingClientRect().width;
            if (width >= 1920) {
                // 最大宽度
                width = 1920;
            }
            var rem = width / 19.2;
            if (rem > 100) {
                rem = 100;
            }
            docEl.style.fontSize = rem + "px";
            if (width < 960) {
                docEl.style.fontSize = 60 + "px";
            }
        }
        win.addEventListener(
            "resize",
            function() {
                refreshRem();
            },
            false
        );
        win.addEventListener(
            "pageshow",
            function(e) {
                if (e.persisted) {
                    refreshRem();
                }
            },
            false
        );
        refreshRem();
    })(window);    
    
  },
  mounted(){
    
  },
  methods:{
    
  },
  components: {
    
  }
}
</script>

<style lang="less">

</style>
