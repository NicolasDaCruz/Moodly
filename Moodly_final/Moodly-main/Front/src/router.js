// router.js
import { createRouter, createWebHistory } from 'vue-router';
import Admin from './pages/admin.vue'
import Home from './pages/home.vue';
import Login from './pages/login.vue';
import Register from './pages/Register.vue';


const router = createRouter({
    history: createWebHistory(),
            routes: [
            {
            path: '/',
            name: 'Home',
            component: Home
            },
            {
            path: '/login',
            name: 'Login',
            component: Login
            },
            {
            path: '/admin',
            name: 'Admin',
            component: Admin
            },
            {
            path: '/register',
            name: 'Register',
            component: Register
            },
        ]
});

export default router;
