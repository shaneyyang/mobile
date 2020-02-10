import Vue from 'vue'
import VueRouter from 'vue-router'
const Layout = () => import('../views/layout/lindex.vue') // 布局组件
const Home = () => import('../views/home/hindex.vue') // 主页组件
const Question = () => import('../views/question/qindex.vue') // 问答组件
const Video = () => import('../views/video/vindex.vue') // 视频组件
const User = () => import('../views/user/uindex.vue') // 个人中心
const Profile = () => import('../views/user/profile.vue') // 编辑资料
const Chat = () => import('../views/user/chat.vue') // 小智同学
const Login = () => import('../views/user/login.vue') // 登录组件
const Article = () => import('../views/article/aindex.vue') // 文章详情
const Search = () => import('../views/search/sindex.vue') // 搜索中心
const SearchResult = () => import('../views/search/result.vue') // 搜索结果

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Layout, // 一级路由
    redirect: '/home', // 重定向
    children: [
      {
        path: '/home',
        component: Home // 二级路由 首页
      },
      {
        path: '/question',
        component: Question // 二级路由 问答组件
      },
      {
        path: '/video',
        component: Video // 二级路由 视频组件
      }, {
        path: '/user',
        component: User // 二级路由 个人中心
      }
    ]
  },
  {
    path: '/user/profile',
    component: Profile // 编辑资料
  },
  {
    path: '/user/chat',
    component: Chat // 小智同学
  },
  {
    path: '/login',
    component: Login // 登录组件
  },
  {
    path: '/article',
    component: Article // 文章详情
  },
  {
    path: '/search',
    component: Search // 搜索中心
  },
  {
    path: '/search/result',
    component: SearchResult // 搜索结果
  }

]

const router = new VueRouter({
  routes
})

export default router
