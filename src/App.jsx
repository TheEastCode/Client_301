// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { withAuth0 } from '@auth0/auth0-react';
// import Header from './components/Header.jsx';
// import Dashboard from './pages/Dashboard';
// import AuthButtons from './Auth/AuthButtons.jsx';
// import { UserProvider } from './Auth/UserContext'; 


// function App({ auth0 }) {
//     return (
//         <UserProvider>
//             <>
//                 {/* AUTHBUTTON FOR AUTH0 LOGIN */}
//                 <AuthButtons />

//                 <Router>
//                     <div className='container'>
//                         <Header />
//                         <Routes>
//                             {auth0.isAuthenticated && <Route path='/' element={<Dashboard auth0={auth0} />} />}
//                             {/* Other routes */}
//                         </Routes>
//                     </div>
//                 </Router>
//                 <ToastContainer />
//             </>
//         </UserProvider>
//     );
// }

// export default withAuth0(App);

/* Temporary bypass so that I can see and edit the <dashboard></dashboard*/

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header.jsx';
import Dashboard from './pages/Dashboard'; // Import Dashboard directly without authentication
// Other necessary imports...

function App() {
    return (
        <Router>
            <div className='container'>
                <Header />
                <Routes>
                    <Route path='/' element={<Dashboard />} /> {/* Render Dashboard unconditionally */}
                    {/* Other routes */}
                </Routes>
            </div>
            <ToastContainer />
        </Router>
    );
}

export default App;

