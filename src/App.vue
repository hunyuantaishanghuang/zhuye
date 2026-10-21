<template>
  <v-app class="vapp-fullscreen-background" style="overflow: hidden;" :class="{ 'radius-before': !xs }"
  :style="xs?{height: '100%',width: '100%',top: '0',left:'0'}:(sm?{height: '98%',width: '98%',top: '1%',left:' 1%'}:{height: '96.6%',width: '99%',top: '1.7%',left:' 0.5%'})">
    <transition name="fade">
      <div class="loading" v-show="isloading">
        <loader></loader>
      </div>
    </transition>

    <video autoplay loop muted class="video-bg" id="bg-video" ref="VdPlayer"
    :style="xs?{height: '100%',width: '100%',top: '0',left:'0'}:(sm?{height: '98%',width: '98%',top: '1%',left:' 1%','border-radius': '16px'}:{height: '96.6%',width: '99%',top: '1.7%',left:' 0.5%','border-radius': '16px',})">
        <source :src=videosrc type="video/mp4">
    </video>

    <div class="floating-switch-container">
      <v-switch
        v-model="isClearScreen"
        inset
        :style="xs?{'transform':'scale(0.6) translateX(15%)'}:{}"
        class="floating-switch"
        @mouseover="expandSwitch"
        @mouseleave="collapseSwitch"
      ></v-switch>
    </div>
    
    <div v-show="!isloading && !isClearScreen" :style="xs||sm?{'overflow-y': 'auto','overflow-x': 'hidden'}:{}">
        <v-row>
            <v-col cols="12" md="4" lg="3" class="leleo-left" align="center">
              <div :style="xs||sm?{'font-size':'2.3rem'}:{'display':'none'}" class="leleo-left-welcome">{{ configdata.welcometitle }}</div>  
              <v-avatar class="leleo-left-avatar" :size="xs||sm?120:140" :style="xs||sm?{'margin-top': '0'}:{'margin-top': '2rem'}" @mouseenter="musicplayershow(1)" @mouseleave="musicplayershow(0)">
                  <v-img :class="{'leleo-spin':isPlaying}"
                  alt="Leleo"
                  :src=configdata.avatar
                  ></v-img>
                  <!-- 由于当ismusicplayer显示后，fadein无效果，所以需要设置一个过渡动画 -->
                  <transition name="fade">
                  <v-card v-show="ismusicplayer" class="musicplayer" :class="{'fade-in':ismusicplayer}" variant="tonal">
                      <div v-if="audioLoading" class="loading-spinner">
                          <v-progress-circular indeterminate></v-progress-circular>
                      </div>
                      <span ref="audiotitle" class="musicplayer-text"
                        style="top: 1.6rem;font-weight: bolder;"
                      >{{ musicinfo?.[0]?.title }}</span>
                      <span ref="audioauthor" class="musicplayer-text"
                        style="bottom: 1.4rem;"
                      >{{ musicinfo?.[0]?.author }}</span>
                      <audio v-show="false" ref="audioPlayer" :src="musicinfo?.[0]?.url"
                      @waiting="onWaiting"
                      @canplay="onCanPlay">
                      </audio>
                      <v-btn :size="xs||sm?22:30" color="#999999" icon @click="previousTrack()">
                      <v-icon>mdi-skip-previous</v-icon>
                      </v-btn>
                      <v-btn :size="xs||sm?35:48" color="#999999" icon @click="togglePlay()">
                      <v-icon>{{ isPlaying? 'mdi-pause' : 'mdi-play' }}</v-icon>
                      </v-btn>
                      <v-btn :size="xs||sm?22:30" color="#999999" icon @click="nextTrack()">
                      <v-icon>mdi-skip-next</v-icon>
                      </v-btn>
                  </v-card>
                  </transition>
                </v-avatar>

                <v-card class="ma-5 pa-2 leleo-left-card" variant="tonal" :max-width="xs?270:300" style="text-align: center;">
                    <template v-slot:title>
                    <span>Tags</span>
                    </template>
                    <template v-for="(item, index) in personalizedtags" :key="`tag-${index}`">
                      <v-chip 
                        density="compact" 
                        link 
                        class="ma-1" 
                        size="small"
                        @click="showTagDetails(item)"
                        @mouseenter="playTagEffect(item, index)"
                        @mouseleave="stopTagEffect(index)">
                        <span class="d-flex align-center">
                          <span v-if="item.icon" class="mr-1">{{ item.icon }}</span>
                          <span>{{ item.name }}</span>
                        </span>
                      </v-chip>
                    </template>
                </v-card>

                <div class="leleo-left-chart">
                    <polarchart :style="xs||sm?{'height':'210px'}:{'height':'270px'}" @turntable-click="handleTurntableClick"></polarchart>
                </div>

                <v-container class="leleo-left-socialIconsContainer">
                    <v-row align="center" justify="center">
                    <v-col class="pa-1" cols="auto" v-for="item in socialPlatformIcons">
                        <v-btn :size="xs?25:33" variant="tonal" color="var(--leleo-vcard-color)"
                        class="ma-1 leleo-social-bticon"
                        icon
                        :href="item.link" target="_blank"
                        >
                    <v-icon :icon=item.icon :size="xs?20:25" class="social-bticon-icon"></v-icon></v-btn>
                    </v-col>
                    </v-row>

                    <v-row align="center" justify="center" class="setting">
                    <v-col class="ma-1" cols="auto">
                        <v-speed-dial
                            :location="xs||sm ?'top center':'right center'"
                            transition="slide-y-transition"
                        >
                        <template v-slot:activator="{ props: activatorProps }">
                            <v-fab style="width: 2.5rem;height: 2.5rem;" color="var(--leleo-vcard-color)"
                            variant="tonal"
                            v-bind="activatorProps"
                            icon="mdi-cog"
                            ></v-fab>
                        </template>
                        <v-btn variant="tonal" class="setbtn" key="1" icon="mdi-key-chain" @click="dialog1 = true" size="31" color="var(--leleo-vcard-color)"></v-btn>
                        <v-btn variant="tonal" class="setbtn" key="2" icon="mdi-information" @click="dialog2 = true" size="31" color="var(--leleo-vcard-color)"></v-btn>
                        <v-btn variant="tonal" class="setbtn" key="3" icon="$error" size="31" color="var(--leleo-vcard-color)"></v-btn>
                        </v-speed-dial>
                    </v-col>
                    </v-row>
                </v-container>
            </v-col>

            <v-col cols="12" md="8" lg="9" style="height: 100vh;" :style="xs||sm ?{}:{'overflow': 'auto'}">
                <homeright :configdata=configdata :formattedTime=formattedTime 
                :formattedDate=formattedDate :projectcards=projectcards></homeright>
            </v-col>
        </v-row>
    </div>

    <v-dialog
        v-model="dialog1"
        width="1000"
        heihght="700"
      >
      <v-card elevation="3" style="backdrop-filter: blur(10px);">
        <v-tabs
          v-model="tab"
          :items="tabs"
          align-tabs="center"
          height="60"
          slider-color=var(--leleo-vcard-color)
        >
          <template v-slot:tab="{ item }">
            <v-tab
              :prepend-icon="item.icon"
              :text="item.text"
              :value="item.value"
              class="text-none"
            ></v-tab>
          </template>
          
          <template v-slot:item="{ item }">
            <v-tabs-window-item :value="item.value" class="pa-4">
              <div v-if="item.value=='tab-3' && musicinfoLoading" class="loading-spinner" align="center">
                  <v-progress-circular indeterminate></v-progress-circular>
              </div>
              <!-- 通过组件绑定不同tab项的组件 -->
              <component v-if="item.value!='tab-3' || (item.value=='tab-3' && !musicinfoLoading)" :is=item.component @cancel="handleCancel" 
              :musicinfo="item.value=='tab-3'?musicinfo:[]"
              :currentIndex="item.value=='tab-3'?playlistIndex:null"
              :isPlaying="item.value=='tab-3'?isPlaying:null"
              :audioPlayer="item.value=='tab-3'?audioPlayer:null"
              :fromLyrics="item.value=='tab-3'?lyrics:null"
              :audioLoading="item.value=='tab-3'?audioLoading:null"
              @update:current-index="updateCurrentIndex"
              @update:is-playing="updateIsPlaying"
              @update:current-lyrics="updateLyrics"
              ></component>
            </v-tabs-window-item>
          </template>
        </v-tabs>
      </v-card>
      </v-dialog>

      <v-dialog
        v-model="dialog2"
        width="700"
        heihght="500"
      >
      <v-card class="ma-3 pa-2" hover
          variant="tonal"
          rounded="lg"
          style="text-align: center;backdrop-filter: blur(10px);"
        >
          <template v-slot:title >
            <span class="leleo-card-title">关于</span>
          </template>
          <div style="display: flex;flex-direction: column;align-items: center;">
            <v-card class="ma-3 pa-2" hover
              variant="tonal"
              max-width="400"
              rounded="lg"
              style="text-align: center;"
              >
              <template v-slot:subtitle>
                <span class="leleo-card-subtitle">本页基于以下技术及服务搭建</span>
              </template>
              <div>
                <v-tooltip  v-for="item in stackicons" v-model="item.model" location="top">
                  <template v-slot:activator="{ props }">
                    <v-btn icon v-bind="props" :color=item.color rounded="lg" class="ma-1 stack-btn" size="35">
                      <v-icon size="25" color="white">{{item.icon}}</v-icon>
                    </v-btn>
                  </template>
                  <span>{{item.tip}}</span>
                </v-tooltip>
                <!-- 自定义 -->
                <v-tooltip location="top">
                  <template v-slot:activator="{ props }">
                    <v-btn v-bind="props" rounded="lg" class="ma-1 stack-btn" size="35">
                      <v-avatar image="img/stackicon/vite.svg" rounded="0" size="23"></v-avatar>
                    </v-btn>
                  </template>
                  <span>vite</span>
                </v-tooltip>
                <v-tooltip location="top">
                  <template v-slot:activator="{ props }">
                    <v-btn v-bind="props" rounded="lg" class="ma-1 stack-btn" size="35" color="#254B7C">
                      <span style="font-size: 8px;font-weight: bolder;">{less}</span>
                    </v-btn>
                  </template>
                  <span>less</span>
                </v-tooltip>
                <v-tooltip location="top">
                  <template v-slot:activator="{ props }">
                    <v-btn v-bind="props" rounded="lg" class="ma-1 stack-btn" size="35">
                      <v-avatar image="img/stackicon/mdi.svg" rounded="0" size="35"></v-avatar>
                    </v-btn>
                  </template>
                  <span>mdi</span>
                </v-tooltip>
                <v-tooltip location="top">
                  <template v-slot:activator="{ props }">
                    <v-btn v-bind="props" rounded="lg" class="ma-1 stack-btn" size="35" color="#0F1225">
                      <v-avatar image="img/stackicon/meting.png" rounded="0" size="23"></v-avatar>
                    </v-btn>
                  </template>
                  <span>meting</span>
                </v-tooltip>
                <v-tooltip location="top">
                  <template v-slot:activator="{ props }">
                    <v-btn v-bind="props" rounded="lg" class="ma-1 stack-btn" size="35" color="#070707">
                      <v-avatar image="img/stackicon/uiverse.png" rounded="0" size="23"></v-avatar>
                    </v-btn>
                  </template>
                  <span>uiverse</span>
                </v-tooltip>
              </div>
            </v-card>

            <p class="ma-6">
                <span v-for="item in configdata.statement">
                  {{ item }}<br>
                </span>
            </p>
          </div>
        </v-card>
    </v-dialog>
    
    <!-- 全局信件组件 -->
    <global-letter ref="globalLetter"></global-letter>
    
    <!-- 隐藏诗歌组件 -->
    <hidden-poems ref="hiddenPoems"></hidden-poems>
  </v-app>
