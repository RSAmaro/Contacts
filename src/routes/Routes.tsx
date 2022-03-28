import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Contacts from "../pages/Contacts";
import EditContact from '../pages/EditContact';
import CreateContact from '../pages/CreateContact';
import DeleteContact from '../pages/DeleteContact';
import ContactsType from '../pages/ContactsType';
import CreateType from '../pages/CreateType';
import EditType from '../pages/EditType';
import Register from '../pages/Register';
import Login from '../pages/Login';


export const AuthenticatedRoutes = () => {
    return (
        <Router>
            <Route path="Contacts" element={<Contacts />} />
            <Route path="Contacts/Create" element={<CreateContact />} />
            <Route path="Contacts/Edit/:id" element={<EditContact />} />
            <Route path="Contacts/Delete/:id" element={<DeleteContact />} />
            <Route path="ContactsType" element={<ContactsType />} />
            <Route path="ContactsType/Create" element={<CreateType />} />
            <Route path="ContactsType/Edit/:id" element={<EditType />} />
            <Route path="Register" element={<Register />} />
            <Route path="Login" element={<Login />} />
        </Router>
    );
};

export const UnauthenticatedRoutes = () => {
    return (
        <Router>
            <Route path="Login" element={<Login />} />
        </Router>
    );
};