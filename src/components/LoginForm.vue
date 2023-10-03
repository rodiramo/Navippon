<script>
import BaseButton from '../components/BaseButton.vue';
import BaseLabel from '../components/BaseLabel.vue';
import BaseInput from '../components/BaseInput.vue';
import { login } from '../services/auth.js';

export default {
    name: 'LoginForm',
    components: { BaseButton, BaseLabel, BaseInput },
    data() {
        return {
            processingLogin: false,
            form: {
                email: '',
                password: '',
            },
        }
    },
    methods: {
        handleLogin() {
            if(this.processingLogin) return;

            console.log("Ejecutando el login con estos datos: ", this.form);

            this.processingLogin = true;
            
            login({
                ...this.form,
                // email: this.form.email,
                // password: this.form.password,
            })
                .then(user => {
                    this.processingLogin = false;
                    // Redireccionamos al perfil.
                    this.$router.push({path: '/perfil'});
                });
        }
    }
}
</script>

<template>
    <form 
        action="#"
        @submit.prevent="handleLogin"
    >
        <div class="mb-3">
            <BaseLabel for="email">Email</BaseLabel>
            <BaseInput
                type="email"
                id="email"
                :disabled="processingLogin"
                v-model="form.email"
            />
        </div>
        <div class="mb-3">
            <BaseLabel for="password">Contraseña</BaseLabel>
            <BaseInput
                type="password" 
                id="password"
                :disabled="processingLogin"
                v-model="form.password"
            />
        </div>
        <BaseButton
            :loading="processingLogin"
        >Ingresar</BaseButton>
    </form>
</template>