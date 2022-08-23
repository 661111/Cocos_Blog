<template>
  <div class="top-nav-wrapper">
    <div class="top-nav">
      <div class="left">
        <router-link class="pc-logo" to="/">
          <div class="logo">
            <img
                width="50"
                src='https://vkceyugu.cdn.bspapp.com/VKCEYUGU-90b49633-e3ed-4910-b066-7bcc14cbf4b0/031ac7ad-c779-40a8-9b14-d6e963fcbf85.svg'
                alt
                srcset
            />
            <!--                :src="cocos_config.other.images.logo.day.big || 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-90b49633-e3ed-4910-b066-7bcc14cbf4b0/031ac7ad-c779-40a8-9b14-d6e963fcbf85.svg'"-->

            <div class="title">夏夜星空</div>
<!--            {{ geek_config.site_config.title }}-->
          </div>
        </router-link>
        <div  class="logo mobile-logo">
          <img width="35" src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-90b49633-e3ed-4910-b066-7bcc14cbf4b0/031ac7ad-c779-40a8-9b14-d6e963fcbf85.svg" alt srcset />
        </div>
        <div class="search">
          <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16px"
              height="16px"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-search"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
              placeholder="关键词"
              type="text"
          />
          <div class="res-box" >
<!--            :class="is-show-res-box"-->
            <div class="title">
              搜索结果推荐文章" : "暂无结果
            </div>
            <ul>
              <router-link to="/"/>
            </ul>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="right-links">
<!--          导航开始-->
          <div  class="child">
            <router-link to="/index">主页</router-link>
          </div>
<!--          导航结束-->
<!--          登陆按钮-->
            <lew-button  @click="modalVisible1 = true">登录</lew-button>
<!--          登陆按钮-->
          <lew-flex v-if="!is_login && login_show" gap="30px" x="start">
<!--            <lew-dropdown :options="options"-->
<!--                          placement="bottom-start"-->
<!--                          @change="change">-->
              <lew-avatar  round src="https://q1.qlogo.cn/g?b=qq&s=100&nk=2669016063"
              >hover</lew-avatar
              >
<!--            </lew-dropdown>-->
          </lew-flex>

<!--          登陆模态框-->
          <lew-modal
              id="login-modal"
              :visible="modalVisible1"
              width="350px"
              @mask-click="modalVisible1 = false"
          >
            <div class="modal-body">
              <lew-title :bold="700" style="margin-bottom: 20px"
              >登录你的账户
              </lew-title>
              <lew-form-item direction="y" title="账号">
                <lew-input v-model="account" name="username" type="text" placeholder="帐号 | 邮箱" />
              </lew-form-item>
              <lew-form-item
                  style="margin-bottom: 30px"
                  direction="y"
                  title="密码"
              >
                <lew-input v-model="password" name="password" v-on:keyup.enter="methods.login()" type="password" placeholder="密码"/>
              </lew-form-item>

              <lew-flex x="end">
                <lew-button type="normal" @click="modalVisible1 = false"
                >关闭
                </lew-button>
                <lew-button v-on:click="methods.login()" >立即登录</lew-button>
              </lew-flex>
            </div>
          </lew-modal>

<!--          <div-->
<!--              @click="toLink({ isLogin: false, path: '/Timeline' })"-->
<!--              class="child"-->
<!--          >-->
<!--            <i class="hashtag icon"></i>-->
<!--          </div>-->
<!--          <div-->
<!--              @click="toLink({ isLogin: false, path: '/MsgWall' })"-->
<!--              class="child"-->
<!--          >-->
<!--            <i class="clipboard outline icon"></i>-->
<!--          </div>-->

<!--          <div-->
<!--              @click="toLink({ isLogin: true, path: '/AddArticle' })"-->
<!--              class="child"-->
<!--          >-->
<!--            <i class="pencil alternate icon"></i>-->
<!--          </div>-->
<!--          <div @click="toLink({ isLogin: true, path: '/About' })" class="child">-->
<!--            <i class="user outline icon"></i>-->
<!--          </div>-->

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {GET} from "@/utils/http/request";
import { ref, onMounted, reactive } from "vue";
import {mapState, useStore} from 'vuex'
import axios from "axios";
import {inisHelper} from "@/utils/helper";
import {LewFlex,LewButton,LewModal,LewTitle,LewFormItem,LewInput,LewDropdown,LewAvatar,LewPopover,LewMessage,LewNotification} from 'lew-ui'





