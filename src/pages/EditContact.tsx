import { Button, Container, InputLabel, Select, Stack, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { ContactDTO } from "../classes/ContactDTO";
import { ContactTypeDTO } from "../classes/ContactTypeDto";
import { Api } from "../services/Axios";

function getNum(val: number) {
    val = +val || 0
    return val;
}

export default function EditContact() {
    const db = new Api();
    const { id } = useParams();
    const [data, setData] = useState<ContactDTO>(new ContactDTO());
    const [types, setTypes] = useState<ContactTypeDTO[]>();

    async function getById() {
        if (id != null) {
            setData(await db.getById(id));
            setTypes(await db.getTypes());
        }
    }

    const handleSelect = (event: any) => {
        setData({ ...data, typeId: Number.parseInt(event.target.value.toString()) })
    }

    function updateContact() {

    }

    useEffect(() => {
        getById(); // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    return (
        <div>
            <Container maxWidth="sm">
                <br />
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
                        value={data.phone}
                        helperText="* Required"
                    />
                </Stack>
                <br />
                <Stack spacing={0}>
                    <InputLabel id="type-label">Tipo de Contato</InputLabel>
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
                <br />
                <Button variant="contained" color="primary" onClick={() => { updateContact() }}>
                    Submit
                </Button>
            </Container>


        </div>
    )
}
