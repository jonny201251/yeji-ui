import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', component: '@/pages/index' },
    { path: '/test', component: '@/pages/test' },
    { path: '/index2', component: '@/pages/index2' },
    { path: '/back', component: '@/layouts/BackLayout' },
  ],
  fastRefresh: {},
  title: '业绩考核系统',
  proxy: { '/yeji': { target: 'http://localhost:8081', changeOrigin: true } },
});
