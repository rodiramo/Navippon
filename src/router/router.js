import Home from '../pages/Home.vue';
import About from '../pages/About.vue';
import Chat from '../pages/Chat.vue';
import Login from '../pages/Login.vue';
import Register from '../pages/Register.vue';
import Profile from '../pages/Profile.vue';
import UserProfile from '../pages/UserProfile.vue';
import PrivateChat from '../pages/PrivateChat.vue';
import { createRouter, createWebHashHistory } from 'vue-router';
import { subscribeToAuth } from '../services/auth';

// Definimos la lista de rutas.
const routes = [
    // Cada ruta para Vue Router debe ser un objeto que tenga, al menos, 2
    // propiedades: path y component.
    { path: '/',                    component: Home, },
    { path: '/quienes-somos',       component: About, },
    { path: '/chat',                component: Chat,        meta: {requiresAuth: true}, },
    { path: '/perfil',              component: Profile,     meta: {requiresAuth: true}, },
    { path: '/usuario/:id/',        component: UserProfile, meta: {requiresAuth: true}, },
    { path: '/usuario/:id/chat',    component: PrivateChat, meta: {requiresAuth: true}, },
    { path: '/iniciar-sesion',      component: Login, },
    { path: '/registro',            component: Register, },
];

// Creamos el router usando la función createRouter(), la cual recibe un
// objeto con 2 propiedades:
// - routes: la lista de rutas.
// - history: el tipo de navegación para la historia del browser.
const router = createRouter({
    routes,
    // Pedimos usar un sistema de hashes para la navegación.
    history: createWebHashHistory(),
});

// Protección de las rutas.
let user = {
    id: null,
    email: null,
}

subscribeToAuth(newUser => {
    user = {...newUser}
});

router.beforeEach((to, from) => {
    if(
        user.id === null &&
        to.meta?.requiresAuth
    ) {
        return {path: '/iniciar-sesion'}
    }
});

export default router;