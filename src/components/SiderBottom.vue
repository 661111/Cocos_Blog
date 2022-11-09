<template>
<div class="content -bottom">


    <div style="display:inline">
      <span>{{checked ? "深色模式" : "浅色模式"}}</span>
      <div style="display:inline;float: right">
    <a-switch  v-model:checked="checked" @change="changeTheme" checked-children="🌙" un-checked-children="☀️" />
      </div>
    </div>
</div>
</template>

<script>
import {ref} from "vue";
import { toggleTheme } from '@zougt/vite-plugin-theme-preprocessor/dist/browser-utils.js'
import {message} from "ant-design-vue";
export default {
  name: "SiderBottom",

  setup() {
    // const themeTitle = ref("浅色主题")
    const checked = ref(false)
    const changeTheme = checked => {
      if (checked) {
        toggleTheme({
          scopeName: "darkTheme",
        })
        console.log("切换为深色主题");
        message.open({
          content:"切换为浅色主题",
          icon: () => "🌙️"
        });
      } else {
        toggleTheme({
          scopeName: "defaultTheme",
        })
        console.log("切换为浅色主题");
        message.open({
          content:"切换为浅色主题",
          icon: () => "☀️"
        });

      }
    };
    return{checked, changeTheme}
  }
}
</script>

<style scoped>

</style>