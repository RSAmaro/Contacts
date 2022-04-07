import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { UserService } from "../services/User"

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ForgotPasswordDTO } from "../models/ForgotPasswordDTO";
import { Button, Container, Divider, Input, Paper, Stack, Typography } from "@mui/material";

export default function ForgotPassword() {

    const [email, setEmail] = useState<string>("")
    const navigation = useNavigate()

    const service = new UserService()

    const SendEmail = async () => {
        var dados: ForgotPasswordDTO = {
            email: email
        }
        var response = await service.ForgotPassword(dados)

        if (response == null || response.success === false) {
            return toast.error("Nao foi possivel enviar o email")
        }

        return navigation("/login");
    }

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
                    <Typography variant="h4" color="initial">Recover Password</Typography>
                    <Divider/>
                    <Stack spacing={4}>
                    <Typography color="initial">Enter your email and we will send you an email with a link that will take you to the password recovery page</Typography>

                        <Input type="text" value={email} onChange={(element) => { setEmail(element.target.value) }} placeholder="Email"></Input>
                        <Button variant="contained" onClick={SendEmail}>Send Email</Button>
                    </Stack>
                </Paper>
            </Container>

        </>
    )
}