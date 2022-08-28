import { GET } from '@/utils/http/request'
import { inisHelper } from '@/utils/helper/helper'

export default {
    // 设置主题配置
    setThemeConfig (state, params = {}) {
        if (inisHelper.is.empty(params)) {
            GET('options', { params: { key: 'config:default-theme' } }).then(res => {
                if (res.data.code == 200) {
                    state.theme_config = res.data.data.opt
                }
            })
        } else state.theme_config = params
    },
    // 设置登录信息
    setLogin (state, params = {}) {
        if (inisHelper.is.empty(params)) {
            // 获取缓存中的登录信息
            const login = inisHelper.get.storage('login')
            // 判断缓存是否存在且未过期
            if (login != 'expire' && login) state.login = login
        } else state.login = params
    },
    // 设置评论
    setArticle (state, params = {}) {
        if (!inisHelper.is.empty(params)) {
            for (const item in params) state.article[item] = params[item]
        } else state.article = params
    },
    ISLOGIN(state, params){
        state.login.is_login = true;
    },
    HEADCOVER(state, params){
        state.head_cover = params;
    },
    SWTALK(state, params){
        state.send_talk = params;
    },
    MUSICPLAY(state, params){
        state.music.is_play = params;
    },
    GETMUSIC(state, params){
        state.music.music_info = params;
    },
    DURATION(state, params){
        state.music_control.duration = params;
    },
    CURRENTTIME(state, params){
        state.music_control.currentTime = params;
    },
    PLAYENDED(state, params){
        state.music_progress.ended = params;
    },
    VOLUME(state, params){
        state.music.volume = params;
    },
}
