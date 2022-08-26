<template>
<div class="articleRow" id="article">
  <a-page-header
      :title="article.title"
      class="site-page-header"
      :sub-title="article.last_update_time"
      @back="() => null"
      >

  <div class="content">
    <a-row class="contentRow">
      <div  v-html="article.content" class="markDown"></div>
    </a-row>
  </div>
  </a-page-header>
</div>
</template>
<!--    <div class="row">-->
<!--      <div class="col">-->
<!--        <div class="articleTitle">-->


<!--          <span class="font-12px">-->

<!--          </span>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
<script>
import {onMounted, reactive, toRefs} from "vue";
import {mapState, useStore} from "vuex";
import {onBeforeRouteUpdate, useRoute} from "vue-router";
import {inisHelper} from "@/utils/helper/helper";
import {notification,PageHeader,Image} from "ant-design-vue";
import {GET} from "@/utils/http/request";

export default {
  name: "Article",
  components: {
    APageHeader: PageHeader,
  },
  setup(){
    const route = useRoute()
    const store = useStore()
    const state = reactive({
      id: null,
      article: [],
      author: [], // 作者信息
      comment: 0, // 评论数量
      sort: [], // 分类
      tag: [], // 标签
      is_load: true, // 加载
      is_top: [], // 置顶文章
      url: '#', // 当前URL
      auth: [], // 文章权限
      config: {			// 配置
        comments: {
          show: true, // 显示评论
          allow: true// 允许评论
        }
      }
    })
    store.dispatch('commitArticle', { is_comments: false })

    // 监听路由更新
    onBeforeRouteUpdate((to, from, next) => {
      state.id = to.params.id || null
      methods.getArticle()
      next()
    })
    const methods = {
      initData() {
        methods.checkArticle()
        // methods.getIsTop()
      },
      initState() {
        // 初始化路由参数ID
        state.id = route.params.id
        state.url = window.location.href
        state.author = {pay: {alipay: '', wechat_pay: ''}}
        state.auth = {is_pwd: false, password: ''}
        state.hide = []
      },
      checkArticle () {
        GET('article/sql', {
          params: { where: `id=${state.id};`, 'login-token': `${store.state.login['login-token']}` }
        }).then(res => {
          if (res.data.code == 200) {
            const result = res.data.data
            if (result.count > 0) {
              if (!inisHelper.is.empty(result.data[0].opt) && result.data[0].opt.auth == 'password') {
                state.auth.is_pwd = true
                state.article = result.data[0]
                state.is_load = false
              } else methods.getArticle()
            }
          }
        })
      },
      getArticle () {
        // 获取文章数据
        GET('article', {
          params: { id: state.id, password: state.auth.password },
          headers: { 'login-token': `${store.state.login['login-token']}` }
        }).then(res => {
          if (res.data.code == 200) {
            state.auth.is_pwd = false
            const result = res.data.data
            state.article = result
            state.comment = result.expand.comments
            state.author = result.expand.author
            state.sort = result.expand.sort
            const tag = result.expand.tag
            if (inisHelper.is.empty(tag)) state.tag = { is_show: false, data: [] }
            else state.tag = { is_show: true, data: tag }
            state.is_load = false
            // 设置页面 title
            document.title = state.article.title + ' - ' + store.state.cocos_config.basic.site.title
          } else {
            notification.warning({message:'错误！',description:res.data.msg})
            // $.NotificationApp.send('错误！', res.data.msg, 'top-right', 'rgba(0,0,0,0.2)', 'warning')
          }
          // 获取系统配置
          methods.getConfig()
        })
      },
      // 获取系统配置
      getConfig () {
        const params = {
          key: 'config:system'
        }
        GET('options', { params }).then(res => {
          if (res.data.code == 200) {
            const result = res.data.data
            methods.setShow(result.opt)
          }
        })
      },
    }
    methods.initState()

    onMounted(() => {
      methods.initData()
    })
    return { ...toRefs(state), methods }
  },
  methods: {
    natureTime (date) {
      const time = inisHelper.date.to.time(date)
      return inisHelper.time.nature(time)
    },
    computed: {
      ...mapState(['cocos_config'])
    }
  }
}
</script>

<style lang="scss" scoped>
.articleRow{
  max-width: 80%;
  height: auto;
}
#article img{
  width: 200px;
}
.markDown img{
  width: 200px;
}
</style>