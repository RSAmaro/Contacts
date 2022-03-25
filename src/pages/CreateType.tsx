import { Container, Stack, Typography, TextField, Button, Paper } from "@mui/material";
import { useState } from "react";
import { Api } from "../services/Axios";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ContactTypeDTO } from "../models/ContactTypeDto";

export default function CreateType() {
    const db = new Api();
    const [data, setData] = useState<ContactTypeDTO>(new ContactTypeDTO());

    async function createType() {
        var response = await db.createType(data);
        if (response == null || response.success === false) {
            return toast.error(response.message, {
                theme: "colored"
            });
        }
        window.location.href = "/ContactsType";
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

            <Container maxWidth="sm" component={Paper} sx={{ marginTop: 4, padding: 4 }}>
                <Stack spacing={4}>
                    <Typography variant="h4" color="initial">Create Contact Type</Typography>

                    <TextField
                        id="outlined-helperText"
                        label="Name"
                        onChange={(e) => setData({ ...data, name: e.target.value })}
                        value={data.name}
                        helperText="* Required (Example: Familiar)"/>
                </Stack>

                <Button sx={{ marginTop: 4 }} variant="contained" color="primary" onClick={() => { createType() }}>
                    Create
                </Button>

            </Container>
        </div>
    )
}
