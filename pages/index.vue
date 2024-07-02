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
    <div class="bg-loginBackground bg-cover bg-center bg-no-repeat h-full rounded-md p-3" v-if="checkIfLoggedIn"> <!-- Container Wrapper -->
        <div class="flex">
            <div class="text-black bg-transparent bg-white border-2 border-black p-4 rounded-lg"> <!-- Hello Box -->
                <div class="flex items-center">
                    <svg class="h-5 mr-1" v-if="getTime === 'morning' || getTime === 'afternoon'" data-slot="icon" aria-hidden="true" fill="currentColor" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 1a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5A.75.75 0 0 1 8 1ZM10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0ZM12.95 4.11a.75.75 0 1 0-1.06-1.06l-1.062 1.06a.75.75 0 0 0 1.061 1.062l1.06-1.061ZM15 8a.75.75 0 0 1-.75.75h-1.5a.75.75 0 0 1 0-1.5h1.5A.75.75 0 0 1 15 8ZM11.89 12.95a.75.75 0 0 0 1.06-1.06l-1.06-1.062a.75.75 0 0 0-1.062 1.061l1.061 1.06ZM8 12a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5A.75.75 0 0 1 8 12ZM5.172 11.89a.75.75 0 0 0-1.061-1.062L3.05 11.89a.75.75 0 1 0 1.06 1.06l1.06-1.06ZM4 8a.75.75 0 0 1-.75.75h-1.5a.75.75 0 0 1 0-1.5h1.5A.75.75 0 0 1 4 8ZM4.11 5.172A.75.75 0 0 0 5.173 4.11L4.11 3.05a.75.75 0 1 0-1.06 1.06l1.06 1.06Z"></path>
                    </svg>
                    <svg class="h-5 mr-1" v-if="getTime === 'evening'" data-slot="icon" aria-hidden="true" fill="none" stroke-width="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" stroke-linecap="round" stroke-linejoin="round"></path>
                    </svg>
                    <h1>Good {{ getTime }},</h1> <!-- Implement get time function for this -->
                </div>
                <h1 class="text-center font-bold">{{ data.firstName  }}</h1>
            </div>
        </div>
    </div>

</template>