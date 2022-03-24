import { Button, Container, Input, Paper, Stack, TableContainer, TablePagination, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import TableComponent from '../components/Table';
import { Contact, returnCollumns } from '../interfaces/Contact';
import { Api } from '../services/Axios';

export default function Contacts() {
    const db = new Api();

    const [rowData, setRowData] = useState<Contact[]>([]);
    const collumns: string[] = returnCollumns();

    const [q, setQ] = useState("");
    const [searchCollumns, setSearchCollumns] = useState([
        'id',
    ]);

    const [page, setPage] = useState(0);
    const [perPage, setPerPage] = useState(5);

    const [sort, setSort] = useState("");

    const [count, setCount] = useState(0);

    async function getData() {
        setRowData(await db.getRows((page + 1), perPage, sort, q, searchCollumns));
        setCount(db.count);
    }

    useEffect(() => {
        getData(); // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, perPage, sort, q, searchCollumns]);

    // Pagination Handles
    const handleChangePage = (_event: any, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: any) => {
        setPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const headerHandleClick = async (value: any) => {
        if (sort === "") { return setSort(value); }
        if (sort === value) { return setSort(value + "_desc"); }
        if (sort === value.concat("_desc")) { return setSort(""); }
        return setSort(value);
    }

    const editRow = (value: any) => {
        window.location.href = `Contacts/Edit/${value}`;
    }

    const delRow = (value: any) => {
        window.location.href = `Contacts/Delete/${value}`;
    }

    return (
        <div className="App">
            <Container className="App" sx={{ marginTop: 2 }}>
                <Container maxWidth="xs">
                    <Stack>
                        <Typography variant="h6" color="initial">Search</Typography>
                        <Input type="text" value={q} onChange={(e) => { setQ(e.target.value); setPage(0) }} />
                    </Stack>
                    <Stack direction="row" spacing={2}>
                        {collumns &&
                            collumns.map((column, index) => (

                                <label key={index}>
                                    <input
                                        type='checkbox'
                                        checked={searchCollumns.includes(column)}
                                        onChange={(_e) => {
                                            const checked = searchCollumns.includes(column);
                                            setSearchCollumns((prev: any) =>
                                                checked
                                                    ? prev.filter((sc: any) => sc !== column)
                                                    : [...prev, column],
                                            );
                                        }}
                                    />
                                    {column}
                                </label>

                            ))}
                    </Stack>
                </Container>
                <br/>
                <TableContainer component={Paper}>
                    <TableComponent data={rowData} sort={sort} onClickSort={headerHandleClick} onEditClick={editRow} onDelClick={delRow}></TableComponent>
                </TableContainer>

                <TablePagination
                    component="div"
                    count={count}
                    page={page}
                    onPageChange={handleChangePage}
                    rowsPerPage={perPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    rowsPerPageOptions={[5, 10, 25, 50]}
                    showFirstButton={true}
                    showLastButton={true}
                />

                <Link to="Create">
                    <Button variant="contained" color="success">
                        Add Contact
                    </Button>
                </Link>
            </Container>
        </div>
    );
}
