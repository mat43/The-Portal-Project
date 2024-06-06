import { useAuthStore } from '~/store/auth'; // import the auth store we just created

export default defineNuxtRouteMiddleware(async (to) => {
    const { authenticated } = storeToRefs(useAuthStore()); // make authenticated state reactive
    const { getUserInfo } = useAuthStore(); // check token and store info for front end
    const token = useCookie('token'); // get token from cookies
    const nuxtApp = useNuxtApp();
  
    if (token.value) {
      // check if value exists
      if (to?.name !== 'login') {
        const data = await getUserInfo(token.value);
        if (data.value != null) {
          nuxtApp.provide('userInfo', data);
        }
      }
      authenticated.value = true; // update the state to authenticated
      } else {
        token.value = null; // clear the token cookie
        authenticated.value = false;
      }

    // if token exists and url is /login redirect to homepage
    if (token.value && to?.name === 'login') {
      abortNavigation();
      return navigateTo('/');
    }
  
    // if token doesn't exist redirect to log in
    if (!token.value && to?.name !== 'login') {
      abortNavigation();
      return navigateTo('/login');
    }
  });
  