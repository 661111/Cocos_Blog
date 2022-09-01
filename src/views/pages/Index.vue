<template>
  <div class="articleMain">
    <div class="box">
    <div class="articleBox"  v-for="data in article_data" :key="data.id">
      <a-skeleton active :loading="loading" >
      <div class="articleTitle">
        <router-link :to="{name: 'article', params: { id: data.id }}">
       <h3><a href="#">{{data.title}}</a></h3>
        </router-link>
        <h5> 发布于: {{data.create_time}}</h5>
      </div>

<div class="articleD">
  {{data.description}}

    <img :src="data.expand.img_src" height="100"/>

</div>
      </a-skeleton>
      <a-divider style="height: 1px; background-color: #efdbff"/>
    </div>
      <div class="articleFooter">
  <h3 v-show="last_page">没有更多了！</h3>
  <a-button v-show="!last_page" v-on:click="methods.getArticle(self_page + 1)" danger shape="round" >加载更多</a-button>
      </div>
    </div>
    <div class="articleSiderBox">
      <a-badge-ribbon text="站点信息">
      <a-card>
        <div class="webSiteData">
          <div>
            <span>访问</span>
            <a-badge color="#73d13d" :text="group.other.views || 0"/>
          </div>
          <div>
          <span>文章</span>
          <a-badge color="#2db7f5" :text="group.article.count || 0" />
          </div>
          <div>
            <span>评论</span>
            <a-badge color="#b37feb" :text="group.comments.count || 0" />
          </div>
        </div>
      </a-card>
      </a-badge-ribbon>
      <a-badge-ribbon text="热门标签" color="#b37feb">
      <a-card>
        <div class="hot-message">
          <div >
            <a-tag color="pink" v-for="data in tags_data" :key="data">#{{data.name}}</a-tag>
          </div>
        </div>
      </a-card>
      </a-badge-ribbon>
      <a-badge-ribbon text="性能检测" color="pink">
        <a-card>
      <div class="performanceMSG">
        <div style="width: 100%">
          <span>内存占用:</span>
          <a-progress
              :stroke-color="{
              '0':  '#73d13d',
              '50%': '#108ee9',
              '100%': '#f5222d',
      }"
              :percent="(performance.ram.rate * 100).toFixed(1)"
          />
          <small>白屏时间:{{performance.blank.value || 0}}ms</small>
          <small>DOM解析：{{performance.dom.parse.value || 0}}ms</small>
          <br/>
          <span>DOM解析占用:</span>
          <a-progress
              :stroke-color="{
              '0':  '#73d13d',
              '100%': '#108ee9',
      }"
              :percent="(performance.dom.parse.value/performance.dom.completed.value * 100).toFixed(1)"
          />
        </div>
      </div>
        </a-card>
      </a-badge-ribbon>
    </div>
  </div>
</template>

<script>
import {GET} from "@/utils/http/request";
import store from "@/store";
import {mapState, useStore} from "vuex";
import {onBeforeUpdate, onMounted, reactive, ref, toRefs} from "vue";
import {inisHelper} from "@/utils/helper/helper";
import {Layout,Row,Col,List,Divider,Button,Skeleton,Tag,Progress,Badge,Card} from "ant-design-vue";

const LayoutContent = Layout.Content
const ListItem  = List.Item
const ListItemMeta = List.Item.Meta
const BadgeRibbon = Badge.Ribbon

export default {
name:'Index',
  components: {
    Layout,
    Row,
    Col,
    Skeleton,
    AList:List,
    ADivider: Divider,
    AButton: Button,
    Tag,
    Progress,
    Badge,
    Card,
    ABadgeRibbon: BadgeRibbon,
    AListItem: ListItem,
    AListItemMeta: ListItemMeta,
  ALayoutContent: LayoutContent
  },
setup(){
  const loading = ref(true);
  const store = useStore()
  const state = reactive({
    article: { page: 6 }, // 文章数据
    article_data: [], // 文章数据
    is_mobile: inisHelper.get.storage('inis', 'mobile'), // 是否为手机
    self_page: 1, // 当前页码
    last_page: false, // 最后一页
    tags: {}, //  全部标签
    tags_data: [],
    performance: {
      blank: { value: 0 },
      dom: {
        parse: { value: 0 },
        completed: { value: 0 }
      },
      ram: { rate: 0, value: 0 }
    },//性能检测
    group: {
      article: {},
      comments: {},
      other: {}
    },// 统计数据
  })
  const methods = {
    initData(){
      methods.getArticle()
      methods.getTagsMessage()
      methods.getGroup()
    },

    getArticle(page = 1){
      if (page <= state.article.page) {
        if (page == state.article.page) state.last_page = true
        const params = { limit: 5, page }
        const headers = { 'login-token': `${store.state.login['login-token']}` }
        GET('article', {
          params, headers
        }).then((res) => {
          if (res.data.code === 200) {
            // 设置文章列表数据
            state.article = res.data.data
            state.article.data.forEach(item => {
              state.article_data.push(item)
            })
            // 设置当前分页码
            state.self_page = page
            // 设置页面 title
            document.title = store.state.cocos_config.basic.site.title
            setTimeout(() => {
              loading.value = false;
            }, 1500);
          }
        })
      } else state.last_page = true
    },

    getTagsMessage () {
      const params = { limit: 10 }
      GET('tag', {
        params
      }).then((res) => {
        if (res.data.code == 200) {
          state.tags = res.data.data
          state.tags.data.forEach(item => {
            state.tags_data.push(item)
          })
        }
      })
    },
    // 获取统计数据
    getGroup () {
      const params = {
        field: 'article,comments,other'
      }
      GET('group', { params }).then(res => {
        if (res.data.code == 200) state.group = res.data.data
      })
    },
  }
  onMounted(() => {
    methods.initData()
  });
  onBeforeUpdate(() => {
    const performance = inisHelper.performance(true)
    state.performance = performance
  })
  return{...toRefs(state), methods,loading}
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
<style  lang="less" scoped>
.articleMain{
  padding: 10px;
  max-width:100%;
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  .articleSiderBox{
    position: relative;
    margin: 0 0 0 2rem;
    min-width: 20rem;
    display: inline;
//box-shadow: @boxShadow;
  }
}
.articleBox{
  position: relative;
  padding: 20px 20px 0 20px;
  max-width: 50rem;
  border-radius: 10px;
  box-shadow: @boxShadow;

}
.articleTitle{
  display: flex;
align-items: center;
}
.articleD {
  display: flex;
  box-sizing: content-box;
    img{
      margin-left: auto;
      max-width: 14rem;
    }
}
.articleFooter {
  text-align: center;
}
.webSiteData {
  margin-top: 1rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  div {
    width: 40px;
  }
}
.hot-message {
  margin-top: 1rem;
  width: 100%;
}
.performanceMSG {
  margin-top: 1rem;
}
</style>