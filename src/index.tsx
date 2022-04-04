import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
import Navbar from './components/Navbar';
import '@fontsource/roboto/400.css';
import { AuthProvider } from './context/AuthContext';
import { AuthService } from './services/Auth';
import { AuthDTO } from './models/AuthDTO';

const service: AuthService = new AuthService();

service.GetUser().then(result => {
    var user: AuthDTO | null = null;

    if (result.success === true && result.obj != null && result.obj.token != null) {
        user = result.obj
        console.log(user);
    }

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider user={user}>
        <Navbar />
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,

  document.getElementById('root')
);
});


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
