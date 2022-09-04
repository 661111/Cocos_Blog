<template>
<!--  <NavMenu  class="top-nav-wrapper-master"  />-->
  <div class="wrap">
<div class="wrapper">
  <SiderMenu class="leftRow"/>


<div class="content mainRow">
        <router-view />
</div>
  <a-back-top />
  <Footer />
</div>
  </div>
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
<style lang="less"   scoped>
//.top-nav-wrapper-master {
//  position: fixed;
//  max-width: 100%;
//  width: 100%;
//  background: rgba(255, 255, 255, 0.7);
//  -webkit-backdrop-filter: saturate(200%) blur(20px);
//// box-shadow: 0px 0px 15px -5px rgb(0 0 0 / 15%);
//  backdrop-filter: saturate(200%) blur(20px);
//  height: 50px;
//  left: 50%;
//  top: 0px;
//  transform: translateX(-50%);
//  z-index: 999;
//}
.wrap {
  //margin: 0 5rem 0;
}
.wrapper {
  max-width: 110rem;
  min-width: 100rem;
  display: flex;
  justify-content: space-between;
  margin: 0px auto;
  box-sizing: content-box;
  padding: 0px 1rem 1rem 1rem;

  .leftRow {
    position: fixed;
    width: 22.5rem;
    height: 100%;
    scrollbar-color: transparent transparent;
    scrollbar-track-color: transparent;
    -ms-scrollbar-track-color: transparent;
  }
  .mainRow{
    width: calc(100% - 24rem);
    margin-left: 24rem;
    margin-top: 5rem;
    padding: 2rem;
    height: auto;
    background: @bgColor;
    box-shadow: @boxShadow;
  }
}

@media screen and (max-width: 1200px) {
  .wrapper {
    padding: 0px 14px;
    box-sizing: border-box;
  }
  .leftRow {
    margin-left: 0;
  }
}
@media screen and (max-width: 1025px) {
  .wrapper {
    max-width: 100%;
    min-width: 100%;
    width: 100%;
    padding: 0px 10px;
    .leftRow {
      width: 100%;
      margin-left: 0px;
      margin-top: 0px;
      transition: opacity 0.25s;
    }
    .mainRow {
      width: 100%;
      margin-left: 0px;
      margin-top: 70px;
      transition: opacity 0.25s;
    }
  }

  }
</style>