export default {
  name: "NavMenu",
components:{
    LewFlex,
  LewButton,
  LewModal,
  LewTitle,
  LewFormItem,
  LewInput,
  LewDropdown,
  LewAvatar,
  LewMessage,
  LewPopover,
  LewNotification

},

  setup () {
    // const store = useStore()
    const state = reactive({
      account: null, // 帐号
      password: null, // 密码
      user: [], // 用户数据
    })
        // 获取缓存中的登录信息
    const login_storage = inisHelper.get.storage('login')
    // 判断缓存是否存在且未过期
    if (login_storage != 'expire' && login_storage != false) {
      state.user = login_storage.user
      state.is_login = true
    }

    const methods = {
      // inisData () {
      //   methods.moving()
      // },
      // 登录
      login () {
        // if (inisHelper.is.empty(state.account)) $.LewMessage.send('提示！', '帐号不得为空！', 'top-right', 'rgba(0,0,0,0.2)', 'warning')
        // else if (inisHelper.is.empty(state.password)) $.LewMessage.send('提示！', '帐号不得为空！', 'top-right', 'rgba(0,0,0,0.2)', 'warning')
        if (inisHelper.is.empty(state.account))LewNotification.warning('error','username or password error!',5)
            else if (inisHelper.is.empty(state.password))LewNotification.warning('登陆失败!','账号或密码有误!',5)
        else {
          const params = {
            mode: 'login',
            account: state.account,
            password: state.password
          }

          // 登录动画
          state.login_is_load = true

          POST('users', params).then(res => {
            if (res.data.code == 200) {
              // 设置登录用户信息
              state.user = res.data.data.user
              // 有效时间
              res.data.data.time = 7200
              // 登录信息存储到缓存中
              inisHelper.set.storage('login', res.data.data)
              // 关闭登录框
              $('#login-modal').modal('hide')
              // 更新登录状态
              state.is_login = true
              // 重载页面
              location.reload()
            } else LewNotification.success('登陆成功', '1211', 5)
            // 登录动画
            state.modalVisible1 =false
            state.login_is_load = false
          })
        }
      },
      // 退出登录
      loginOut () {
        // 更新登录状态
        state.is_login = false
        // 删除缓存中的登录信息
        window.localStorage.removeItem('login')
        // 重载页面
        // location.reload()
      },
    }



return{
      methods,
  modalVisible1: ref(false),
  options: [
    {
      label: "用户资料",
      key: "profile",
    },
    {
      label: "编辑用户资料",
      key: "editProfile",
    },
    {
      label: "退出登录",
      key: "logout",
    }
  ],
  change(key) {
    LewMessage.info(String(key));
  }
    };
  },
  computed: {
    ...mapState(['cocos_config'])
  },
}

</script>

<style lang="scss" scoped>

.modal-body {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 40px;
  box-sizing: border-box;
}

.top-nav-wrapper {
  width: 100%;
  height: 100%;

  .top-nav {
    max-width: calc(1300px - 14px);
    margin: 0 auto;
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: space-between;
    border-radius: 7px;
    align-items: center;
    a {
      background-image: none;
    }
    a:hover {
      color: unset;
    }

    .left {
      display: flex;
      align-items: center;

      .logo {
        display: flex;
        align-items: center;
        margin-right: 20px;

        .title {
          margin-left: 15px;
          font-size: 22px;
          font-weight: 700;
          margin-right: 10px;
        }
        img {
          transition: all 0.25s;
        }
        img:active {
          transform: scale(0.9);
        }
      }
      .pc-logo {
        display: block;
      }
      .mobile-logo {
        display: none;
      }
    }
    .right {
      display: flex;
    }
    .right-links {
      display: flex;
      align-items: center;
      .child {
        display: flex;
        align-items: center;
        cursor: pointer;
        white-space: nowrap;
        font-size: 22px;
        margin-right: 30px;
        transition: all 0.25s;
      }
      .child:last-child {
        margin-right: 0;
      }
      .child:hover {
        transform: scale(1.1);
      }
      .child:active {
        transform: scale(0.9);
      }
      .nickname {
        font-size: 14px;
      }
    }
    .search {
      position: relative;
      margin-right: 30px;
      .feather-search {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 15px;
        color: #999 !important;
        z-index: 99999;
      }
      input {
        position: relative;
        z-index: 99;
        width: 250px;
        height: 30px;
        padding-left: 20px;
        font-size: 14px;
        border-radius: 7px;
        border: none;
        background: #eee;
        transition: all 0.25s;
      }
      .res-box {
        position: absolute;
        left: 0;
        top: 0;
        border-radius: 7px;
        width: 272px;
        height: 0;
        overflow-y: scroll;
        padding: 0 10px 0 10px;
        box-sizing: border-box;
        line-height: 30px;
        color: #000;
        transition: all 0.25s;
        .title {
          width: 100%;
          color: #999;
          font-size: 14px;
          padding: 5px 5px 5px 10px;
        }
        ul {
          display: flex;
          flex-direction: column;
          a {
            position: relative;
            width: 100%;
            padding: 3px 10px;
            border-radius: 7px;
            font-size: 14px;
            color: #666;
          }
          a::before {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 1px;
            background: #eee;
            content: "";
          }
          a:hover {
            background: rgba($color: #000000, $alpha: 0.05);
          }
          a:hover::before {
            display: none;
          }
          a:hover + a::before {
            display: none;
          }
        }
      }
      .res-box::-webkit-scrollbar {
        width: 0;
        height: 0;
        display: none;
      }
      input:hover {
        background: rgba($color: #000000, $alpha: 0.1);
      }
      input:focus {
        background: rgba($color: #ffffff, $alpha: 1);
      }
      .is-show-res-box {
        height: 450px;
        padding: 40px 10px 12px 10px;
        background: rgba($color: #ffffff, $alpha: 1);
        box-shadow: 0 0 13px 0 rgb(0 0 0 / 15%);
      }
    }
  }
}
.form-group {
  margin: 0;
}

@media screen and (max-width: 1200px) {
  .top-nav-wrapper {
    width: calc(100% - 8px);
  }
}

// 移动端适配
@media screen and (max-width: 800px) {
  .top-nav-wrapper {
    background: none;
    -webkit-backdrop-filter: none;
    box-shadow: none;
    backdrop-filter: none;
    .search {
      display: none;
    }
    .top-nav {
      height: 45px;
      padding: 0 10px;
      background: none;
      -webkit-backdrop-filter: saturate(200%) blur(20px);
      box-shadow: none;
      backdrop-filter: saturate(200%) blur(20px);
      .left {
        .pc-logo {
          display: none;
        }
        .mobile-logo {
          display: block;
          margin-right: 10px;
        }
        .logo {
          display: flex;
          align-items: center;
          .title {
            display: none;
          }
          img {
            width: auto;
            height: 18px;
          }
        }
      }

      .right-links {
        a {
          font-weight: bold;
          font-size: 14px;
          margin: 0 0;
        }
        .child {
          margin-right: 15px;
        }
      }
    }
  }
}
</style>