</template>

<script>
import homeright from './components/hoemright.vue';
import typewriter from './components/typewriter.vue';
import tab1 from './components/tabs/tab1.vue';
import tab2 from './components/tabs/tab2.vue';
import tab3 from './components/tabs/tab3.vue';
import loader from './components/loader.vue';
import polarchart from './components/polarchart.vue';
import globalLetter from './components/global-letter.vue';
import hiddenPoems from './components/hiddenPoems.vue';
import config from './config.js';
import { getCookie } from './utils/cookieUtils.js';
import { setMeta,getFormattedTime,getFormattedDate,dataConsole } from './utils/common.js';
import { useDisplay } from 'vuetify'

export default {
  components: {
    tab1,tab2,tab3,loader,homeright,typewriter,polarchart,globalLetter,hiddenPoems
  },
  setup() {
    const { xs,sm,md } = useDisplay()
    return { xs,sm,md };
  },
  data() {
    return {
      isloading:false,
      isClearScreen: false,
      formattedTime:"",
      formattedDate:"",
      configdata: config,
      dialog1: false,
      dialog2: false,
      personalizedtags: null,
      videosrc: '',
      ismusicplayer: false,
      isPlaying:false,
      playlistIndex: 0,
      audioLoading: false,
      musicinfo: null,
      musicinfoLoading:false,
      lyrics:{},
      socialPlatformIcons: null,
      isExpanded: false,
      stackicons:[
        {icon:"mdi-vuejs",color:"green", model: false,tip: 'vue'},
        {icon:"mdi-language-javascript",color:"#CAD300", model: false,tip: 'javascript'},
        {icon:"mdi-language-css3",color:"blue", model: false,tip: 'css'},
        {icon:"mdi-language-html5",color:"red", model: false,tip: 'html'},
        {icon:"$vuetify",color:"#1697F6", model: false,tip: 'vuetify'},
      ],
      projectcards:null,
      tab: null,
      tabs: [
        {
          icon: 'mdi-pencil-plus',
          text: '样式预览',
          value: 'tab-1',
          component: "tab1",
        },
        {
          icon: 'mdi-wallpaper',
          text: '背景预览',
          value: 'tab-2',
          component: "tab2",
        },
        {
          icon: 'mdi-music-circle-outline',
          text: '音乐播放',
          value: 'tab-3',
          component: "tab3",
        },
      ],
    };
  },
  async mounted() {
    if(import.meta.env.VITE_CONFIG){
      this.configdata = JSON.parse(import.meta.env.VITE_CONFIG);
    }
    this.projectcards = this.configdata.projectcards;this.socialPlatformIcons = this.configdata.socialPlatformIcons;
    this.personalizedtags = this.configdata.tags;
    this.isloading = true;
    let imageurl = "";
    this.dataConsole();
    this.setMeta(this.configdata.metaData.title,this.configdata.metaData.description,this.configdata.metaData.keywords,this.configdata.metaData.icon);
    
    imageurl = this.setMainProperty(imageurl);

    //异步等待背景壁纸包括视频壁纸加载完成后再显示页面
    const loadImage = () => {
        const imageUrls = [
          config.avatar,
          ...config.projectcards.map(item => item.img)
        ];
        return new Promise((resolve, reject) => {
          const imagePromises = imageUrls.map((url) => {
            return new Promise((resolve, reject) => {
                const imgs = new Image();
                imgs.src = url;
                imgs.onload = () => resolve();
                imgs.onerror = (_err) => reject(_err);
            });
          })

          // 设置超时机制：1秒（大幅缩短等待时间）
          const timeoutPromise = new Promise((resolve) => {
            setTimeout(() => {
              resolve();
            }, 1000);
          });
          
          // 等待所有图片加载完成或超时
          Promise.race([Promise.all(imagePromises), timeoutPromise]).then(()=>{
            if(imageurl){
              const img = new Image();
              img.src = imageurl;
              // resolve() 函数通将一个 Promise 对象从未完成状态转变为已完成状态
              img.onload = () => {resolve();};
              img.onerror = (_err) => {reject(_err);};
            }else{
              const video = this.$refs.VdPlayer;
              video.onloadedmetadata = () => {
                setTimeout(() => {
                  resolve();
                }, "200");  
                resolve();
              };
              video.onerror = (_err) => {resolve();};
            }
          })
        })  
     };

    loadImage().then(() => {
        this.formattedTime =  this.getFormattedTime(new Date());
        this.formattedDate =  this.getFormattedDate(new Date());
        setTimeout(() => {
          this.isloading = false;
        }, "500");      
      }).catch((err) => {
        console.error('壁纸加载失败:', err);
        setTimeout(() => {
          this.isloading = false;
        }, "100");  
      });
 
      setInterval(() => {
        this.formattedTime =  this.getFormattedTime(new Date()) ;
      }, 1000);

      await this.getMusicInfo();  //获取音乐数据
      this.setupAudioListener();  //设置 ended 事件监听器，当歌曲播放结束时自动调用 nextTrack 方法。
  },

  beforeDestroy() {     //在组件销毁前移除事件监听器，防止内存泄漏。
    this.$refs.audioPlayer.removeEventListener('ended',  this.nextTrack);
  },

  watch:{
    isClearScreen(val){
      if(!this.videosrc){
        return
      }
      if(val){
        this.$refs.VdPlayer.style.zIndex = 0; 
        this.$refs.VdPlayer.controls = true;
      }else{
        this.$refs.VdPlayer.style.zIndex = -100; 
        this.$refs.VdPlayer.controls = false;
      }
    },

    audioLoading(val){
      this.isPlaying = !val;
    }
  },
  computed: {
    currentSong() {
      return this.musicinfo[this.playlistIndex];
    },

    audioPlayer() {
      return this.$refs.audioPlayer;
    }
  },
  
  methods: {
    getCookie,
    setMeta,
    getFormattedTime,
    getFormattedDate,
    dataConsole,

    // 处理转盘点击（统一处理两个转盘的点击）
    handleTurntableClick() {
      // 获取隐藏诗歌组件实例
      const hiddenPoemsComponent = this.$refs.hiddenPoems;
      if (!hiddenPoemsComponent) {
        console.warn('隐藏诗歌组件未找到');
        return;
      }

      // 直接调用隐藏诗歌组件的显示方法
      hiddenPoemsComponent.showRandomPoem('turntable');
    },

    setMainProperty(imageurl){
      const root = document.documentElement;
      let leleodata = this.getCookie("leleodata");
      if(leleodata){
        root.style.setProperty('--leleo-welcomtitle-color', `${leleodata.color.welcometitlecolor}`);
        root.style.setProperty('--leleo-vcard-color', `${leleodata.color.themecolor}`);
        root.style.setProperty('--leleo-brightness', `${leleodata.brightness}%`);
        root.style.setProperty('--leleo-blur', `${leleodata.blur}px`); 
      }else{
        root.style.setProperty('--leleo-welcomtitle-color', `${this.configdata.color.welcometitlecolor}`);
        root.style.setProperty('--leleo-vcard-color', `${this.configdata.color.themecolor}`);  
        root.style.setProperty('--leleo-brightness', `${this.configdata.brightness}%`);  
        root.style.setProperty('--leleo-blur', `${this.configdata.blur}px`);
      }
  
      let leleodatabackground = this.getCookie("leleodatabackground");
      if(leleodatabackground){
        if(this.xs.value){
          if(leleodatabackground.mobile.type == "pic"){
            root.style.setProperty('--leleo-background-image-url', `url('${new URL(leleodatabackground.mobile.datainfo.url, document.baseURI).href}')`);
            imageurl = leleodatabackground.mobile.datainfo.url;
            return imageurl;
          }else{
            this.videosrc = leleodatabackground.mobile.datainfo.url;
          }
        }else{
          if(leleodatabackground.pc.type == "pic"){
            root.style.setProperty('--leleo-background-image-url', `url('${new URL(leleodatabackground.pc.datainfo.url, document.baseURI).href}')`);
            imageurl = leleodatabackground.pc.datainfo.url;
            return imageurl;
          }else{
            this.videosrc = leleodatabackground.pc.datainfo.url;
          }
        }
          
      }else{
        if(this.xs.value){
          if(this.configdata.background.mobile.type == "pic"){
            root.style.setProperty('--leleo-background-image-url', `url('${new URL(this.configdata.background.mobile.datainfo.url, document.baseURI).href}')`);
            imageurl = this.configdata.background.mobile.datainfo.url;
            return imageurl;
          }else{
            this.videosrc = this.configdata.background.mobile.datainfo.url;
          }
        }else{
          if(this.configdata.background.pc.type == "pic"){
            root.style.setProperty('--leleo-background-image-url', `url('${new URL(this.configdata.background.pc.datainfo.url, document.baseURI).href}')`);
            imageurl = this.configdata.background.pc.datainfo.url;
            return imageurl;
          }else{
            this.videosrc = this.configdata.background.pc.datainfo.url;
          }
          
        }
      }
    },

    projectcardsShow(key){
      this.projectcards.forEach((item,index)=>{
        if(index!= key){
          item.show = false;
        }
      })
    },

    handleCancel(){
      this.dialog1 = false;
    },

    jump(url){
      window.open(url, '_blank').focus();
    },
    
    async getMusicInfo(){
      this.musicinfoLoading = true;
      try {
        const response = await fetch(`https://api.i-meto.com/meting/api?server=${this.configdata.musicPlayer.server}&type=${this.configdata.musicPlayer.type}&id=${this.configdata.musicPlayer.id}`
        );
        if (!response.ok) {
          throw new Error('网络请求失败');
        }
        this.musicinfo = await response.json();
        this.musicinfoLoading = false;
      } catch (error) {
        console.error('请求失败:', error);
      }
      
    },

    musicplayershow(val) {
        this.ismusicplayer = val;
    },

    setupAudioListener() {
      this.$refs.audioPlayer.addEventListener('ended', this.nextTrack);
    },

    togglePlay() {
      if (!this.isPlaying) {
        this.audioPlayer.play();
        this.isVdMuted = true;
      } else {
        this.audioPlayer.pause();
        this.isVdMuted = false;
      }
      this.isPlaying = !this.musicinfoLoading && !this.isPlaying;
    },

    previousTrack() {
      this.playlistIndex = this.playlistIndex > 0 ? this.playlistIndex - 1 : this.musicinfo.length - 1;
      this.updateAudio();
    },

    nextTrack() {
      this.playlistIndex = this.playlistIndex < this.musicinfo.length - 1 ? this.playlistIndex + 1 : 0;
      this.updateAudio();
    },

    updateAudio() {
      this.audioPlayer.src = this.currentSong.url;
      this.$refs.audiotitle.innerText = this.currentSong.title;
      this.$refs.audioauthor.innerText = this.currentSong.author;
      this.isPlaying = true;
      this.audioPlayer.play();
    },

    updateCurrentIndex(index) {
      this.playlistIndex = index;
      this.updateAudio();
    },

    updateIsPlaying(isPlaying) {
      this.isPlaying = isPlaying;
    },

    updateLyrics(lyrics){
      this.lyrics = lyrics;
    },

    // 监听等待事件（缓冲不足）
    onWaiting() {
      this.audioLoading = true;
    },

    // 监听可以播放事件（缓冲足够）
    onCanPlay() {
      this.audioLoading = false;
    },

    expandSwitch() {
      this.isExpanded = true;
    },

    collapseSwitch() {
      this.isExpanded = false;
    },

    // 获取标签样式
    getTagStyle(tag) {
      const isObject = typeof tag === 'object' && tag !== null;
      const color = isObject ? tag.color || '#666' : '#666';
      return {
        backgroundColor: color + '20',
        borderColor: color,
        borderWidth: '2px',
        borderStyle: 'solid',
        color: color,
        fontWeight: 600,
        transition: 'all 0.3s ease',
        cursor: 'pointer',
        fontSize: '14px',
        fontFamily: 'inherit',
        textTransform: 'none',
        letterSpacing: '0px',
        whiteSpace: 'nowrap',
        lineHeight: '1.2',
        padding: '4px 8px',
        borderRadius: '16px'
      }
    },
    
    // 播放标签特效
    playTagEffect(tag, index) {
      const isObject = typeof tag === 'object' && tag !== null;
      const effect = isObject ? tag.hoverEffect : 'pulse';
      const chipElement = document.querySelectorAll('.tag-chip')[index];
      
      if (chipElement) {
        // 安全检查classList
        if (chipElement.classList) {
          chipElement.classList.add(`tag-${effect}`);
        }
        
        // 添加粒子效果
        if (effect === 'spark') {
          this.createSparkEffect(chipElement);
        } else if (effect === 'glitch') {
          this.createGlitchEffect(chipElement);
        }
      }
    },
    
    // 停止标签特效
    stopTagEffect(index) {
      const chipElement = document.querySelectorAll('.tag-chip')[index];
      if (chipElement && chipElement.classList) {
        // 移除所有特效类
        const classList = Array.from(chipElement.classList);
        classList.forEach(className => {
          if (className.startsWith('tag-') && className !== 'tag-chip') {
            chipElement.classList.remove(className);
          }
        });
      }
    },
    
    // 显示标签详情
    showTagDetails(tag) {
      const isObject = typeof tag === 'object' && tag !== null;
      const name = isObject ? tag.name : tag;
      const description = isObject ? tag.description : '一个有趣的标签';
      
      // 创建临时提示
      this.$toast?.(description) || console.log(`${name}: ${description}`);
    },
    
    // 火花效果
    createSparkEffect(element) {
      const rect = element.getBoundingClientRect();
      const spark = document.createElement('div');
      spark.style.cssText = `
        position: fixed;
        left: ${rect.left + rect.width/2}px;
        top: ${rect.top + rect.height/2}px;
        width: 4px;
        height: 4px;
        background: gold;
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        animation: sparkAnimation 1s ease-out forwards;
      `;
      document.body.appendChild(spark);
      setTimeout(() => spark.remove(), 1000);
    },
    
    // 故障效果
    createGlitchEffect(element) {
      element.style.animation = 'glitch 0.3s ease-in-out';
      setTimeout(() => {
        element.style.animation = '';
      }, 300);
    },

  },
};
</script>

