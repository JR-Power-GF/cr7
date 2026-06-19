import { createRouter, createWebHistory } from 'vue-router'
import Entry from '../views/Entry.vue'

// 路由表
// - /        风险评价入口页(来自 feature-login)
// - /survey  风险调研页(来自 feature-home,合并后补上)
const routes = [
  { path: '/', name: 'entry', component: Entry },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
