<template>
  <NavMenu  class="top-nav-wrapper-master"  />

  <SiderMenu class="leftRow"/>


<div class="mainRow">
        <router-view />
</div>
  <a-back-top />
<Footer />

</template>

<script>
import NavMenu from '@/components/NavMenu.vue'
import SiderMenu from "@/components/SiderMenu.vue";
import Footer from "@/components/Footer.vue";
import {mapState} from "vuex";
import store from "@/store";
import {inisHelper} from "@/utils/helper/helper.js";
import {Layout,BackTop} from "ant-design-vue";

const LayoutHeader = Layout.Header
const LayoutContent = Layout.Content
const LayoutSider = Layout.Sider
const LayoutFooter = Layout.Footer

export default {
name:'Base',
  components:{
    NavMenu,
    SiderMenu,
    Audio,
    Footer,
    Layout,
    ABackTop: BackTop,
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
  background: rgba(255, 255, 255, 0.7);
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
  position: absolute;
  width: auto;
  max-height: 80%;
  scrollbar-color: transparent transparent;
  scrollbar-track-color: transparent;
  -ms-scrollbar-track-color: transparent;
}
.mainRow{
  width: calc(85% - 325px);
  margin-left: 325px;
  margin-top: 50px;
  padding: 10px;
  height: auto;
  border-radius: 10px;

}
</style>