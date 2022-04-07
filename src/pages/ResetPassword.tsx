import { Button, Container, Input, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Helpers } from "../classes/Helper";
import { ResetPasswordDTO } from "../models/ResetPassword";
import { UserService } from "../services/User";

export default function ResetPassword() {
    const service = new UserService();
    const navigate = useNavigate();

    const [userId] = useState<string>(Helpers.LoadParameterFromURLQuery("userId", "string", null));
    const [token] = useState<string>(Helpers.LoadParameterFromURLQuery("token", "string", null));
    const [password, setPassword] = useState<string>("");
    const [password2, setPassword2] = useState<string>("");

    const resetPassword = async () => {
        try {
            if (password !== password2) {
                return toast.error("Passwords don't match!")
            }
            const data: ResetPasswordDTO = {
                userId: userId,
                password: password,
                token: token,
            }

            var response = await service.ResetPassword(data);

            if (response.success === true) {
                navigate('/login');
            } else {
                return toast.error(response.message);
            }
        }
        catch (error) {
            toast.error("Ocorreu um erro ao redefinir a password. Por favor tente novamente dentro de segundos.");
        }
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
            <Container>
                <Typography variant="h4" color="initial">Reset Password</Typography>
                <Typography variant="h6" color="initial">Please insert your new password</Typography>
                <Stack spacing={4}>
                    <Input type="password" value={password} onChange={(element) => { setPassword(element.target.value) }} placeholder="Password"></Input>
                    <Input type="password" value={password2} onChange={(element) => { setPassword2(element.target.value) }} placeholder="Confirm Password"></Input>
                    <Button onClick={() => { resetPassword() }}>Send Email</Button>
                </Stack>
            </Container>

        </>
    )
}
