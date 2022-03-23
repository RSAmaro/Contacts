import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Contacts from './pages/Contacts';
import Navbar from './components/Navbar';
import EditContact from './pages/EditContact';

ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      <Navbar/>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="Contacts" element={<Contacts />} />
        <Route path="Contacts/Edit/:id" element={<EditContact />} />
      </Routes>
    </React.StrictMode>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
