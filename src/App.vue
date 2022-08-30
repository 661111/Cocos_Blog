<script setup>
import { RouterView } from 'vue-router';
import Audio from "@/components/tool/Audio.vue";




    console.log("%c Cocos主题%c version - " + INIS.version,
        "color:white;background:#313a46;padding:3px 7px;border-top-left-radius: 3px;border-bottom-left-radius: 3px;",
        "color:white;background:#f759ab;padding:3px 7px;border-top-right-radius: 3px;border-bottom-right-radius: 3px;"
    )

</script>

<template>
<Audio/>
  <RouterView/>
</template>

<style lang="less" scoped>
@bgColor: #EEEEEE;
</style>
