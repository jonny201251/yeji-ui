import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/login', component: '@/pages/Login' },
    { path: '/back', component: '@/layouts/BackLayout' },
  ],
  fastRefresh: {},
  title: '全员业绩考核系统',
  proxy: { '/yeji': { target: 'http://localhost:8081', changeOrigin: true } },
  /*
  部署时打开注释
  base:页面路由前缀
  publicPath:css、js、图片等静态资源文件的前缀
 */
  // base: '/yeji/',
  // publicPath: '/yeji/',
});
