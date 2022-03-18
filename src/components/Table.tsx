import { useState } from 'react';
import { IconButton, InputBase, Paper, Skeleton, Stack, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

export type TableComponentProps = {

    columns: any[];
    data: any[] | null;
    sorting: string;
    OnClickSort: (name: string | any) => void;
}

export default function TableComponent(props: TableComponentProps) {

    const [loading] = useState(false);

    return (

        <Table sx={{ minWidth: 550 }} size="medium" stickyHeader >
            <TableHead>
                <TableRow>
                    {
                        //onClick={(e) => { props.OnClickHeader(col.value) }}
                        props.columns.map((col) => (

                            <TableCell key={col.value}>
                                <Paper sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '100%' }} >
                                    <InputBase sx={{ ml: 1, flex: 1 }} placeholder={"Filtrar por " + col.label} />
                                    <IconButton sx={{ p: '10px' }}>
                                        <FilterAltIcon />
                                    </IconButton>
                                </Paper>
                                <br />
                                <Typography variant="h6" color="initial" style={{ userSelect: 'none' }} onClick={() => { props.OnClickSort(col.value) }}>
                                    <Stack direction="row" spacing={2}>
                                    {col.label}
                                    {props.sorting === col.value ? <ArrowDropUpIcon /> : null}{props.sorting === (col.value + "_desc") ? <ArrowDropDownIcon /> : null}
                                    </Stack>
                                </Typography>
                            </TableCell>

                        ))
                    }
                </TableRow>
            </TableHead>
            <TableBody>
                {
                    props.data !== null ? props.data.map((row) => (

                        <TableRow key={row.id}>
                            <TableCell component="th" scope="row">{loading ? <Skeleton /> : row.id}</TableCell>
                            <TableCell align="left">{loading ? <Skeleton /> : row.name}</TableCell>
                            <TableCell align="left">{loading ? <Skeleton /> : row.phone}</TableCell>
                        </TableRow>

                    )) : null
                }
            </TableBody>
        </Table>

    )
}