<style scoped>
  @import url(/css/app.less);
  @import url(/css/mobile.less);
</style>

<style>
/* 标签特效样式 */
.tags-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
}

.tag-chip {
  position: relative;
  transition: all 0.3s ease;
  cursor: pointer;
  font-family: inherit !important;
  font-size: 0.875rem !important;
  font-weight: 600 !important;
  text-transform: none !important;
  letter-spacing: normal !important;
  white-space: nowrap !important;
  line-height: 1.2 !important;
}
/* 覆盖Vuetify默认样式 */
:deep(.v-chip) {
  font-family: inherit !important;
  font-size: 0.875rem !important;
  font-weight: 600 !important;
  text-transform: none !important;
  letter-spacing: normal !important;
  white-space: nowrap !important;
  line-height: 1.2 !important;
  padding:4px 8px !important;
}

:deep(.v-chip__content) {
  font-family: inherit !important;
  font-size: 0.875rem !important;
  font-weight: 600 !important;
  text-transform: none !important;
  letter-spacing: normal !important;
  white-space: nowrap !important;
  line-height: 1.2 !important;
  padding:4px 8px !important;
}

/* 隐藏Vuetify可能的默认文本显示 */
:deep(.v-chip__content > :not(.tag-icon):not(.tag-text)) {
  display: none !important;
}

