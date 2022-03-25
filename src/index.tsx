import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter,  Routes,  Route} from "react-router-dom";
import Contacts from './pages/Contacts';
import Navbar from './components/Navbar';
import EditContact from './pages/EditContact';
import '@fontsource/roboto/400.css';
import CreateContact from './pages/CreateContact';
import DeleteContact from './pages/DeleteContact';
import ContactsType from './pages/ContactsType';
import CreateType from './pages/CreateType';
import EditType from './pages/EditType';
import Register from './pages/Register';


ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      <Navbar />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="Contacts" element={<Contacts />} />
        <Route path="Contacts/Create" element={<CreateContact />} />
        <Route path="Contacts/Edit/:id" element={<EditContact />} />
        <Route path="Contacts/Delete/:id" element={<DeleteContact />} />
        <Route path="ContactsType" element={<ContactsType />} />
        <Route path="ContactsType/Create" element={<CreateType />} />
        <Route path="ContactsType/Edit/:id" element={<EditType />} />
        <Route path="Register" element={<Register />} />
      </Routes>
    </React.StrictMode>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
