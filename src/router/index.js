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
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router