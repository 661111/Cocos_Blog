import config from '@/assets/json/config.json'

export default {
    login:  {
        'login-token':  '',
        user:   {
            address_url: '',
            create_time: '',
            description: '',
            email: '',
            expand: '',
            head_img: '',
            id: '',
            last_login_time: '',
            level: '',
            longtext: '',
            nickname: '',
            opt: {
                alipay: '',
                login_auth: '',
                qq_pay: '',
                wechat_pay: ''
            },
            sex: '',
            status: '',
            update_time: ''
        }
    },
    music: {
        is_play: false,
        music_info: {},
        volume: 0.7,
    },
    music_control: {
        duration: 0.00,
        currentTime: 0.00,
    },
    music_progress: {
        ended: false,
    },
    cocos_config: config,
    article: {
        is_comments: false // 是否触发评论
    }
}