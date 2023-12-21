// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import { Auth0Provider } from '@auth0/auth0-react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import App from './App.jsx';

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <Auth0Provider
//       domain={import.meta.env.VITE_AUTH_DOMAIN}
//       clientId={import.meta.env.VITE_AUTH_CLIENT_ID}
//       redirectUri={import.meta.env.VITE_AUTH_REDIRECT_URI}
//     >
//       <App />
//     </Auth0Provider>
//   </React.StrictMode>,
// )

import React from 'react';
import { createRoot } from 'react-dom/client'; 
import { Auth0Provider } from '@auth0/auth0-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App.jsx';
import { Provider } from 'react-redux'; 
import { store } from './app/store.jsx'; 

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <Auth0Provider
        domain={import.meta.env.VITE_AUTH_DOMAIN}
        clientId={import.meta.env.VITE_AUTH_CLIENT_ID}
        redirectUri={import.meta.env.VITE_AUTH_REDIRECT_URI}
      >
        <App />
      </Auth0Provider>
    </Provider>
  </React.StrictMode>
);

