import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  base: './',   // ← 讓所有資源用相對路徑，Capacitor iOS 必要
  plugins: [vue()],
})
