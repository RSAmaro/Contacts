import { Container, Stack, Typography, TextField, Button, Paper, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { Api } from "../services/Axios";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ContactTypeDTO } from "../classes/ContactTypeDto";
import { useParams } from "react-router-dom";

export default function EditType() {
    const db = new Api();
    const { id } = useParams();
    const [data, setData] = useState<ContactTypeDTO>(new ContactTypeDTO());
    const [loading, setLoading] = useState(true);

    async function getById() {
        if (id != null) {
            setData(await db.getTypeById(id));
            setLoading(false);
        }
    }

    async function updateType() {
        var response = await db.createType(data);
        if (response == null || response.success === false) {
            return toast.error(response.message, {
                theme: "colored"
            });
        }
        window.location.href = "/ContactsType";
    }

    useEffect(() => {
        getById(); // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);


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

                {loading ? <CircularProgress /> :
                    <Button sx={{ marginTop: 4 }} variant="contained" color="primary" onClick={() => { updateType() }}>
                        Edit
                    </Button>
                }

            </Container>
        </div>
    )
}
