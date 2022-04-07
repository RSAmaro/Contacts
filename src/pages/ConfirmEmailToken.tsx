import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Helpers } from "../classes/Helper";
import { ConfirmDTO } from "../models/ConfirmDTO";
import { AuthService } from "../services/Auth";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, Container, Paper, Stack, Typography } from "@mui/material";

export default function ConfirmEmailToken() {
    const service = new AuthService();
    const [userId] = useState<string>(Helpers.LoadParameterFromURLQuery("userid", "string", null));
    const [token] = useState<string>(Helpers.LoadParameterFromURLQuery("token", "string", null));

    useEffect(() => {
        ConfirmEmail(); // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, token]);

    const ConfirmEmail = async () => {
        try {
            if (userId === null || token === null)
                return;

            const data: ConfirmDTO = {
                UserId: userId,
                Token: token,
            }

            var response = await service.ConfirmEmail(data);

            if (response.success === true) {
                return toast.success("Email Confirmed!");
            } else {
                return toast.error(response.message);
            }
        }
        catch (error) {
            return toast.error("Error");
        }
    }

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
                        <Typography variant="h5" color="primary">Confirming Email...</Typography>
                        <Link to="../Login"><Button variant="contained">Go to Login</Button></Link>
                    </Stack>
                </Paper>
            </Container>

        </div>
    )
}
