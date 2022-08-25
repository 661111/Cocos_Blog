<template>
  <NavMenu  class="top-nav-wrapper-master"  />

  <SiderMenu class="leftRow"/>


<div class="mainRow">
        <router-view />
</div>

<Footer />

</template>

<script>
import NavMenu from '@/components/NavMenu.vue'
import SiderMenu from "@/components/SiderMenu.vue";
import Footer from "@/components/Footer.vue";
import {mapState} from "vuex";
import store from "@/store";
import {inisHelper} from "@/utils/helper/index.js";
import {Layout} from "ant-design-vue";

const LayoutHeader = Layout.Header
const LayoutContent = Layout.Content
const LayoutSider = Layout.Sider
const LayoutFooter = Layout.Footer


export default {
name:'Base',
  components:{
    NavMenu,
    SiderMenu,
    Footer,
    Layout,
    ALayoutHeader: LayoutHeader,
    ALayoutContent: LayoutContent,
    ALayoutSider: LayoutSider,
    ALayoutFooter: LayoutFooter
  },

  setup (){
    inisHelper.set.storage('inis',{'mobile':inisHelper.is.mobile()})
    store.dispatch('commitLogin')

},
  methods:{

  },

  computed: {
    ...mapState(['cocos_config'])
  },
}

</script>
<style lang="scss"   scoped>
.top-nav-wrapper-master {
  position: fixed;
  max-width: 100%;
  width: 100%;
  background: rgba(255, 255, 255, 0.8);
  -webkit-backdrop-filter: saturate(200%) blur(20px);
// box-shadow: 0px 0px 15px -5px rgb(0 0 0 / 15%);
  backdrop-filter: saturate(200%) blur(20px);
  height: 50px;
  left: 50%;
  top: 0px;
  transform: translateX(-50%);
  z-index: 999;
}
.leftRow{
  position: fixed;
  width: 250px;
  height: 80%;
  z-index: 2;
  scrollbar-color: transparent transparent;
  scrollbar-track-color: transparent;
  -ms-scrollbar-track-color: transparent;
}
.mainRow{
  width: calc(100% - 32rem);
  margin-left: 32rem;
  margin-top: 57px;
  padding: 10px;
  height: auto;
  width: 955px;
  border-radius: 10px;
  background-color: #999999;
}
</style>