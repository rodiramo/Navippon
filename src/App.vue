<script>
import { subscribeToAuth, logout } from './services/auth.js';

export default {
    name: 'App',
    data() {
        return {
            user: {
                id: null,
                email: null,
            }
        }
    },
    methods: {
        handleLogout() {
            logout()
                .then(user => {
                    // Redireccionamos al perfil.
                    this.$router.push({path: '/iniciar-sesion'});
                });;
        }
    },
    mounted() {
        subscribeToAuth(newUserData => {
            this.user = {
                ...newUserData,
            }
        });
    }
}
</script>

<template>
    <header class="flex gap-8 items-center p-4 bg-slate-100">
        <p class="text-xl">DV Chat</p>

        <nav>
            <ul class="flex gap-4">
                <li>
                    <router-link to="/">Home</router-link>
                </li>
                <li>
                    <router-link to="/quienes-somos">Quiénes Somos</router-link>
                </li>

                <template v-if="user.id === null">
                    <li>
                        <router-link to="/iniciar-sesion">Iniciar Sesión</router-link>
                    </li>
                    <li>
                        <router-link to="/registro">Registro</router-link>
                    </li>
                </template>
                <template v-else>
                    <li>
                        <router-link to="/chat">Chat</router-link>
                    </li>
                    <li>
                        <router-link to="/perfil">Mi Perfil</router-link>
                    </li>
                    <li>
                        <form 
                            action=""
                            @submit.prevent="handleLogout"
                        >
                            <button type="submit"><b>{{ user.email }}</b> (Cerrar Sesión)</button>
                        </form>
                    </li>
                </template>


            </ul>
        </nav>
    </header>
    <main class="container h-full p-4 m-auto">
        <!-- router-view es donde se van a cargar los componentes que corresponden a la ruta indicada en el router. -->
        <router-view></router-view>
    </main>
    <!-- Si en una clase de Tailwind ponemos en el valor corchetes, se nos permite crear una clase con un valor arbitrario.
    Esto es útil en casos donde necesitamos usar un valor una única vez. -->
    <footer class="flex justify-center items-center h-[100px] bg-slate-700 text-white">
        <p>Da Vinci &copy; 2023</p>
    </footer>
</template>