import { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import '../../src/index.css';

function Login() {
  const [index, setIndex] = useState(0)
  const { isAuthenticated } = useAuth0()
  const rotatingWords = useState(['Hard', "Can't", 'Later', 'Ease'])

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(prevIndex => (
        prevIndex + 1 >= rotatingWords.length ? 0 : prevIndex + 1
      ));
    }, 3000);
    return () => clearInterval(interval)
  }, [rotatingWords.length])


  return (
    <div className="login-page">
      {!isAuthenticated && (
        <div className="rotating-words-container" id="rotating-words">
          <span id="goal-text">Goal</span>
          <span id="rotating-word">
            {rotatingWords[index]}
          </span>
        </div>
      )}
    </div>
  );
}

export default Login