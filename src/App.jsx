import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Comments from './pages/Comments';
import Login from './pages/Login';
import Register from './pages/Register';
import { useAuth0 } from '@auth0/auth0-react'; 

function App() {
  const { isAuthenticated } = useAuth0(); 
  return (
    <>
      <Router>
        <div className='container'>
          <Header />
          <Routes>
            {/* Use isAuthenticated to protect routes */}
            <Route path='/' element={isAuthenticated ? <Dashboard /> : <Login />} />
            <Route path='/dashboard' element={<Comments />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
