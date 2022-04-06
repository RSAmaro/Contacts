import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Contacts from "./pages/Contacts";
import EditContact from './pages/EditContact';
import CreateContact from './pages/CreateContact';
import DeleteContact from './pages/DeleteContact';
import ContactsType from './pages/ContactsType';
import CreateType from './pages/CreateType';
import EditType from './pages/EditType';
import Register from './pages/Register';
import Login from './pages/Login';
import { useAuth } from './context/AuthContext';
import Home from './pages/Home';
import ConfirmEmail from './pages/ConfirmEmail';

function App() {

  const { isUserLoggedIn } = useAuth();
  
  let routes = (
    <Routes>
      <Route path="Contacts" element={isUserLoggedIn ? <Contacts /> : <Navigate replace to="/Login" />} />
      <Route path="Contacts/Create" element={isUserLoggedIn ? <CreateContact /> : <Navigate replace to="/Login" />} />
      <Route path="Contacts/Edit/:id" element={isUserLoggedIn ? <EditContact /> : <Navigate replace to="/Login" />} />
      <Route path="Contacts/Delete/:id" element={isUserLoggedIn ? <DeleteContact /> : <Navigate replace to="/Login" />} />
      <Route path="ContactsType" element={isUserLoggedIn ? <ContactsType /> : <Navigate replace to="/Login" />} />
      <Route path="ContactsType/Create" element={isUserLoggedIn ? <CreateType /> : <Navigate replace to="/Login" />} />
      <Route path="ContactsType/Edit/:id" element={isUserLoggedIn ? <EditType /> : <Navigate replace to="/Login" />} />
      <Route path="Register" element={!isUserLoggedIn ? <Register /> : <Navigate replace to="/" />} />
      <Route path="Login" element={!isUserLoggedIn ? <Login /> : <Navigate replace to="/" /> }/>
      <Route path="ConfirmEmail" element={<ConfirmEmail/>} />
      <Route path="/" element={<Home/>} />
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
