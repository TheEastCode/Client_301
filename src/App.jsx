// // import { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// import { ToastContainer } from 'react-toastify'
// import 'react-toastify/dist/ReactToastify.css'
// import { withAuth0 } from '@auth0/auth0-react';

// // import Header from './components/Header'
// import Dashboard from './pages/Dashboard'
// // import Comments from './pages/Comments'
// // import Login from './pages/Login'
// // import Register from './pages/Register'
// import AuthButtons from './Auth/AuthButtons.jsx';

// function App({ auth0 }) {
//   // useEffect(() => {
//   //   if(auth0.isAuthenticated) {
//   //     getDogs();
//   //   }
//   // }, [auth0.isAuthenticated]);

//   return (
//     <>
//       {/* AUTHBUTTON FOR AUTH0 LOGIN */}
//       <AuthButtons />

//       <Router>
//         <div className='container'>
//           {/* <Header /> */}
//           <Routes>
//             {auth0.isAuthenticated && <Route path='/' element={<Dashboard auth0={auth0} />} />}
//             {/* {auth0.isAuthenticated && <Route path='/comments' element={<Comments />} />}
//             {auth0.isAuthenticated && <Route path='/login' element={<Login />} />}
//             {auth0.isAuthenticated && <Route path='/register' element={<Register />} />} */}
//           </Routes>
//         </div>
//       </Router>
//       <ToastContainer />
//     </>
//   );
// }

// export default withAuth0(App);

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth0 } from '@auth0/auth0-react';
import Dashboard from './pages/Dashboard';
import AuthButtons from './Auth/AuthButtons.jsx';
import Header from './components/Header.jsx';
import Login from './Auth/Login.jsx'; // Import the Login component

function App() {
  const { isAuthenticated } = useAuth0();

  return (
    <Router>
      <>
        <Header />
        <AuthButtons />
        <div className='container'>
          <Routes>
            {/* Show the Dashboard if authenticated, otherwise show the Login component */}
            <Route
              path='/'
              element={isAuthenticated ? <Dashboard /> : <Login />}
            />
          </Routes>
        </div>
        <ToastContainer />
      </>
    </Router>
  );
}

export default App;
