<template>
  <!-- 隐藏诗歌弹窗 -->
  <div v-if="showPoem" class="poem-overlay" @click="closePoem" :style="overlayStyle">
    <div class="poem-container" :style="containerStyle" @click.stop>
      <div class="poem-header">
        <h2 class="poem-title">{{ currentPoem?.title }}</h2>
        <div class="poem-mood" v-if="currentPoem?.mood">
          <span class="mood-tag">{{ currentPoem.mood }}</span>
        </div>
      </div>
      
      <div class="poem-content">
        <pre class="poem-text" :style="textStyle">{{ currentPoem?.content }}</pre>
      </div>
      
      <div class="poem-footer">
        <v-btn 
          variant="tonal" 
          @click="closePoem"
          class="close-btn"
          size="small"
        >
          关闭
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import config from '../config.js';

export default {
  name: 'HiddenPoems',
  data() {
    return {
      showPoem: false,
      currentPoem: null,
      turntableClickCount: 0, // 统一管理转盘点击次数
      lastTurntableClickTime: 0,
      turntableClickTimer: null,
      lastTriggerTime: 0,
      dailyViewCount: 0,
      lastViewDate: null,
      isShiftPressed: false,
      
      // 配置
      poemConfig: config.hiddenPoems
    }
  },
  computed: {
    overlayStyle() {
      return {
        background: this.poemConfig.display.background,
        animation: `${this.poemConfig.display.animation} ${this.poemConfig.display.duration / 1000}s ease-out`
      }
    },
    
    containerStyle() {
      return {
        maxWidth: this.poemConfig.display.maxWidth,
        maxHeight: this.poemConfig.display.maxHeight,
        textAlign: this.poemConfig.display.position,
        overflow: this.poemConfig.display.overflow
      }
    },
    
    textStyle() {
      return {
        color: this.poemConfig.display.textColor
      }
    }
  },
  mounted() {
    if (!this.poemConfig.enabled) return;
    
    // 初始化访问控制
    this.loadAccessState();
    
    // 设置事件监听器
    this.setupEventListeners();
    
    // 检查时间触发条件
    this.checkTimeTrigger();
    
    // 每天重置访问次数
    this.setupDailyReset();
  },
  beforeUnmount() {
    this.removeEventListeners();
  },
  methods: {
    setupEventListeners() {
      const trigger = this.poemConfig.trigger;
      
      // 监听转盘点击事件
      document.addEventListener('turntable-click', this.handleTurntableClick);
      
      if (trigger.type === 'multi' || trigger.type === 'combo') {
        // 监听头像点击
        const avatar = document.querySelector('.leleo-left-avatar');
        if (avatar) {
          avatar.addEventListener('click', this.handleAvatarClick);
          
          if (trigger.type === 'combo') {
            // 监听键盘事件
            document.addEventListener('keydown', this.handleKeyDown);
            document.addEventListener('keyup', this.handleKeyUp);
          }
        }
      }
    },
    
    removeEventListeners() {
      // 移除转盘点击监听
      document.removeEventListener('turntable-click', this.handleTurntableClick);
      
      const avatar = document.querySelector('.leleo-left-avatar');
      if (avatar) {
        avatar.removeEventListener('click', this.handleAvatarClick);
      }
      document.removeEventListener('keydown', this.handleKeyDown);
      document.removeEventListener('keyup', this.handleKeyUp);
    },
    
    handleAvatarClick(event) {
      if (!this.canTrigger()) return;
      
      const trigger = this.poemConfig.trigger;
      const now = Date.now();
      
      if (trigger.type === 'multi') {
        // 多次点击触发
        this.clickCount++;
        
        if (this.clickCount >= trigger.params.clickCount) {
          this.showRandomPoem();
          this.clickCount = 0;
          this.lastTriggerTime = now;
        }
        
        // 1秒后重置计数
        setTimeout(() => {
          if (now === this.lastTriggerTime) {
            this.clickCount = 0;
          }
        }, 1000);
        
      } else if (trigger.type === 'combo') {
        // 组合操作触发
        if (this.isShiftPressed) {
          this.clickCount++;
          
          if (this.clickCount >= trigger.params.combo[1]) {
            this.showRandomPoem();
            this.clickCount = 0;
            this.lastTriggerTime = now;
          }
        }
      }
    },
    
    handleKeyDown(event) {
      if (event.key === 'Shift') {
        this.isShiftPressed = true;
      }
    },
    
    handleKeyUp(event) {
      if (event.key === 'Shift') {
        this.isShiftPressed = false;
      }
    },
    
    // 处理转盘点击事件
    handleTurntableClick(event) {
      if (!this.canTrigger()) return;
      
      const trigger = this.poemConfig.trigger;
      const requiredClicks = trigger.params.turntableClicks || 6;
      const now = Date.now();
      
      // 统一管理转盘点击次数
      this.turntableClickCount++;
      
      console.log(`转盘点击: ${this.turntableClickCount}/${requiredClicks} (来源: ${event.detail.source})`);
      
      if (this.turntableClickTimer) {
        clearTimeout(this.turntableClickTimer);
      }
      
      // 1秒内连续点击触发
      this.turntableClickTimer = setTimeout(() => {
        if (this.turntableClickCount >= requiredClicks) {
          console.log(`转盘触发隐藏诗歌，点击次数: ${this.turntableClickCount}`);
          this.showRandomPoem();
          this.lastTriggerTime = now;
        }
        this.turntableClickCount = 0;
      }, 1000);
    },
    
    checkTimeTrigger() {
      const trigger = this.poemConfig.trigger;
      
      if (trigger.type === 'time') {
        const now = new Date();
        const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
        
        const [startTime, endTime] = trigger.params.timeRange;
        
        // 检查是否在指定时间段内
        let inTimeRange = false;
        if (startTime <= endTime) {
          inTimeRange = currentTime >= startTime && currentTime <= endTime;
        } else {
          // 跨天的情况，如22:00到06:00
          inTimeRange = currentTime >= startTime || currentTime <= endTime;
        }
        
        if (inTimeRange && !this.showPoem && this.canTrigger()) {
          // 显示时间段特定的诗歌
          const timePoem = this.getPoemByCondition('night');
          if (timePoem) {
            this.showPoemContent(timePoem);
          }
        }
      }
    },
    
    setupDailyReset() {
      const now = new Date();
      const today = now.toDateString();
      
      if (this.lastViewDate !== today) {
        this.dailyViewCount = 0;
        this.lastViewDate = today;
        this.saveAccessState();
      }
      
      // 每分钟检查一次
      setInterval(() => {
        const newToday = new Date().toDateString();
        if (this.lastViewDate !== newToday) {
          this.dailyViewCount = 0;
          this.lastViewDate = newToday;
          this.saveAccessState();
        }
      }, 60000);
    },
    
    canTrigger() {
      const access = this.poemConfig.access;
      
      // 检查冷却时间
      const now = Date.now();
      if (now - this.lastTriggerTime < access.cooldown) {
        return false;
      }
      
      // 检查每日访问次数
      if (this.dailyViewCount >= access.maxViews) {
        return false;
      }
      
      return true;
    },
    
    showRandomPoem() {
      const availablePoems = this.getAvailablePoems();
      const randomPoem = availablePoems[Math.floor(Math.random() * availablePoems.length)];
      
      if (randomPoem) {
        this.showPoemContent(randomPoem);
      }
    },
    
    getAvailablePoems() {
      const now = new Date();
      const hour = now.getHours();
      const isDaytime = hour >= 6 && hour < 22;
      
      return this.poemConfig.poems.filter(poem => {
        const condition = poem.showCondition;
        
        if (condition === 'always') return true;
        if (condition === 'daytime') return isDaytime;
        if (condition === 'night') return !isDaytime;
        if (condition === 'random') return Math.random() > 0.7; // 30%概率显示
        
        return true;
      });
    },
    
    getPoemByCondition(condition) {
      return this.poemConfig.poems.find(poem => poem.showCondition === condition);
    },
    
    showPoemContent(poem) {
      if (!this.canTrigger()) return;
      
      this.currentPoem = poem;
      this.showPoem = true;
      
      // 更新访问统计
      this.dailyViewCount++;
      this.lastTriggerTime = Date.now();
      this.saveAccessState();
      
      // 自动关闭
      setTimeout(() => {
        if (this.showPoem) {
          this.closePoem();
        }
      }, this.poemConfig.display.duration);
    },
    
    closePoem() {
      this.showPoem = false;
      this.currentPoem = null;
    },
    
    loadAccessState() {
      if (!this.poemConfig.access.rememberState) return;
      
      try {
        const saved = localStorage.getItem('hiddenPoems_access');
        if (saved) {
          const state = JSON.parse(saved);
          this.dailyViewCount = state.dailyViewCount || 0;
          this.lastViewDate = state.lastViewDate;
          this.lastTriggerTime = state.lastTriggerTime || 0;
        }
      } catch (e) {
        console.warn('Failed to load access state:', e);
      }
    },
    
    saveAccessState() {
      if (!this.poemConfig.access.rememberState) return;
      
      try {
        const state = {
          dailyViewCount: this.dailyViewCount,
          lastViewDate: this.lastViewDate,
          lastTriggerTime: this.lastTriggerTime
        };
        localStorage.setItem('hiddenPoems_access', JSON.stringify(state));
      } catch (e) {
        console.warn('Failed to save access state:', e);
      }
    }
  }
}
</script>

