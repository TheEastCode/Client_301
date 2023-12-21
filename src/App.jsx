import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { withAuth0 } from '@auth0/auth0-react';

import NewHeader from './components/NewHeader'
import NewGoalForm from './components/NewGoalForm'
import Dashboard from './pages/Dashboard'
import Login from './Auth/Login.jsx'
// import Snake from './pages/Snake'





function App({ auth0 }) {
  const [index, setIndex] = useState(0);
  const [rotatingWords, setRotatingWords] = useState(['Hard', "Can't", 'Later', 'Ease']);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(prevIndex => (prevIndex + 1 >= rotatingWords.length ? 0 : prevIndex + 1));
    }, 1000);

    return () => clearInterval(interval);
  }, [rotatingWords]);

  return (
    <>
      <Login index={index} rotatingWords={rotatingWords} />
      <Router>
        <NewHeader />
        <div className='container'>
          <Routes>
            {auth0.isAuthenticated && (
              <>
                <Route path='/' element={<Dashboard auth0={auth0} />} />
                <Route path='/goalForm' element={<NewGoalForm auth0={auth0} />} />
                {/* <Route path='/snakeGame' element={<Snake />} /> */}
                {/* <Route path='/about' element={<About />} /> */}
              </>
            )}
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default withAuth0(App);
