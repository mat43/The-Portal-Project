// store/auth.ts

import { defineStore } from 'pinia';

interface UserPayloadInterface {
  username: string;
  password: string;
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    authenticated: false,
    loading: false,
  }),
  actions: {
    async getUserInfo(token: any) {
        const { data, pending }: any = await useFetch('http://localhost:58239/auth/me', {
        method: 'get',
        headers: { 'Content-Type': 'application/json', 'Authorization': `${token}` },
      });
      this.loading = pending;

      if (data) {
        return data;
      } else {
        return null;
      }
    },
    async authenticateUser({ username, password }: UserPayloadInterface) {
      // useFetch from nuxt 3
      const { data, pending }: any = await useFetch('http://localhost:58239/auth/login', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: {
          username,
          password,
        },
      });
      this.loading = pending;

      if (data.value) {
        const token = useCookie('token'); // useCookie new hook in nuxt 3
        token.value = data?.value?.id; // set token to cookie
        this.authenticated = true; // set authenticated  state value to true
        return true;
      } else {
        return false;
      }
    },
    async logUserOut() {
      const token = useCookie('token'); // useCookie new hook in nuxt 3
      this.authenticated = false; // set authenticated  state value to false
      const { data, pending }: any = await useFetch('http://localhost:58239/auth/logout', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: {
          'id': token.value
        },
      });
      token.value = null; // clear the token cookie
    },
  },
});