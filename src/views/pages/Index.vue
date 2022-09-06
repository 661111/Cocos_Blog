<template>
  <div class="articleMain">
    <div class="box">
      <a-affix :offset-top="top">
        <div class="articleTop" style="z-index: 999;width: 100%;position: relative;display: flex;">
<!--          <a-tabs :tab-position="mode" >-->
<!--            <a-tab-pane key="1" tab="全部" @click="methods.getArticle()"/>-->
<!--          </a-tabs>-->
          <a-tabs style="width: 100%; padding: 0" :tab-position="Horizontal" v-model:activeKey="activeKey">
            <a-tab-pane key="1" tab="all"></a-tab-pane>
          </a-tabs>
        </div>
      </a-affix>
    <div class="content articleBox"  v-for="data in article_data" :key="data.id">
      <a-skeleton active :loading="loading" style="width: 47rem" :paragraph="{ rows: 4 }" >
      <div class="articleTitle">
        <router-link :to="{name: 'article', params: { id: data.id }}">
       <p><a href="#">{{data.title}}</a></p>
        </router-link>
      </div>

<div class="articleD">
  {{data.description}}

    <img :src="data.expand.img_src" height="100"/>

</div>
        <div style="font-size: 1rem;">
          <span>{{format(data.create_time,'zh_CN')}}</span>
          <a-divider type="vertical" style="height: 1rem; border-color: #000000" dashed />
<!--          <eye-outlined />-->
          <Eye />
          <span style="margin: 0 1px 0 1px">{{ data.views || 0 }}</span>
          <a-divider type="vertical" style="height: 1rem; border-color: #000000" dashed />
          <icon >
            <template #component>
              <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="16" height="11.1865">
                <g>
                  <rect height="11.1865" opacity="0" width="14.0234" x="0" y="0"/>
                  <path d="M3.2959 10.6396C3.55469 10.6396 3.73047 10.5518 4.04297 10.2783L6.09375 8.44238L5.52734 7.89551L3.49609 9.77051L3.49609 8.37402C3.49609 8.0957 3.33008 7.96875 3.11523 7.96875L2.16309 7.96875C1.29883 7.96875 0.786133 7.49512 0.786133 6.58691L0.786133 2.13867C0.786133 1.23047 1.29883 0.751953 2.16309 0.751953L9.05273 0.751953C9.91699 0.751953 10.4297 1.23047 10.4297 2.13867L10.4297 2.82227L11.2158 2.82227L11.2158 2.10938C11.2158 0.786133 10.4297 0.0146484 9.10156 0.0146484L2.11426 0.0146484C0.839844 0.0146484 0 0.786133 0 2.10938L0 6.60645C0 7.93457 0.839844 8.70117 2.11426 8.70117L2.75879 8.70117L2.75879 10.0391C2.75879 10.415 2.94922 10.6396 3.2959 10.6396Z"  fill-opacity="0.85"/>
                  <path d="M11.25 11.1865C11.5869 11.1865 11.7773 10.9473 11.7773 10.5762L11.7773 9.4043L11.9824 9.4043C13.208 9.4043 14.0234 8.66211 14.0234 7.3877L14.0234 4.50195C14.0234 3.22266 13.208 2.48047 11.9824 2.48047L7.24121 2.48047C5.96191 2.48047 5.20508 3.22266 5.20508 4.50195L5.20508 7.3877C5.20508 8.66699 5.96191 9.4043 7.24121 9.4043L8.92578 9.4043L10.5566 10.8008C10.8545 11.0547 11.0156 11.1865 11.25 11.1865ZM11.0449 10.3027L9.47754 8.89648C9.28223 8.72559 9.16504 8.66699 8.89648 8.66699L7.29004 8.66699C6.47461 8.66699 5.98633 8.22754 5.98633 7.36328L5.99121 4.52637C5.99121 3.66699 6.47461 3.21777 7.29004 3.21777L11.9385 3.21777C12.749 3.21777 13.2373 3.66699 13.2373 4.52637L13.2373 7.36328C13.2373 8.22754 12.749 8.66699 11.9385 8.66699L11.4209 8.66699C11.2109 8.66699 11.0449 8.79395 11.0449 9.06738Z"  fill-opacity="0.85"/>
                </g>
              </svg>


            </template>
          </icon>
          <span >{{ data.expand.comments.count }}</span>
        </div>
      </a-skeleton>
