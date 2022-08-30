import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import {AntDesignVueResolver} from "unplugin-vue-components/resolvers";
import Components from "unplugin-vue-components/vite";

// https://vitejs.dev/config/
export default defineConfig ({
  plugins: [vue(),
    Components({
      resolvers: [
        AntDesignVueResolver({
          importStyle: false, // 一定要开启这个配置项
        }),
      ],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      less: {
          modifyVars: {
            'link-color': '#d3adf7',
            'bgColor': '#FFFFFF',
            'boxShadow': '0 0 0 1px rgb(188 195 206 / 10%),0 2px 10px rgb(48 55 66 / 6%)',
          },
        javascriptEnabled: true,
      }
    },
  },
});
