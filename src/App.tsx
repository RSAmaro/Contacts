import { Container, Paper, Stack, Typography } from '@mui/material';
import './App.css';

function App() {
  return (
    <div className="App">
      <Container className="App" maxWidth="xs">
        <Paper sx={{ marginTop: 10, padding: 4 }}>
          <Stack spacing={4}>
            <Typography variant="h5" color="initial">Lista de Contatos</Typography>
            <Typography color="initial">Escolha das opções acima.</Typography>
          </Stack>
        </Paper>
      </Container>
    </div>
  );
}

export default App;
