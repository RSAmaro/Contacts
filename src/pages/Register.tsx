import { Box, Button, Container, CssBaseline, Grid, Link, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { RegisterCreateDTO, RegisterDTO } from "../models/Register";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Api } from "../services/Axios";

export default function Register() {
    const db = new Api();
    const [data, setData] = useState<RegisterCreateDTO>(new RegisterCreateDTO());

    async function createUser(user: RegisterDTO) {
        var response = await db.createUser(user);
        if (response == null) {
            return toast.error("Incorrect values!", {
                theme: "colored"
            });
        }
        window.location.href = "/Login";
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if(data.email === "" || data.password === "" || data.confirmPassword === "")
            return toast.error("All rows must have a value! ", {
                theme: "colored"
            });

        if (data.password !== data.confirmPassword)
            return toast.error("Passwords should be the same! ", {
                theme: "colored"
            });

        const formValues = new RegisterDTO();
        formValues.email = data.email;
        formValues.password = data.password;

        createUser(formValues);

        console.log(formValues);

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
                        Register
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
                                <Link href="#" variant="body2">
                                    {"Already have an account? Sign in here!"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>

        </>
    )
}
