<template>
  <NavMenu/>
  <router-view/>
</template>

<script>
import NavMenu from '@/components/NavMenu.vue'
import {mapState} from "vuex";
import store from "@/store";
import {inisHelper} from "@/utils/helper/index.js";
export default {
name:'Base',
  components:{
  NavMenu
  },

  setup (){
    inisHelper.set.storage('inis',{'mobile':inisHelper.is.mobile()})
    store.dispatch('commitLogin')

},

  computed: {
    ...mapState(['cocos_config'])
  },
}

</script>
<style   scoped>
</style>