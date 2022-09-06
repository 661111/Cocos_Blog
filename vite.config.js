import { fileURLToPath, URL } from 'node:url'
import themePreprocessorPlugin from '@zougt/vite-plugin-theme-preprocessor';
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import {AntDesignVueResolver} from "unplugin-vue-components/resolvers";
import Components from "unplugin-vue-components/vite";
import * as path from "path";

// const { getThemeVariables } = require('ant-design-vue/dist/theme');
// https://vitejs.dev/config/
export default defineConfig ({
  publicDir: 'public',
  build: {
    outDir: 'dist',
    assetsDir: 'static',
  },
  plugins: [vue(),
    themePreprocessorPlugin({
      less: {
        multipleScopeVars:[
            {
          scopeName: "defaultTheme",
          path: path.resolve("src/assets/global.less")
        },
          {
            scopeName: "darkTheme",
            path: path.resolve("src/assets/darkTheme.less")
          }
        ]
      }

  }),
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
            'link-color': '#1890ff',
            // 'bgColor': '#FFFFFF',
            // 'boxShadow': '0 0 0 1px rgb(188 195 206 / 10%),0 2px 10px rgb(48 55 66 / 6%)',
            // dark: false,
          },
        javascriptEnabled: true,
      }
    },
  },
});

