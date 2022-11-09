<template>
<div class="footerBox">
  <div class="leftRow">
    <div  v-html="cocos_config.developer.footer.left"></div>
    <div>
      <a-tag color="blue">Riecko © 2022</a-tag>
    </div>
  </div>
  <div class="rightRow">
    <div  v-html="cocos_config.developer.footer.right"></div>
    <a-tag color="#d3adf7">
      <template #icon>
        <smile-outlined />
      </template>
      {{ cocos_config.basic.site.copy.code }}
    </a-tag>

  </div>

</div>
</template>

<script>
import {mapState} from "vuex";
import {Tag} from "ant-design-vue";
import { SmileOutlined } from "@ant-design/icons-vue"

export default {
  name: "Footer",
  components: {
    ATag:Tag,
    SmileOutlined,
  },
  computed: {
    ...mapState(['cocos_config']),
  },
}
</script>

<style lang="less" scoped>
.footerBox{
  position: fixed;
  bottom: 20px;
  .leftRow{
    z-index: 99;
  }
  .rightRow{
    position: fixed;
    z-index: 99;
    bottom: 20px;
    right: 0px;
  }
}
</style>