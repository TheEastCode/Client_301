import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { withAuth0 } from '@auth0/auth0-react';

import About from './pages/About';
import Comments from './pages/Comments'
import NewHeader from './components/NewHeader';
import NewGoalForm from './components/Goals/NewGoalForm';
import Dashboard from './pages/Dashboard';
import Welcome from './components/Welcome';
import ImageGenerator from './components/ImageGenerator';
import Snake from './pages/Snake';

function App({ auth0 }) {

  return (
    <>
      <Welcome />
      <Router>
        <NewHeader auth0={auth0} />
        <div className='container'>
          <Routes>
            <Route path='/' element={<Dashboard auth0={auth0} />} />
            <Route path='comments' element={<Comments auth0={auth0} />} />
            {auth0.isAuthenticated && (
              <>
                <Route path='/goalForm' element={<NewGoalForm auth0={auth0} />} />
                <Route path='/generate-image' element={<ImageGenerator />} />
                <Route path='/snake' element={<Snake />} />
                <Route path='/about' element={<About />} />
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