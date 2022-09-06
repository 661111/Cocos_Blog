<template>
  <div class="leftRow">
    <LeftMenu/>
    <Music/>
  </div>
</template>

<script>
import Music from "@/components/music/Music.vue";
import LeftMenu from "@/components/leftMenu/LeftMenu.vue";
export default {
  name: "SiderMenu",
  components: {
    LeftMenu,
    Music
  }
}
</script>
<style lang="less" scoped>
.leftRow{
  display: block;
  //margin-left: 12rem;
  padding: 50px 4px 4px 4px;
  box-sizing: border-box;
    div {
    margin-bottom: 1.5rem;
  }
   div:first-child {
    margin-top: 0rem;
  }
   div:last-child {
    margin-bottom: 5rem;
  }
}




@media screen and (max-width: 1025px) {
  .leftRow {
    display: none;
    padding: 50px 14px 14px 14px;
  }
   div {
    margin-bottom: 14px;
  }
   div:first-child {
    margin-top: 1rem;
  }
  div:last-child {
    margin-bottom: 50px;
  }
}


</style>