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

<style lang="scss" scoped>
.siderBox{
  margin-left: 60px;
  margin-top: 10px;
  padding: 0;
  display: flex;
  box-sizing: border-box;
  .sticky-music{
    width: 250px;
    height: 300px;
    border-radius: 10px;
  }
}

</style>