<template>
  <NavMenu/>
  <router-view/>
</template>

<script>
import NavMenu from '@/components/NavMenu.vue'
export default {
name:'Base',
  components:{
  NavMenu
  },
data(){
}
}

</script>
<style   scoped>
</style>