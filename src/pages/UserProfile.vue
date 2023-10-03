<script>
import BaseLoader from '../components/BaseLoader.vue';
import { getUserProfileById } from '../services/user';

export default {
    name: 'UserProfile',
    components: { BaseLoader },
    data() {
        return {
            loadingProfile: true,
            userProfile: {
                id: null,
                email: null,
            }
        };
    },
    async mounted() {
        this.loadingProfile = true;
        this.userProfile = await getUserProfileById(this.$route.params.id);
        this.loadingProfile = false;
    },
}
</script>

<template>
    <template v-if="!loadingProfile">
        <h1 class="mb-4 text-3xl">Perfil de {{ userProfile.email }}</h1>

        <!-- TODO: Agregar la data del usuario cuando la tengamos en Firebase. -->

        <router-link
            class="text-blue-600 underline"
            :to="`/usuario/${userProfile.id}/chat`"
        >Iniciar conversación privada</router-link>
    </template>
    <template v-else>
        <BaseLoader />
    </template>
</template>