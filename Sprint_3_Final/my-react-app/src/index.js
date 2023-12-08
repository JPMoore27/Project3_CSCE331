import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
//     <GoogleOAuthProvider clientId="597620423298-3dhrtvache13kfgm2sssfj5lva695uit.apps.googleusercontent.com">
// <App />
// </GoogleOAuthProvider>
<GoogleOAuthProvider clientId="364815935021-7idv75k5jm8fvk1e0gcml5rebqtluds3.apps.googleusercontent.com">
<App />
</GoogleOAuthProvider>
);
