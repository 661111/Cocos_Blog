<template>
<div class="content menuList">
  <div class="listData">

    <div class="listData-wrapper" v-for="(item, index) in listData" :key="index">
        <router-link class="menu-child"   @click="active = item.path" :class="{ active: active == item.path }" :to="item.path">{{ item.title }}</router-link>
    </div>
  </div>
</div>
</template>

<script>
import {onMounted, reactive, toRefs} from "vue";

export default {
  name: "LeftMenu",
  setup () {
    const state = reactive({
      active: "",
      listData:[
        {

          path: '/',
          title: '主页',
          icon: '',
        },
        {

          path: '/links',
          title: '友链',
          icon: '',
        },
        {
          path: '_photos',
          title: '关于',
          icon: ''
        }
      ],
    })

const methods = {

      methods: {
    },

}
    onMounted(() => {

    })
    return { ...toRefs(state), methods }

  },
  // watch: {
  //   $route: function () {
  //     this.active = this.$route.path;
  //   },
  // },
  // mounted() {
  //   this.active = this.$route.path;
  // },
}
</script>

<style lang="less" scoped>
.menuList {
  width: 100%;
  //padding: 2rem;
  z-index: 999;
}
.listData{
  display: flex;
  flex-wrap: wrap;
  line-height: 30px ;
  .listData-wrapper{
    width: 100%;
    .menu-child {
      position: relative;
      display: flex;
      width: 100%;
        padding: 0px 5px 0px 40px;
      margin: 0px;
      font-size: 14px;
      background-image: none;
      text-align: left;
      height: 35px;
      color: #999;
      cursor: pointer;
    }
  }
  :hover {
    font-size: 15px !important;
    color: @link-color !important;
  }
  .active {
    background: rgba(0,0,0,0.2)!important;
    color: #000 !important;
    border-radius: .5rem;
  }
}
</style>