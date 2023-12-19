import { useAuth0 } from '@auth0/auth0-react';

const useAuth = () => {
  const { loginWithRedirect, logout } = useAuth0();

  const login = () => {
    loginWithRedirect();
  };

  const logoutUser = () => {
    logout({ returnTo: window.location.origin });
  };

  return {
    login,
    logoutUser, 
  };
};

export default useAuth;
