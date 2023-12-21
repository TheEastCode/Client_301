// import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { withAuth0 } from '@auth0/auth0-react';

import NewHeader from './components/NewHeader'
import NewGoalForm from './components/NewGoalForm'
import Dashboard from './pages/Dashboard'
// import Comments from './pages/Comments'
// import Login from './pages/Login'
// import Register from './pages/Register'

function App({ auth0 }) {
  return (
    <>
      <Router>
        <NewHeader />
        <div className='container'>
          <Routes>
            <Route path='/' element={<Dashboard auth0={auth0} />} />
            {auth0.isAuthenticated && <Route path='/goalForm' element={<NewGoalForm />} />}
            {/* {auth0.isAuthenticated && <Route path='/game' element={<SnakeGame />} />} */}
            {/* {auth0.isAuthenticated && <Route path='/publicGoals' element={<PublicGoals />} /> } */}
            {/* {auth0.isAuthenticated && <Route path='/about' element={<About />} /> } */}
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default withAuth0(App);