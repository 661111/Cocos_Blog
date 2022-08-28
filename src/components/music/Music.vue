<template>
<div class="musicMain" >
  <div class="playback-info">

    <div class="musicImg">
      <img :src="music.cover || 'https://raw.githubusercontent.com/X1a2h1/X1a2h1/fea4a15cfc4480be2377af11a42fd9d6cba344d4/assets/music.svg'"/>
    </div>
    <div>
    <div class="musicSong">
      <small>{{music.name}}</small>
      <span style="color:#4e4748"></span>
      <div class="MusicProgress">
        <div class="start-time">{{ methods.toTime(progress) || "00:00" }}</div>
        <div class="end-time"> {{ methods.toTime(duration) || "00:00" }}</div>
        <div
            :style="'width:' + progress + 'px'"
            class="line"
            ref="currentTime"
        >
          <span @mousedown="methods.Seeked" class="line-btn"></span>
        </div>
      </div>
    </div>
    </div>
  </div>
  <p class="musicIcon">
    <span @click="methods.preMusic()" class="mr-1" data-stopPropagation="true"><MusicPrevious/></span>
    <span v-show="!play" @click="methods.handlePauseOrPlay()" class="mr-2" data-stopPropagation="true"><MusicPlay/></span>
    <span v-show="play"  @click="methods.handlePauseOrPlay()" class="mr-2" data-stopPropagation="true"><MusicPause/></span>
    <span @click="methods.nextMusic()" class="mr-1" data-stopPropagation="true"><MusicNext/></span>
    <MusicList @click="methods.Collapse" :class="showSheet ? 'musicListIcon': ''"/>
    <span v-show="mode == 0" @click="methods.swMode" class="mr-1" ><RepeatPlay/></span>
    <span v-show="mode == 1" @click="methods.swMode" class="mr-1" ></span>
    <span v-show="mode == 2" @click="methods.swMode" class="mr-1" ></span>

  </p>

<!--显示歌曲列表-->
  <div class="musicList" :class="!showSheet ? 'hide-music-list': ''">
    <div class="musicinfo">
      <a-list size="small" :data-source="musicList.songs">
        <template #renderItem="{ item }">
        <a-list-item style="padding: 0">
          <a-list-item-meta :description="item.author" >
            <template #title>
              <a @click="methods.swMusic(item.song_id)">{{ item.name }}</a>
            </template>
<!--            <template #avatar>-->
<!--              <a-avatar :src="item.cover" />-->
<!--            </template>-->
          </a-list-item-meta>
        </a-list-item>
        </template>
      </a-list>

    </div>
  </div>
<!--  显示歌曲列表结束-->
<!--        显示歌曲列表-->
<!--  <div class="musicList music-playlist" style="max-height: 0;height: unset">-->
<!--    <a v-for="(data, index) in music.songs" :key="index" v-on:click.stop="methods.musicInfo(index,data.song_id)" data-stopPropagation="true">-->
<!--      <span>-->
<!--        <span>{{ index + 1 }}</span>-->
<!--        {{data.name}}-->
<!--      </span>-->
<!--    </a>-->
<!--  </div>-->

<!--      显示歌曲列表结束-->

</div>
</template>

<script>
import { GET } from '@/utils/http/request'
import {reactive, toRefs, watch, onBeforeUnmount} from 'vue'
import { onMounted } from "@vue/runtime-core";
import {mapGetters, useStore} from 'vuex'
import {List} from "ant-design-vue";
import MusicPrevious from '@/components/icons/MusicPrevious.vue'
import MusicPlay  from '@/components/icons/MusicPlay.vue'
import MusicPause from '@/components/icons/MusicPause.vue'
import MusicNext  from '@/components/icons/MusicNext.vue'
import PlayList   from '@/components/icons/PlayList.vue'
import MusicList  from '@/components/icons/MusicList.vue'
import RepeatPlay from "@/components/icons/RepeatPlay.vue";
const ListItem = List.Item;
const ListItemMeta = List.Item.Meta