/* 确保我们的自定义内容正确显示 */
.tag-chip .tag-icon,
.tag-chip .tag-text {
  display: inline-block !important;
  visibility: visible !important;
}
.tag-icon {
  margin-right:4px;
  font-size: 1.1em;
}

.tag-text {
  font-weight: 600;
}

/* 标签悬停特效 */
.tag-pulse {
  animation: tagPulse 0.6s ease-in-out infinite;
}

.tag-rotate {
  animation: tagRotate 0.8s ease-in-out;
}

.tag-bounce {
  animation: tagBounce 0.5s ease-in-out;
}

.tag-shake {
  animation: tagShake 0.3s ease-in-out;
}

.tag-spark {
  animation: tagSpark 0.4s ease-in-out;
}

.tag-glitch {
  animation: tagGlitch 0.2s ease-in-out;
}

/* 动画定义 */
@keyframes tagPulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}

@keyframes tagRotate {
  0% { transform: rotate(0deg) scale(1); }
  50% { transform: rotate(180deg) scale(1.15); }
  100% { transform: rotate(360deg) scale(1); }
}

@keyframes tagBounce {
  0%, 20%, 60%, 100% { transform: translateY(0); }
  40% { transform: translateY(-8px); }
  80% { transform: translateY(-4px); }
}

