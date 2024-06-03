<script setup lang="ts">
</script>

<template>
  <div class="bg-loginBackground h-full bg-repeat w-full font-main text-black">
    <div class="w-[350px] bg-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-lg p-8 rounded-3xl opacity-75">
      <h2 class="flex justify-center mb-5 font-bold text-2xl">Login</h2>
      <form class="flex flex-col p-4">
        <div class="border-b-2 border-black mb-6 relative">
          <i class='bx bx-user absolute right-2 translate-y-4 text-xl'></i>
          <input class="w-full h-12 bg-transparent outline-none border-none text-base peer pr-8" type="text" name="uname" required>
          <label class="absolute top-1/2 left-0 -translate-y-1/2 text-base pointer-events-none peer-focus:top-0 peer-valid:top-0 peer-focus:duration-300 peer-invalid:duration-300">Username</label>
        </div>

        <div class="border-b-2 border-black relative">
          <i class='bx bxs-lock-alt absolute right-2 translate-y-4 text-xl'></i>
          <input class="w-full h-12 bg-transparent outline-none border-none text-base peer pr-8" type="password" name="psw" required>
          <label class="absolute top-1/2 left-0 -translate-y-1/2 text-base pointer-events-none peer-focus:top-0 peer-valid:top-0 peer-focus:duration-300 peer-invalid:duration-300">Password</label>
        </div>
        <button class="px-3 py-2 mt-6 text-white bg-green-400 rounded-md font-bold hover:bg-green-500 transition ease-in duration-300" type="submit">Login</button>
      </form>
    </div>
  </div>
</template>