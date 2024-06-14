import { useAuthStore } from '~/store/auth'; // import the auth store we just created

export default defineNuxtRouteMiddleware(async (to) => {
    const { authenticated } = storeToRefs(useAuthStore()); // make authenticated state reactive

    const token = useCookie('token'); // get token from cookies

    interface UserInfo {
      id: String,
      firstName: String,
      lastName: String,
      email: String,
      password: String,
      avatar: String,
      phoneNumber: BigInteger,
      city: String,
      role: String
    }
  
    if (token.value) {
      // check if value exists
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
  