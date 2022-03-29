import { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import { AuthContext } from './context/AuthContext';
import Contacts from "./pages/Contacts";
import EditContact from './pages/EditContact';
import CreateContact from './pages/CreateContact';
import DeleteContact from './pages/DeleteContact';
import ContactsType from './pages/ContactsType';
import CreateType from './pages/CreateType';
import EditType from './pages/EditType';
import Register from './pages/Register';
import Login from './pages/Login';

function App() {
  const value = useContext(AuthContext);
  const auth = value?.auth;

  console.log(auth?.getAuth)

  let routes = (
    <Routes>
      <Route path="Contacts" element={auth?.getAuth ? <Contacts /> : <Navigate replace to="/Login" />} />
      <Route path="Contacts/Create" element={auth?.getAuth ? <CreateContact /> : <Navigate replace to="/Login" />} />
      <Route path="Contacts/Edit/:id" element={auth?.getAuth ? <EditContact /> : <Navigate replace to="/Login" />} />
      <Route path="Contacts/Delete/:id" element={auth?.getAuth ? <DeleteContact /> : <Navigate replace to="/Login" />} />
      <Route path="ContactsType" element={auth?.getAuth ? <ContactsType /> : <Navigate replace to="/Login" />} />
      <Route path="ContactsType/Create" element={auth?.getAuth ? <CreateType /> : <Navigate replace to="/Login" />} />
      <Route path="ContactsType/Edit/:id" element={auth?.getAuth ? <EditType /> : <Navigate replace to="/Login" />} />
      <Route path="Register" element={<Register />} />
      <Route path="Login" element={<Login />} />
    </Routes>
  );

  return <div className="App">{routes}</div>;
}

export default App;

// <div className="App">
//       <Container className="App" maxWidth="xs">
//         <Paper sx={{ marginTop: 10, padding: 4 }}>
//           <Stack spacing={4}>
//             <Typography variant="h5" color="initial">Lista de Contatos</Typography>
//             <Typography color="initial">Escolha das opções acima.</Typography>
//           </Stack>
//         </Paper>
//       </Container>
//     </div>
