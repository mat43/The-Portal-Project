<script setup lang="ts">
const nuxtApp = useNuxtApp();
import { useAuthStore } from '~/store/auth';
const { logUserOut } = useAuthStore();
const router = useRouter();
const token = useCookie('token'); // get token from cookies
const { getUserInfo } = useAuthStore(); // check token and store info for front end
const data = await getUserInfo(token.value);

const logout = async () => {
  await logUserOut();
  router.push('/login');
};


const checkIfLoggedIn = computed(() => {
    if (data.value == null) {
        logout();
        return false;
    } else {
        return true;
    }
});

const getTime = computed(() => {
    var now = new Date().getHours();
    if (now < 12) {
        return "morning";
    } else if (now >= 12 && now < 18) {
        return "afternoon";
    } else {
        return "evening";
    }
})

const { authenticated } = storeToRefs(useAuthStore()); // make authenticated state reactive

</script>
<template> 
    <div class="bg-loginBackground bg-cover bg-center bg-no-repeat h-full p-5 rounded-md" v-if="checkIfLoggedIn"> <!-- Container Wrapper -->
        <div class="flex">
            <div class="text-black bg-transparent bg-white border-2 border-black p-4"> <!-- Hello Box -->
                <h1>Good {{ getTime }} {{ data.firstName  }}</h1> <!-- Implement get time function for this -->
            </div>
        </div>
        <button @click="logout">Logout</button>
    </div>

</template>