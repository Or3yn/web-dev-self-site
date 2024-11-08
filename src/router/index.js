import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('../views/HomeView.vue')
    },
    {
        path: '/about',
        name: 'About',
        component: () => import('../views/AboutView.vue')
    },
    {
        path: '/album',
        name: 'Album',
        component: () => import('../views/AlbumView.vue')
    },
    {
        path: '/interests',
        name: 'Interests',
        component: () => import('../views/InterestsView.vue')
    },
    {
        path: '/tests',
        name: 'Tests',
        component: () => import('../views/TestView.vue')
    },
    {
        path: '/university',
        name: 'University',
        component: () => import('../views/UniversityView.vue')
    },
    {
        path: '/watch-story',
        name: 'WatchStory',
        component: () => import('../views/WatchStory.vue')
    }

]

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        // Всегда прокручиваем наверх при переходе на другой маршрут
        return { top: 0 }
    }
})

export default router
