import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css:[

  ],
  // proxy: {
  //   blogconfig: {
  //     // 请填写你的后台接口地址
  //     api: "http://106.13.205.87:2333/api",
  //     pathRewrite: {
  //       "^/api/": "",
  //     },
  //   },
  // }
})
