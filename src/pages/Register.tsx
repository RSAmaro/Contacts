import { Box, Button, Container, Grid, Link, Paper, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { RegisterCreateDTO, RegisterDTO } from "../models/Register";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Api } from "../services/Axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const db = new Api();
    const navigate = useNavigate();
    const [data, setData] = useState<RegisterCreateDTO>(new RegisterCreateDTO());

    async function createUser(user: RegisterDTO) {
        var response = await db.createUser(user);
        if (response == null || response.success === false) {
            return toast.error(response.message, {
                theme: "colored"
            });
        }
        navigate("../ConfirmEmail");
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (data.email === "" || data.password === "" || data.confirmPassword === "")
            return toast.error("All rows must have a value! ", {
                theme: "colored"
            });

        if (data.password !== data.confirmPassword)
            return toast.error("Passwords should be the same! ", {
                theme: "colored"
            });

        const formValues = new RegisterDTO();
        formValues.username = data.username;
        formValues.email = data.email;
        formValues.password = data.password;

        createUser(formValues);
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
            <Container component="main" maxWidth="sm">
                <Paper sx={{ marginTop: 8, padding: 6 }}>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'left',
                    }}>
                        <Typography component="h1" variant="h5">
                            Register
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                name="username"
                                autoComplete="username"
                                onChange={(e) => setData({ ...data, username: e.target.value })}
                                value={data.username}
                                autoFocus
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                onChange={(e) => setData({ ...data, email: e.target.value })}
                                value={data.email}
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
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Confirm Password"
                                type="password"
                                id="password"
                                onChange={(e) => setData({ ...data, confirmPassword: e.target.value })}
                                value={data.confirmPassword}
                                autoComplete="current-password"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Register
                            </Button>
                            <Grid container>
                                <Grid item>
                                    <Link href="Login" variant="body2">
                                        {"Already have an account? Sign in here!"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Paper>
            </Container>

        </>
    )
}
