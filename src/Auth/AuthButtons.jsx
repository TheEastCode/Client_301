import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Login from "./Login";
import Logout from "./Logout";

function AuthButtons() {
  const { isAuthenticated } = useAuth0();
  const { user } = useAuth0();
  const getLocalStore = () => { return (localStorage.getItem('user')) }
  let storedUser

  if (isAuthenticated) {
    // LOCAL STORAGE
    if (!getLocalStore()) {
      localStorage.setItem('user', JSON.stringify(user))
      storedUser = JSON.parse(getLocalStore())
    }
    return <Logout user={storedUser} />
  } else {
    return <Login />
  }
}

export default AuthButtons;
