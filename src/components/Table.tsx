import { Button, Stack, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { returnCollumns } from '../interfaces/Contact';

export type TableComponentProps = {
    data: any[];
    sort: string;
    onClickSort: (name: string) => void;
}

export default function TableComponent(props: TableComponentProps) {

    const collumns: string[] = returnCollumns();
    const data = props.data;

    return (
        <Table sx={{ minWidth: 550 }} size="medium" stickyHeader >
            <TableHead>
                <TableRow>
                    {
                        collumns.map((heading: any, value: number) => {
                            return (
                                <TableCell key={value}>
                                    <Typography variant="h6" color="initial" style={{ textTransform: 'capitalize', userSelect: 'none' }} onClick={() => { props.onClickSort(heading) }}>
                                        <Stack direction="row" spacing={2}>
                                            {heading}
                                            {props.sort === heading ? <ArrowDropUpIcon /> : null}{props.sort === (heading + "_desc") ? <ArrowDropDownIcon /> : null}
                                        </Stack>
                                    </Typography>
                                </TableCell>
                            )
                        })
                    }
                    <TableCell align="left">
                        <Typography variant="h6" color="initial" style={{ userSelect: 'none' }}>
                            Actions
                        </Typography>
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {
                    data.map(row => {
                        return (
                            <TableRow key={row.id}>
                                {collumns.map((collumn: any) =>
                                    <TableCell align="left" key={row[collumn]}>
                                        {row[collumn]}
                                    </TableCell>
                                )}
                                <TableCell align="left" key={row.id}>
                                    <Stack direction="row" spacing={2}>
                                        <Button variant="contained" color="info" startIcon={<EditIcon />}>Editar</Button>
                                        <Button variant="contained" color="error" startIcon={<DeleteIcon />}>Remover</Button>
                                    </Stack>
                                </TableCell>
                            </TableRow>
                        )
                    }
                    )
                }
            </TableBody>
        </Table>

    )
}