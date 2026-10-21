<template>
  <div v-if="isVisible" class="hidden-poem-overlay" @click="hidePoem">
    <div class="poem-container" :style="displayStyle">
      <h3 class="poem-title">{{ currentPoem.title }}</h3>
      <pre class="poem-content">{{ currentPoem.content }}</pre>
      <p class="poem-mood">{{ currentPoem.mood }}</p>
    </div>
  </div>
</template>

<script>
import config from '../config.js'

export default {
  name: 'hiddenPoems',
  data() {
    return {
      isVisible: false,
      currentPoem: null,
      clickSequence: [],
      lastClickTime: 0,
      shiftPressed: false,
      accessCount: 0,
      lastAccessTime: 0,
      lastAccessDate: null,
      config: config.hiddenPoems,
      hasUserInteracted: false, // 标记用户是否有过交互
      checkInterval: null, // 定时检查器
      debugMode: true // 调试模式
    }
  },
  computed: {
    displayStyle() {
      return {
        maxWidth: this.config.display.maxWidth,
        maxHeight: this.config.display.maxHeight,
        overflow: this.config.display.overflow,
        color: this.config.display.textColor,
        background: this.config.display.background
      }
    },
    // 标题触发的诗歌
    welcomePoems() {
      return this.config.poems.filter(poem => 
        poem.triggerType === 'welcome' || poem.triggerType === 'both'
      )
    },
    // 转盘触发的诗歌
    turntablePoems() {
      return this.config.poems.filter(poem => 
        poem.triggerType === 'turntable' || poem.triggerType === 'both'
      )
    }
  },
  mounted() {
    this.initEventListeners()
    this.loadAccessState()
    // 不再自动检查时间触发器，等待用户交互
    if (this.debugMode) {
      console.log('隐藏诗歌组件已加载，等待用户交互...')
    }
  },
  beforeUnmount() {
    document.removeEventListener('click', this.handleClick)
    document.removeEventListener('keydown', this.handleKeyDown)
    document.removeEventListener('keyup', this.handleKeyUp)
    document.removeEventListener('trigger-hidden-poem', this.handleTurntableTrigger)
    
    // 清理定时器
    if (this.checkInterval) {
      clearInterval(this.checkInterval)
    }
    
    // 清理用户交互监听器
    const userInteractionEvents = ['mousedown', 'touchstart', 'keydown']
    userInteractionEvents.forEach(eventType => {
      document.removeEventListener(eventType, this.handleUserInteraction)
    })
  },
  methods: {
    initEventListeners() {
      document.addEventListener('click', this.handleClick)
      document.addEventListener('keydown', this.handleKeyDown)
      document.addEventListener('keyup', this.handleKeyUp)
      document.addEventListener('trigger-hidden-poem', this.handleTurntableTrigger)
      
      // 监听用户交互
      const userInteractionEvents = ['mousedown', 'touchstart', 'keydown']
      userInteractionEvents.forEach(eventType => {
        document.addEventListener(eventType, this.handleUserInteraction, { once: true })
      })
    },

    // 处理用户交互
    handleUserInteraction() {
      this.hasUserInteracted = true
      if (this.debugMode) {
        console.log('用户已交互，启用时间触发器')
      }
      // 在用户交互后才开始时间检查
      this.startTimeBasedChecks()
    },

    // 开始基于时间的检查
    startTimeBasedChecks() {
      if (this.checkInterval) return
      
      // 延迟一段时间后开始检查，避免立即触发
      setTimeout(() => {
        this.checkTimeTrigger()
        // 设置定期检查（降低频率）
        this.checkInterval = setInterval(() => {
          this.checkTimeTrigger()
        }, 300000) // 5分钟检查一次
      }, 10000) // 10秒后开始检查
    },

    // 获取符合条件的诗歌
    getAvailablePoems() {
      const now = new Date()
      const hour = now.getHours()
      const condition = hour >= 22 || hour < 6 ? 'night' : 'daytime'
      
      return this.config.poems.filter(poem => {
        const showCond = poem.showCondition
        return showCond === 'always' || 
               showCond === 'random' && Math.random() > 0.5 ||
               showCond === condition
      })
    },

    // 标题点击触发
    handleClick(event) {
      const params = this.config.trigger.params
      
      if (params.clickElement === 'welcome') {
        let target = event.target
        while (target && target !== document.body) {
          // 安全检查className类型
          const hasClass = target.classList && target.classList.contains('leleo-left-welcome')
          const hasClassName = typeof target.className === 'string' && target.className.includes('leleo-left-welcome')
          const hasClosest = target.closest && target.closest('.leleo-left-welcome')
          
          if (hasClass || hasClassName || hasClosest) {
            this.processClickSequence('welcome')
            break
          }
          target = target.parentElement
        }
      }
    },

    // 转盘触发 - 移除重复逻辑，由App.vue统一处理
    handleTurntableTrigger(event) {
      // 不再处理转盘点击，统一由App.vue管理
      console.log('转盘点击事件已被App.vue统一处理')
    },

    // 组合键处理
    handleKeyDown(event) {
      if (event.key === 'Shift') {
        this.shiftPressed = true
      }
      
      if (this.shiftPressed) {
        this.handleClick(event)
      }
    },

    handleKeyUp(event) {
      if (event.key === 'Shift') {
        this.shiftPressed = false
      }
    },

    // 处理点击序列
    processClickSequence(triggerType) {
      const now = Date.now()
      const timeDiff = now - this.lastClickTime
      
      // 重置计时器
      if (timeDiff > 2000) {
        this.clickSequence = []
      }
      
      this.clickSequence.push(triggerType)
      this.lastClickTime = now
      
      console.log(`${triggerType === 'welcome' ? '欢迎标题' : '转盘'}点击次数:`, this.clickSequence.length)
      
      // 检查触发条件
      const params = this.config.trigger.params
      const requiredClicks = triggerType === 'welcome' ? params.clickCount : params.turntableClicks
      
      if (this.clickSequence.length >= requiredClicks) {
        this.showRandomPoem(triggerType)
        this.clickSequence = []
      }
    },

    // 显示随机诗歌（根据触发类型）
    showRandomPoem(triggerType) {
      if (!this.config.enabled) return
      
      // 根据触发类型选择诗歌池
      const poemPool = triggerType === 'welcome' ? this.welcomePoems : this.turntablePoems
      
      if (poemPool.length === 0) {
        console.warn('没有可用的诗歌')
        return
      }
      
      // 检查访问控制
      if (!this.checkAccess()) return
      
      // 随机选择诗歌
      const randomIndex = Math.floor(Math.random() * poemPool.length)
      this.currentPoem = poemPool[randomIndex]
      this.isVisible = true
      
      console.log(`显示${triggerType === 'welcome' ? '标题触发' : '转盘触发'}的诗歌:`, this.currentPoem.title)
      
      // 自动隐藏
      setTimeout(() => {
        this.hidePoem()
      }, this.config.display.duration)
    },

    // 检查访问权限
    checkAccess() {
      if (this.config.access.maxViews === 0) return true
      
      const now = Date.now()
      const today = new Date().toDateString()
      
      // 检查日期重置
      if (this.lastAccessDate !== today) {
        this.accessCount = 0
        this.lastAccessDate = today
      }
      
      // 检查冷却时间
      if (this.config.access.cooldown > 0) {
        if (now - this.lastAccessTime < this.config.access.cooldown) {
          console.log('冷却时间未到')
          return false
        }
      }
      
      // 检查访问次数
      if (this.accessCount >= this.config.access.maxViews) {
        console.log('今日访问次数已达上限')
        return false
      }
      
      this.accessCount++
      this.lastAccessTime = now
      
      if (this.config.access.rememberState) {
        this.saveAccessState()
      }
      
      return true
    },

    // 时间触发检查
    checkTimeTrigger() {
      // 只有在用户交互后才检查时间触发
      if (!this.hasUserInteracted) {
        if (this.debugMode) {
          console.log('用户未交互，跳过时间触发检查')
        }
        return
      }
      
      const now = new Date()
      const hour = now.getHours()
      const params = this.config.trigger.params
      
      if (params.timeRange && params.timeRange.length === 2) {
        const [startHour, endHour] = params.timeRange.map(t => parseInt(t.split(':')[0]))
        
        let shouldShow = false
        if (startHour > endHour) {
          shouldShow = hour >= startHour || hour < endHour
        } else {
          shouldShow = hour >= startHour && hour < endHour
        }
        
        if (shouldShow && !this.isVisible) {
          if (this.debugMode) {
            console.log(`时间触发条件满足 (${startHour}:00 - ${endHour}:00)，准备显示诗歌`)
          }
          this.showTimeBasedPoem()
        } else if (this.debugMode) {
          console.log(`时间触发条件不满足 (当前: ${hour}:00, 范围: ${startHour}:00 - ${endHour}:00)`)
        }
      }
    },

    // 时间基础诗歌显示
    showTimeBasedPoem() {
      const availablePoems = this.getAvailablePoems()
      if (availablePoems.length > 0) {
        this.currentPoem = availablePoems[Math.floor(Math.random() * availablePoems.length)]
        this.isVisible = true
      }
    },

    hidePoem() {
      this.isVisible = false
    },

    loadAccessState() {
      if (this.config.access.rememberState) {
        this.accessCount = parseInt(localStorage.getItem('poem_access_count') || 0)
        this.lastAccessTime = parseInt(localStorage.getItem('poem_last_access_time') || 0)
        this.lastAccessDate = localStorage.getItem('poem_last_access_date')
      }
    },

    saveAccessState() {
      localStorage.setItem('poem_access_count', this.accessCount.toString())
      localStorage.setItem('poem_last_access_time', this.lastAccessTime.toString())
      localStorage.setItem('poem_last_access_date', this.lastAccessDate || '')
    }
  }
}
</script>

<style scoped>
.hidden-poem-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  animation: fadeIn 0.3s ease-in-out;
}

.poem-container {
  max-width: 80vw;
  max-height: 80vh;
  overflow: auto;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  text-align: center;
  font-family: 'Noto Serif SC', serif;
  line-height: 1.8;
}

.poem-title {
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  font-weight: bold;
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.poem-content {
  font-size: 1.2rem;
  white-space: pre-wrap;
  word-wrap: break-word;
  margin-bottom: 1.5rem;
  font-family: 'Courier New', monospace;
  line-height: 1.6;
  color: #e0e0e0;
  background: rgba(255, 255, 255, 0.05);
  padding: 1rem;
  border-radius: 8px;
  border-left: 4px solid #4ecdc4;
}

.poem-mood {
  font-size: 1rem;
  font-style: italic;
  opacity: 0.8;
  color: #ffd700;
}

@keyframes fadeIn {
  from { opacity: 0; transform: scale(0.8); }
  to { opacity: 1; transform: scale(1); }
}

/* 滚动条样式 */
.poem-container::-webkit-scrollbar {
  width: 8px;
}

.poem-container::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
}

.poem-container::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 4px;
}

.poem-container::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.5);
}
</style>