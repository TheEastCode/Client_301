import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from 'react-bootstrap';
import '../../src/index.css';

function Login() {
  const [index, setIndex] = useState(0)
  const [rotatingWords, setRotatingWords] = useState([])
  const { isAuthenticated, loginWithRedirect } = useAuth0()

  setRotatingWords(['Hard', "Can't", 'Later', 'Ease'])

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(prevIndex => (
        prevIndex + 1 >= rotatingWords.length ? 0 : prevIndex + 1
      ));
    }, 1000);
    return () => clearInterval(interval)
  }, [rotatingWords])

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