export default {
  name: "music",
  components: {
    MusicPrevious,
    MusicPlay,
    MusicPause,
    MusicNext,
    PlayList,
    MusicList,
    RepeatPlay,
    AList: List,
    AListItem: ListItem,
    AListItemMeta: ListItemMeta,
  },
  computed: {
    ...mapGetters(['duration','showVolume'])
  },
  setup() {
    const store = useStore();
    const state = reactive({
      musicSkeleton: true,
      mode: 0,
      play: false,
      musicSheetList: [], //歌单列表
      musicSheet: {},     //当前歌单
      musicList: {},      //当前歌单歌曲列表
      music: {},          //当前播放音乐
      progress: 0,        //播放进度
      volume: 0.7,
      showVolume: false,
      showSheet: false,
      sheetLength: 0,
      index: 0,
      sheetId: 0
    });
    watch(store.state.music_control, (val) => {
      state.progress = val.currentTime
    });
    watch(store.state.music_progress, (val) => {
      if(val.ended){
        if(state.mode == 0){
          methods.nextMusic()
        }else if(state.mode == 1){
          state.index = Math.floor(Math.random() * state.sheetLength)
          state.progress = 0
          methods.swMusic(state.musicList.songs[state.index].song_id,state.musicSheet.expand.type,state.index)
        }else {
          state.progress = 0
          methods.swMusic(state.musicList.songs[state.index].song_id,state.musicSheet.expand.type,state.index)
        }
      }
    });
    let timer = setInterval(() => {
      if(state.play  ){
        state.progress += 1; //播放进度+1s
      }
    }, 1000)
    const methods = {
      async initData() {
        await methods.getSheetInfo();
        await methods.getMusicList(state.sheetId);
        await methods.getMusic(state.musicList.songs[state.index].song_id,state.musicSheet.expand.type)
        store.dispatch("getMusic", state.music);
      },
      async getSheetInfo() {
        await GET("music").then((res) => {
          if (res.data.code == 200) {
            state.musicSheetList = res.data.data.data;
            state.musicSheet = res.data.data.data[0];
            state.sheetId = res.data.data.data[0].id
          }
        });
      },
      async getMusicList(id) {
        let params = { id,mode:'list' };
        await GET("music", { params }).then((res) => {
          if (res.data.code == 200) {
            state.musicList = res.data.data;
            state.sheetLength = res.data.data.songs.length;
            state.musicSkeleton = false
          }
        });
      },
      handlePauseOrPlay() {
        state.play = !state.play;
        store.dispatch("musicPlay", state.play);
      },
      async getMusic(id, type) {
        let params = {
          id,
          mode: "song",
          who: type,
        };
        await GET("music", { params }).then((res) => {
          if ((res.data.code = 200)) {
            state.music = res.data.data;
          }
        });
      },
      async swMusic(id,type,index){
        state.index = index
        await methods.getMusic(id, type)
        await store.dispatch("getMusic", state.music);
        methods.handlePauseOrPlay()
        state.play = true;
        state.progress = 0
        store.dispatch('currentTime',0)
        store.dispatch("musicPlay", state.play);
      },
      swMode(){
        if(state.mode == 2){
          state.mode = 0
        }else {
          state.mode += 1
        }
      },
      toTime(sec) {
        let s = sec % 60 < 10 ? ('0' + sec % 60) : sec % 60
        let min = Math.floor(sec / 60) < 10 ? ('0' + Math.floor(sec / 60)) : Math.floor(sec / 60)
        return min + ':' + s
      },

      Seeked(val){
        store.dispatch('currentTime',val)
        state.play = true;
        store.dispatch("musicPlay", state.play);
        store.dispatch("playEnded", false);
      },
      changeVolume(val){
        store.dispatch("volume", val);
      },
      showVolume(){
        state.showVolume = !state.showVolume
      },
      Collapse(){
        state.showSheet = !state.showSheet
      },
      nextMusic(){
        if(state.index == state.sheetLength -1){
          state.index = 0
        }else {
          state.index += 1
        }
        methods.swMusic(state.musicList.songs[state.index].song_id,state.musicList.info.expand.type,state.index)
      },
      preMusic(){
        if(state.index == 0){
          state.index = state.sheetLength -1
        }else {
          state.index -= 1
        }
        methods.swMusic(state.musicList.songs[state.index].song_id,state.musicList.info.expand.type,state.index)
      },
      async swSheet(val){
        state.index = 0
        state.play = false
        state.progress = 0
        store.dispatch("musicPlay", state.play);
        store.dispatch("currentTime", 0);
        await methods.getMusicList(val);
        await methods.getMusic(state.musicList.songs[state.index].song_id,state.musicList.info.expand.type)
        store.dispatch("getMusic", state.music);
      }
    };
    onMounted(() => {
      methods.initData();
    });
    onBeforeUnmount(()=>{
      clearInterval(timer);
    })
    return { ...toRefs(state), methods };
  },
  methods: {

  },
  watch: {

  }
}
</script>

<style lang="scss" scoped>
.musicMain{
  padding: 0 2px;
  position: absolute;
  width: 100%;
  //background-color: #666666;
  border-radius: 10px;
  .musicIcon{
    align-items: center;
  }

}
.musicIcon{
  position: static;
  z-index: 999;
}
.playback-info {
  position: relative;
  width: 100%;
  top: 10px;
  display: grid;
  grid-area: 1/2/2;
  justify-self: start;
  grid-template-columns: auto 1fr;
  .musicSong {
    position: relative;
    margin: 0 10px;
  }
}
.musicImg{
  width: 100%;
  right: 0;
  img{
    width: calc(54px * (var(--aspect-ratio)));
    max-width: 54px;
    margin: 3px;
  }
}
.musicListIcon{
  border-radius: 2px;
  background-color: #6c6c6c;
}
.musicIcon{
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-items: center;
  margin: 20px 20px 0 ;
  .mr-1{
    width: 40px;
  }
  .mr-2{
    width: 45px;
  }
}
.musicList{
  overflow: auto;
  overflow: hidden;
  margin-top: 1rem;
  color: var(--text-color);
  height: 450px;
  overflow-y: scroll;
  background-color: #fff;
}
.hide-music-list {
  height: 0;
  // visibility: hidden;
  // opacity: 0;
  margin-top: 0!important;
}

.MusicProgress {
  position: relative;
  width: 100%;
  height: 2px;
  margin-bottom: 10px;
  background: #bfbfc4;
  cursor: pointer;
  margin: 20px 20px 0 0 ;
  .start-time {
    position: absolute;
    left: 0;
    top: 4px;
    color: #999;
    font-size: 10px;
  }
  .end-time {
    position: absolute;
    right: 0px;
    top: 4px;
    color: #999;
    font-size: 10px;
  }
  .line {
    position: absolute;
    left: 0;
    right: 10px;
    top: 0;
    border-radius: 3px;
    height: 3px;
    max-width: 100%;
    width: 0%;
    background: #7f7f7f;
    .line-btn {
      position: absolute;
      right: 0px;
      content: "";
      width: 3px;
      height: 8px;
      background: #7f7f7f;
      animation: playingBtn 2s ease-in-out infinite alternate;

      top: 50%;
      transform: translateY(-50%);
      cursor: pointer;
      transition: all 0.25s;
    }
    .line-btn:hover {
      right: -4px;
      width: 5px;
      height: 8px;
    }
  }
}
</style>