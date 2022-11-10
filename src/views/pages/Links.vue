<template>
<div class="linksMain">
  <div  v-if="sort_data.length != 0">
    <a-divider orientation="left">{{sort_data[0].name}}</a-divider>
    <div>
      <a-row :gutter="[24,8]">
        <a-col :span="8" v-show="item.is_show == 1" v-for="(item, index) in sort_data[0].data" :key="index">
          <a-card hoverable style="width: 24rem">
            <a :href="item.url" >
              <div class="cardCover">
                <img alt="example" :src="item.head_img || null"/>

                <a-card-meta :title="item.name || '友链名称'">
                  <template #description>{{item.description || '这个人很懒，什么都没留下！'}}</template>
                </a-card-meta>
              </div>
            </a>
          </a-card>
        </a-col>
      </a-row>
    </div>
  </div>
  <div v-if="sort_data.length >= 2 ">
    <div v-for="(sort,index) in sort_data.slice(1,sort_data.length)" :key="index">
      <div v-if="sort_data.count != 0">
        <a-divider orientation="left">{{ sort.name }}</a-divider>
        <a-row :gutter="[24,8]">
          <a-col :span="8" v-show="item.is_show == 1" v-for="(item, index) in sort.data" :key="index">
            <a-card hoverable style="width: 24rem">
              <a :href="item.url" >
                <div class="cardCover">
                  <img alt="example" :src="item.head_img || null"/>

                  <a-card-meta :title="item.name || '友链名称'">
                    <template #description>{{item.description || '这个人很懒，什么都没留下！'}}</template>
                  </a-card-meta>
                </div>
              </a>
            </a-card>
          </a-col>
        </a-row>
      </div>
    </div>
  </div>
</div>
</template>

<script>

import { Row,Col,Card } from "ant-design-vue";
import {onMounted, reactive, toRefs} from "vue";
import {useStore} from "vuex";
import {GET} from "@/utils/http/request";

export default {
  name: "Links",
  components: {
    Row,
    Col,
    Card,
  },

  setup () {
    const state = reactive ({
      sort: [],
      sort_data:[],
      links_data: [],
      // links_chart: [],
      links_page: "",


    })

    const store = useStore()
    const methods = {
      initData () {
        methods.getSortData()
        methods.getLinksPage()
      },
        getSortData(){
        let params = {limit: 999, order:"create_time asc "}
        GET('links-sort', {
          params
        }).then(res => {
          if (res.data.code == 200) {
            state.sort = res.data.data.data
            console.log(res.data.data)
            state.sort.forEach((item, index) => {
              methods.getLinksList(item.id, index, item.name)
            })
          }
        })
      },
        // `sort_id,=,${sort_id};is_show,=,1`
      getLinksList( sort_id, index, name){
        let params = {whereOr:`sort_id=${sort_id}` ,order: "create_time asc",limit: 9999,}
        GET('links/sql',{
          params
        }).then(res => {
          if (res.data.code == 200) {
            console.log(res.data.data)
            res.data.data.index = index
            res.data.data.name = name
            state.sort_data = state.sort_data.concat(res.data.data)
            state.sort_data = state.sort_data.sort(methods.sortBy('index'))
          }
        })
      },
      sortBy (field) {
        return (x, y) => {
          return x[field] - y[field]
        }
      },
      getLinksPage () {
        const params = { alias: 'links' }
        GET('page', { params }).then(res => {
          if (res.data.code == 200) {
            state.links_page = res.data.data
            // 设置页面 title
            document.title = state.links_page.title + ' - ' + store.state.cocos_config.basic.site.title
          }
        })
      },

    }
    onMounted(() => {
      methods.initData()
    })

    return { ...toRefs(state), methods }
  }

}
</script>

<style lang="less" scoped>
linksMain {
  position: inherit;
}
.cardCover{
  margin: 0;
  padding: 0;
  text-align: center;
  img{
    width: 4rem;
    border-radius: 5rem;
  }
}
</style>