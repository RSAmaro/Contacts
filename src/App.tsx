import { useContext } from 'react';
import './App.css';
import { AuthContext } from './context/AuthContext';
import { AuthenticatedRoutes, UnauthenticatedRoutes } from './routes/Routes';

function App() {
  const value = useContext(AuthContext);
  const auth = value?.auth;

  console.log(auth?.getAuth)

  let routes = (
    <AuthenticatedRoutes/>
  );

  if (auth?.getAuth) {
    routes = (
      <UnauthenticatedRoutes/>
    );
  }
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
