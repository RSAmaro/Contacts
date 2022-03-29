import { Box, Button, Container, CssBaseline, Grid, Link, TextField, Typography } from "@mui/material";
import { useContext, useState } from "react";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Api } from "../services/Axios";
import { LoginDTO } from "../models/Login";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const db = new Api();
  const [data, setData] = useState<LoginDTO>(new LoginDTO());

  const auth = useContext(AuthContext);
  
  async function loginUser(user: LoginDTO) {
    var response = await db.loginUser(user);
    if (response == null  || response.success === false) {
      return toast.error("Incorrect Login!", {
        theme: "colored"
      });
    }

    auth?.setAuth({
      token: "TESTE",
      getAuth: true
    });

    //window.location.href = "/";
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (data.email === "" || data.password === "")
      return toast.error("All rows must have a value! ", {
        theme: "colored"
      });

    loginUser(data);
  };

  return (
    <>
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
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              onChange={(e) => setData({ ...data, email: e.target.value })}
              value={data.email}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              onChange={(e) => setData({ ...data, password: e.target.value })}
              value={data.password}
              autoComplete="current-password"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>
            <Grid container>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>

    </>
  )
}
