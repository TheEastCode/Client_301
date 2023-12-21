import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from 'react-bootstrap';
import '../../src/index.css';

const rotatingWords = ['Hard', "Can't", 'Later', 'Ease'];

function Login({index}) {

  
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  
  function handleLogin() {
    loginWithRedirect();
  }

  return (
    <div className="login-page">
      {!isAuthenticated && (
        <div className="rotating-words-container" id="rotating-words">
          <span id="goal-text">Goal</span>
          <span id="rotating-word">
            {rotatingWords[index]}
          </span>
          <Button onClick={handleLogin} className="login-button">
            Log in
          </Button>
        </div>
      )}
    </div>
  );
}

export default Login