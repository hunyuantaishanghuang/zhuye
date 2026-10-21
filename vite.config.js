import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// 分包策略函数
function manualChunks(id) {
  if (id.includes('vuetify')) {
    return 'vendor-vuetify';
  }
  if (id.includes('chart.js') || id.includes('vue-chartjs')) {
    return 'vendor-chart';
  }
  if (id.includes('node_modules')) {
    return 'vendor';
  }
}

// https://vite.dev/config/
export default defineConfig({
  // 相对 base：构建产物可部署在任意子路径（如 GitHub Pages 的 /zhuye/）
  base: './',
  plugins: [vue()],
  build: {
    // 启用代码压缩
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,  // 移除 console.log
        drop_debugger: true,
      },
    },
    // 启用 CSS 代码分割
    cssCodeSplit: true,
    // 资源内联阈值（小于 4KB 的资源内联）
    assetsInlineLimit: 4096,
    // 启用资源预加载
    rollupOptions: {
      output: {
        // 手动分包策略
        manualChunks,
        // 静态资源文件名哈希
        assetFileNames: 'assets/[name]-[hash][extname]',
        // JS 文件名哈希
        chunkFileNames: 'assets/[name]-[hash].js',
        // 入口文件命名
        entryFileNames: 'assets/[name]-[hash].js',
      },
    },
    // 开启 CSS tree shaking
    cssMinify: true,
    // 生成 sourcemap（生产环境关闭）
    sourcemap: false,
    // 压缩字体
    target: 'esnext',
    // 警告阈值
    chunkSizeWarningLimit: 600,
  },
  // 开发服务器优化
  server: {
    host: true,
    port: 5173,
  },
  // 静态资源处理
  assetsInclude: ['**/*.webp'],
  // 预览配置
  preview: {
    host: true,
  },
  // 优化依赖预构建
  optimizeDeps: {
    include: ['vue', 'vuetify', 'chart.js', 'vue-chartjs'],
  },
})
