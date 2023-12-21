// import React from 'react';
// import { useAuth0 } from '@auth0/auth0-react';
// import { Button } from 'react-bootstrap';

// function Login() {

//   const {
//     isAuthenticated,
//     loginWithRedirect,
//   } = useAuth0();

//   function handleLogin() {
//     loginWithRedirect();
//   }

//   return !isAuthenticated &&
//     <Button onClick={handleLogin} className='login-button'>Log in</Button>
//     ;
// }
// export default Login;


import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from 'react-bootstrap';
import '../../src/index.css';

const rotatingWords = ['Hard', "Can't", 'Later', 'Ease'];

function Login() {
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const [index, setIndex] = useState(0);

  function handleLogin() {
    loginWithRedirect();
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(prevIndex => (prevIndex + 1 >= rotatingWords.length ? 0 : prevIndex + 1));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

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

export default Login;



