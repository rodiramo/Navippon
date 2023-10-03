<script>
import { register } from '../services/auth.js';
import BaseButton from '../components/BaseButton.vue';
import BaseLabel from '../components/BaseLabel.vue';
import BaseInput from '../components/BaseInput.vue';

export default {
    name: 'Register',
    components: { BaseButton, BaseLabel, BaseInput },
    data() {
        return {
            form: {
                email: '',
                password: '',
            },
        }
    },
    methods: {
        handleSubmit() {
            register({
                ...this.form,
            })
                .then(user => {
                    // Redireccionamos al perfil.
                    this.$router.push({path: '/perfil'});
                });
        }
    }
}
</script>

<template>
    <h1 class="mb-4 text-3xl">Registro</h1>

    <form 
        action="#"
        @submit.prevent="handleSubmit"
    >
        <div class="mb-3">
            <BaseLabel for="email">Email</BaseLabel>
            <BaseInput
                type="email"
                id="email"
                v-model="form.email"
            />
        </div>
        <div class="mb-3">
            <BaseLabel for="password">Contraseña</BaseLabel>
            <BaseInput 
                type="password" 
                id="password"
                v-model="form.password"
            />
        </div>
        <BaseButton>Crear Cuenta</BaseButton>
        <!-- <button
            type="submit"
            class="w-full p-2 rounded bg-blue-600 text-white"
        >Crear Cuenta</button> -->
    </form>
</template>