<!--      <a-divider style="height: 1px; background-color: #efdbff"/>-->
<!--      分割线-->
    </div>
      <div class="articleFooter">
  <h3 v-show="last_page">没有更多了！</h3>
  <a-button v-show="!last_page" v-on:click="methods.getArticle(self_page + 1)" type="primary" shape="round" >﹒﹒﹒</a-button>
      </div>
    </div>
    <div class="articleSiderBox">
      <a-affix :offset-top="20">
      <div style="width: 100%;">
        <a-switch v-model:checked="checked" @change="changeTheme" checked-children="暗" un-checked-children="亮" />
      </div>

      <a-badge-ribbon style="height: 2rem;width: 5rem; font-size: 4px" text="站点信息" color="#FF3B30">
      <a-card style="margin-bottom: 1.5rem">
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
      <a-badge-ribbon style="height: 2rem;width: 5rem; font-size: 4px;" text="热门标签" color="#FFCC00" >
      <a-card style="margin-bottom: 1.5rem">
        <div class="hot-message">
          <div >
            <a-tag color="pink" v-for="data in tags_data" :key="data">#{{data.name}}</a-tag>
          </div>
        </div>
      </a-card>
      </a-badge-ribbon>
      <a-badge-ribbon style="height: 2rem;width: 5rem; font-size: 4px"  text="性能检测" color="#34C759">
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
      </a-affix>
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
import Icon, {EyeOutlined } from "@ant-design/icons-vue";
import { format } from 'timeago.js';
import Eye from "@/components/icons/Eye.vue";
import { toggleTheme} from '@zougt/vite-plugin-theme-preprocessor/dist/browser-utils.js'


const LayoutContent = Layout.Content
const ListItem  = List.Item
const ListItemMeta = List.Item.Meta
const BadgeRibbon = Badge.Ribbon

export default {
name:'Index',
  components: {
    Eye,
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
    Icon,
    EyeOutlined,
    ABadgeRibbon: BadgeRibbon,
    AListItem: ListItem,
    AListItemMeta: ListItemMeta,
  ALayoutContent: LayoutContent
  },
setup(){
  const checked = ref(false)
  const loading = ref(true);
  const store = useStore()
  const state = reactive({
    article: { page: 6 }, // 文章数据
    article_data: [], // 文章数据
    is_mobile: inisHelper.get.storage('inis', 'mobile'), // 是否为手机
    self_page: 1, // 当前页码-
    last_page: false, // 最后一页
    tags: {}, //  全部标签
    tags_data: [],
    article_sort: [],
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
  });
  const changeTheme = checked => {
    if (checked) {
      toggleTheme({
        scopeName: "darkTheme",
      })
      console.log("已经是默认主题");
    } else {
      toggleTheme({
        scopeName: "defaultTheme",
      })
      console.log("已切换为深色主题");
    }
  };
  const methods = {
    initData(){
      methods.getArticle()
      methods.getSorMemu()
      methods.getTagsMessage()
      methods.getGroup()
    },
    initState () {

    },

    getArticle( page = 1 ){
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
    getSorMemu () {
     GET('article-sort',{
       params: {limit: 999}
     }).then(res => {
       if (res.data.code == 200){
         console.log(res.data.data)
         state.article_sort = res.data.data.data
       }
     })

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
  methods.initState()

  onMounted(() => {
    methods.initData()
  });
  onBeforeUpdate(() => {
    const performance = inisHelper.performance(true)
    state.performance = performance
  })
  return{...toRefs(state), methods,loading,format ,activeKey: ref('1'), checked, changeTheme }
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
    },
  }


}

</script>
<style  lang="less" scoped>
.articleMain{
  padding: 1rem;
  width: 100%;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  overflow: hidden;
  .articleSiderBox{
    margin: 0 0 0 2rem;
    min-width: 20rem;
    display: inline;
//box-shadow: @boxShadow;
  }
}
.articleBox{
  margin-bottom: 2rem;
  line-height: 4rem;
  position: relative;
  padding: 20px 20px 0 20px;
  overflow: hidden;
  box-shadow: 0 0 0 1px rgb(188 195 206 / 10%),0 2px 10px rgb(48 55 66 / 6%);
}
.articleTop {
  background: rgba(20, 20, 20, 0.7);
  backdrop-filter: saturate(200%) blur(20px);
}
.articleTitle{
  display: flex;
align-items: center;
  overflow: hidden;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  line-clamp: 2;
}
.articleD {
  display: flex;
  box-sizing: content-box;
  overflow: hidden;
  font-size: 12px;
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
@media screen and (max-width: 800px) {
  .articleMain {
    min-width: 100%;
    width: 100%;
padding: 1px;
    transition: all 0.25s;
    .articleBox {
      width: 100%;
      img{
        width: auto;
      }
    }
    .articleSiderBox {
      display: none;
      width: 0;
      height: 0;
    }
  }
  .articleD {
    height: 10rem;
    img{
      width: auto;
    }
  }

}
</style>