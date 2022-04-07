import { Button, Container, Paper, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ConfirmEmail() {
  return (
    <div>
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Container maxWidth="md" sx={{ marginTop: 5 }}>
        <Paper sx={{ padding: 6 }}>
          <Stack spacing={2}>
            <img src="handshake.png" alt="[Confirm]" width="125" height="120" style={{ display: 'block', border: '0px', margin: 'auto' }} />
            <Typography variant="h5" color="primary">We've sent you a Confirmation Email!</Typography>
            <Typography variant="h6" color="initial">Please check your inbox.</Typography>
            <Link to="../"><Button variant="contained">Go to Home</Button></Link>
          </Stack>
        </Paper>
      </Container>
    </div>
  )
}
