<template>
  <div class="siderBox">
    <div class="sticky-music">
<Music/>
    </div>
  </div>

</template>

<script>
import Music from "@/components/music/Music.vue";
export default {
  name: "SiderMenu",
  components: {
    Music
  }
}
</script>
<style lang="less" scoped>
.siderBox{
  position: relative;
  margin-left: 5rem;
  padding: 0;
  box-sizing: border-box;
  .sticky-music{
    width: 250px;
    height: auto;
    border-radius: 10px;
  }
}

</style>