<style scoped>
.poem-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99999;
  cursor: pointer;
  backdrop-filter: blur(5px);
}

.poem-container {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  padding: 40px;
  max-width: 600px;
  max-height: 80vh;
  width: 90%;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  cursor: default;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}

.poem-header {
  text-align: center;
  margin-bottom: 30px;
}

.poem-title {
  font-size: 2rem;
  font-weight: 300;
  margin: 0 0 10px 0;
  letter-spacing: 2px;
}

.poem-mood {
  margin-top: 10px;
}

.mood-tag {
  background: rgba(255, 255, 255, 0.2);
  color: #fff;
  padding: 4px 12px;
  border-radius: 15px;
  font-size: 0.8rem;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.poem-content {
  text-align: center;
  margin-bottom: 30px;
  flex: 1;
  overflow-y: auto;
  max-height: calc(80vh - 200px); /* 减去标题和按钮的高度 */
  padding-right: 10px;
}

/* 自定义滚动条 */
.poem-content::-webkit-scrollbar {
  width: 6px;
}

.poem-content::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
}

.poem-content::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 3px;
}

.poem-content::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.5);
}

.poem-text {
  font-family: 'SimSun', 'STKaiti', 'KaiTi', serif;
  line-height: 1.8;
  white-space: pre-wrap;
  word-wrap: break-word;
  font-size: 1.1rem;
  margin: 0;
  letter-spacing: 0.5px;
  text-align: left;
  padding: 0 10px;
}

.poem-footer {
  text-align: center;
}

.close-btn {
  background: rgba(255, 255, 255, 0.1) !important;
  color: #fff !important;
  border: 1px solid rgba(255, 255, 255, 0.3) !important;
  border-radius: 20px;
  transition: all 0.3s ease;
}

.close-btn:hover {
  background: rgba(255, 255, 255, 0.2) !important;
  transform: scale(1.05);
}

/* 动画定义 */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes fadeOut {
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: 0;
    transform: scale(0.9);
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .poem-container {
    padding: 25px;
    margin: 20px;
  }
  
  .poem-title {
    font-size: 1.5rem;
  }
  
  .poem-text {
    font-size: 1.1rem;
    line-height: 1.8;
  }
}

@media (max-width: 480px) {
  .poem-container {
    padding: 20px;
    margin: 10px;
  }
  
  .poem-title {
    font-size: 1.3rem;
  }
  
  .poem-text {
    font-size: 1rem;
  }
}
</style>