<script>
import BaseButton from '../components/BaseButton.vue';
import BaseLabel from '../components/BaseLabel.vue';
import BaseLoader from '../components/BaseLoader.vue';
import { getUserProfileById } from '../services/user';
import { sendPrivateChatMessage } from '../services/private-chat';
import { subscribeToAuth } from '../services/auth';

export default {
    name: 'PrivateChat',
    components: { BaseLoader, BaseLabel, BaseButton },
    data() {
        return {
            loadingProfile: true,
            userProfile: {
                id: null,
                email: null,
            },
            newMessage: {
                message: '',
            },
            userAuth: {
                id: null,
                email: null,
            },
            authUnsubscribe: () => {},
        };
    },
    methods: {
        handleMessage() {
            sendPrivateChatMessage({
                sender: this.userAuth.id,
                receiver: this.userProfile.id,
                message: this.newMessage.message,
            });
            this.newMessage.message = '';
        }
    },
    async mounted() {
        this.loadingProfile = true;
        this.userProfile = await getUserProfileById(this.$route.params.id);
        this.authUnsubscribe = subscribeToAuth(user => this.userAuth = user);
        this.loadingProfile = false;
    },
    unmounted() {
        this.authUnsubscribe();
    }
}
</script>

<template>
    <template v-if="!loadingProfile">
        <h1 class="mb-4 text-3xl">Chat Privado con {{ userProfile.email }}</h1>

        <section
            class="min-h-[300px] p-4 border mb-4"
        >
            <h2 class="sr-only">Mensajes</h2>
            <!-- TODO: Lista de mensajes -->
        </section>

        <section>
            <h2 class="sr-only">Enviar un mensaje</h2>
            <form 
                action="#"
                class="flex gap-2"
                @submit.prevent="handleMessage"
            >
                <BaseLabel
                    for="message"
                    class="sr-only"
                >Mensaje</BaseLabel>
                <textarea 
                    class="w-11/12 py-1.5 px-2 border border-gray-400 rounded"
                    id="message"
                    v-model="newMessage.message"
                ></textarea>
                <BaseButton class="w-1/12">Enviar</BaseButton>
            </form>
        </section>
    </template>
    <template v-else>
        <BaseLoader />
    </template>
</template>