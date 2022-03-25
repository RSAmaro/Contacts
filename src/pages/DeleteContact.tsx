import { Button, CircularProgress, Container, Paper, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { ContactDTO } from "../models/ContactDTO";
import { ContactTypeDTO } from "../models/ContactTypeDto";
import { Api } from "../services/Axios";

export default function DeleteContact() {
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

    async function delContact() {
        if (await db.deleteContact(data.id.toString()))
            window.location.href = "/Contacts";
    }

    useEffect(() => {
        getById(); // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    return (
        <div>
            <Container maxWidth="sm" component={Paper} sx={{ marginTop: 4, padding: 4 }}>
                <Stack spacing={4} >
                    <Typography variant="h4" color="initial">Deleting Contact #{id}</Typography>
                    <Typography color="initial">Name: {data.name}</Typography>
                    <Typography color="initial">Phone: {data.phone}</Typography>
                    <Typography color="initial">Tipo: {types && types.map(options => { return ((options.id === data.typeId) ? options.name : null) })}</Typography>
                </Stack>

                {loading ? <CircularProgress /> :
                    <Button sx={{ marginTop: 4 }} variant="contained" color="error" onClick={() => { delContact() }}>
                        Delete
                    </Button>
                }
            </Container>


        </div>
    )
}
