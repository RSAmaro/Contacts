import { Button, CircularProgress, Container, InputLabel, Paper, Select, Stack, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { ContactDTO } from "../models/ContactDTO";
import { ContactTypeDTO } from "../models/ContactTypeDto";
import { getNum } from "../classes/Helper";
import { Api } from "../services/Axios";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function EditContact() {
    const db = new Api();
    const { id } = useParams();
    const [data, setData] = useState<ContactDTO>(new ContactDTO());
    const [types, setTypes] = useState<ContactTypeDTO[]>();

    const [loading, setLoading] = useState(true);

    async function getById() {
        if (id != null) {
            setData(await db.getById(id));
            setTypes(await db.getTypes());
            setLoading(false);
        }
    }

    const handleSelect = (event: any) => {
        setData({ ...data, typeId: Number.parseInt(event.target.value.toString()) })
    }

    async function updateContact(){
        var response = await db.editContact(data.id.toString(), data);
        if (response == null || response.success === false) {
            return toast.error(response.message, {
                theme: "colored"
            });
        }
        
        window.location.href = "/Contacts";
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
                    <Typography variant="h4" color="initial">Editing Contact #{data.id}</Typography>

                    <TextField
                        id="outlined-helperText"
                        label="Name"
                        onChange={(e) => setData({ ...data, name: e.target.value })}
                        value={data.name}
                        helperText="* Required"
                    />
                    <TextField
                        id="outlined-helperText"
                        label="Phone"
                        onChange={(e) => setData({ ...data, phone: getNum(parseInt(e.target.value)) })}
                        inputProps={{ maxLength: 9, minLength: 9 }}
                        value={data.phone}
                        helperText="* Required"
                    />
                </Stack>

                <Stack spacing={0} sx={{ marginTop: 2 }}>
                    <InputLabel id="type-label">Type</InputLabel>
                    <Select labelId="type-label" native={true} onChange={handleSelect} value={data.typeId}>
                        {types &&
                            types.map(options => {
                                return (
                                    <option key={options.id} value={options.id}>{options.name}</option>
                                )
                            }
                            )
                        }
                    </Select>
                </Stack>
                {loading ? <CircularProgress /> :
                    <Button sx={{ marginTop: 4 }} variant="contained" color="primary" onClick={() => { updateContact() }}>
                        Submit
                    </Button>
                }
            </Container>


        </div>
    )
}
