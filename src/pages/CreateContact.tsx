import { Container, Stack, Typography, TextField, InputLabel, Select, Button, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import { ContactDTO } from "../models/ContactDTO";
import { ContactTypeDTO } from "../models/ContactTypeDto";
import { getNum } from "../classes/Helper";
import { Api } from "../services/Axios";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function CreateContact() {
    const db = new Api();
    const [data, setData] = useState<ContactDTO>(new ContactDTO());
    const [types, setTypes] = useState<ContactTypeDTO[]>();

    async function getTypes() {
        setTypes(await db.getTypes());
    }

    async function createContact() {
        var response = await db.createContact(data);
        if (response == null || response.success === false) {
            return toast.error(response.message, {
                theme: "colored"
            });
        }
        window.location.href = "/Contacts";
    }

    const handleSelect = (event: any) => {
        setData({ ...data, typeId: Number.parseInt(event.target.value.toString()) })
    }

    useEffect(() => {
        getTypes() // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


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

            <Container maxWidth="sm" component={Paper} sx={{ marginTop: 4, padding: 4, textAlign: 'left' }}>
                <Stack spacing={4}>
                    <Typography variant="h4" color="initial">Create Contact</Typography>

                    <TextField
                        id="outlined-helperText"
                        label="Name"
                        onChange={(e) => setData({ ...data, name: e.target.value })}
                        value={data.name}
                        helperText="* Required (Example: John)"
                    />
                    <TextField
                        id="outlined-helperText"
                        label="Phone"
                        onChange={(e) => setData({ ...data, phone: getNum(parseInt(e.target.value)) })}
                        inputProps={{ maxLength: 9, minLength: 9 }}
                        value={data.phone}
                        helperText="* Required (Format: 911222333)"
                    />
                </Stack>

                <Stack spacing={0} sx={{ marginTop: 2 }}>
                    <InputLabel id="type-label" sx={{textAlign: 'left'}}>Type</InputLabel>
                    <Select labelId="type-label" native={true} onChange={handleSelect} defaultValue="">
                        <option value="" disabled hidden>Choose Contact Type</option>
                        {types &&
                            types.map(options => {
                                return (
                                    <option key={options.id} value={options.id}>{options.name}</option>
                                )
                            }
                            )
                        }
                    </Select>
                    <span>* Required</span>
                </Stack>

                <Button sx={{ marginTop: 4 }} variant="contained" color="primary" onClick={() => { createContact() }}>
                    Create
                </Button>

            </Container>
        </div>
    )
}
