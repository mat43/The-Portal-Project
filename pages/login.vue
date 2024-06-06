<template>
  <div class="bg-loginBackground bg-center h-full bg-no-repeat bg-cover w-full font-main text-white">
    <div class="w-[350px] border-2 border-white border-opacity-20 backdrop-blur-lg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-lg p-8 rounded-3xl opacity-95">
      <h2 class="flex justify-center mb-5 font-bold text-2xl">Login</h2>
      <form @submit.prevent="login()" class="flex flex-col p-4">
        <div class="border-b-2 border-white mb-6 relative">
          <i class='bx bx-user absolute right-2 translate-y-4 text-xl'></i>
          <input v-model="user.username" class="w-full h-12 bg-transparent outline-none border-none text-base peer pr-8" type="text" name="uname" required>
          <label class="absolute top-1/2 left-0 -translate-y-1/2 text-base pointer-events-none peer-focus:top-0 peer-valid:top-0 peer-focus:duration-300 peer-invalid:duration-300">Username</label>
        </div>

        <div class="border-b-2 border-white relative">
          <i class='bx bxs-lock-alt absolute right-2 translate-y-4 text-xl'></i>
          <input v-model="user.password" class="w-full h-12 bg-transparent outline-none border-none text-base peer pr-8" type="password" name="psw" required>
          <label class="absolute top-1/2 left-0 -translate-y-1/2 text-base pointer-events-none peer-focus:top-0 peer-valid:top-0 peer-focus:duration-300 peer-invalid:duration-300">Password</label>
        </div>

        <div v-if="failedPassword" class="flex text-red-400 text-sm mt-2 items-center justify-center">
          <i class='bx bxs-error align-middle pr-2 text-xl' ></i>
          <p>The username or password you entered is incorrect.</p>
        </div>
        <button class="px-3 py-2 mt-6 text-white bg-green-400 rounded-md font-bold hover:bg-green-500 transition ease-in duration-300">Login</button>
    </form>
    </div>
  </div>
</template>

<script setup lang="ts">

import { storeToRefs } from 'pinia'; // import storeToRefs helper hook from pinia
import { useAuthStore } from '~/store/auth'; // import the auth store we just created

const { authenticateUser } = useAuthStore(); // use authenticateUser action from  auth store

const { authenticated } = storeToRefs(useAuthStore()); // make authenticated state reactive with storeToRefs

var failedPassword = false;

const user = ref({
    username: '',
    password: '',
})

const router = useRouter();

const login = async () => {
  await authenticateUser(user.value).then((result) => {
    if (!result) {
      failedPassword = true;
    }
  }); // call authenticateUser and pass the user object
  user.value.password = '';
  // redirect to homepage if user is authenticated
  if (authenticated) {
    router.push('/');
  }
};
</script>