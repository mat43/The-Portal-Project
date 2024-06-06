<script setup lang="ts">
const nuxtApp = useNuxtApp();
import { useAuthStore } from '~/store/auth';
const { logUserOut } = useAuthStore();

const logout = async () => {
  const router = useRouter();
  await logUserOut();
  router.push('/login');
};


</script>

<template>
    <h1>{{  nuxtApp.$userInfo }}</h1>
   <button @click="logout">Logout</button>
</template>