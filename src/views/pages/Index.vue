<template>

    <div class="articleBox"  v-for="data in article_data" :key="data.id">
      <div class="articleTitle">
        <router-link :to="{name: 'article', params: { id: data.id }}">
       <h3><a href="#">{{data.title}}</a></h3>
        </router-link>
      </div>
      <div class="articleTime">
        {{data.create_time}}
      </div>
      <div class="articleImg">
        <img :src="data.expand.img_src" height="100"/>
      </div>
<div class="articleD">
  {{data.description}}
</div>
      <a-divider style="height: 1px; background-color: #f759ab"/>
    </div>
<!--  <template v-for="data in article_data" >-->
<!--<div>-->
<!--    <a-list item-layout="vertical" size="large" :data-Source="article_data" v-for="data in article_data" :RowKey="article_data.id" >-->


<!--      <template #renderItem="{ item }"    >-->
<!--        <a-list-item key="item.title"  >-->
<!--          <template #actions>-->
<!--          标签-->
<!--          </template>-->

<!--          <template #extra>-->
<!--            <img-->
<!--                width="175"-->
<!--                height="125"-->
<!--                alt="logo"-->
<!--                :src="data.expand.img_src"-->
<!--            />-->
<!--          </template>-->

<!--          <a-list-item-meta :description="data.description">-->
<!--            <template #title>-->
<!--              <a href="#">{{ data.title }}</a>-->
<!--            </template>-->
<!--            <template #avatar>分类</template>-->
<!--          </a-list-item-meta>-->
<!--          {{ data.description }}-->
<!--        </a-list-item>-->
<!--      </template>-->

<!--    </a-list>-->
<!--</div>-->
<!--  </template>-->
</template>

<script>
import {GET} from "@/utils/http/request";
import store from "@/store";
import {mapState, useStore} from "vuex";
import {onMounted, reactive, toRefs} from "vue";
import {inisHelper} from "@/utils/helper";
import {Layout,Row,Col,List,Divider} from "ant-design-vue";

const LayoutContent = Layout.Content
const ListItem  = List.Item
const ListItemMeta = List.Item.Meta

export default {
name:'Index',
  components: {
    Layout,
    Row,
    Col,
    AList:List,
    ADivider: Divider,
    AListItem: ListItem,
    AListItemMeta: ListItemMeta,
  ALayoutContent: LayoutContent
  },
setup(){

  const store = useStore()
  const state = reactive({
    article: { page: 6 }, // 文章数据
    article_data: [], // 文章数据
    is_mobile: inisHelper.get.storage('inis', 'mobile'), // 是否为手机

  })
  const methods = {
    initData(){
      methods.getArticle()
    },

    getArticle(page = 1){
      if (page <= state.article.page) {
        if (page == state.article.page) state.last_page = true
        const params = { limit: 5, page }
        const headers = { 'login-token': `${store.state.login['login-token']}` }
        GET('article', {
          params, headers
        }).then((res) => {
          if (res.data.code == 200) {
            // 设置文章列表数据
            state.article = res.data.data
            state.article.data.forEach(item => {
              state.article_data.push(item)
            })
            // 设置当前分页码
            state.self_page = page
            // 设置页面 title
            document.title = store.state.cocos_config.basic.site.title
          }
        })
      } else state.last_page = true
    }
  }
  onMounted(() => {
    methods.initData()
  })
  return{...toRefs(state), methods,}
},
  computed: {
    ...mapState(['cocos_config']),
    article_data: {
      get () {
        const result = this.article_data
        result.forEach(item => {
          if (inisHelper.is.empty(item.opt)) {
            item.opt = { auth: 'anyone' }
          } else if (inisHelper.is.empty(item.opt.auth)) {
            item.opt.auth = 'anyone'
          }
          item.views = inisHelper.format.number(item.views)
        })
        return result
      }
    }
  }


}

</script>
<style  lang="scss" scoped>
.articleBox{
  margin-bottom: 10px;
  padding: 20px 20px 0 20px;
  width: 650px;
  background-color: #f2f2f2;
  border-radius: 10px;
align-items: flex-end;
  img{
    margin-left: 0px;
    display: flex;
    flex-direction: row;

  }
}
</style>