@keyframes tagShake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-4px) rotate(-2deg); }
  75% { transform: translateX(4px) rotate(2deg); }
}

@keyframes tagSpark {
  0% { transform: scale(1); box-shadow: 0 0 0 rgba(255, 215, 0, 0); }
  50% { transform: scale(1.1); box-shadow: 0 0 15px rgba(255, 215, 0, 0.8); }
  100% { transform: scale(1); box-shadow: 0 0 0 rgba(255, 215, 0, 0); }
}

@keyframes tagGlitch {
  0% { transform: translate(0); filter: hue-rotate(0deg); }
  20% { transform: translate(-2px, 2px); filter: hue-rotate(90deg); }
  40% { transform: translate(-2px, -2px); filter: hue-rotate(180deg); }
  60% { transform: translate(2px, -2px); filter: hue-rotate(270deg); }
  80% { transform: translate(2px, 2px); filter: hue-rotate(360deg); }
  100% { transform: translate(0); filter: hue-rotate(0deg); }
}

@keyframes sparkAnimation {
  0% { 
    transform: translate(-50%, -50%) scale(1);
    opacity: 1;
    box-shadow: 0 0 10px gold, 0 0 20px gold;
  }
  100% { 
    transform: translate(-50%, -50%) scale(3);
    opacity: 0;
    box-shadow: 0 0 30px gold, 0 0 60px gold;
  }
}

/* 标签悬停增强效果 */
.tag-chip:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.tag-chip:active {
  transform: translateY(0);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}
</style>