import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { Link } from "react-router-dom";

const Navbar = () => {

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography variant="h6" noWrap component="div">Contatos</Typography>
                    <Stack direction="row" spacing={2} sx={{ marginLeft: 2 }}>
                        <Link to="Contacts">
                            <Button variant="contained" color="success">
                                Contacts
                            </Button>
                        </Link>
                        <Link to="ContactsType">
                            <Button variant="contained" color="success">
                                Types
                            </Button>
                        </Link>
                    </Stack>
                    <Stack direction="row" spacing={2} sx={{ marginLeft: 'auto' }}>
                        <Link to="Login">
                            <Button variant="contained" color="success">
                                Login
                            </Button>
                        </Link>
                        <Link to="Register">
                            <Button variant="contained" color="success">
                                Register
                            </Button>
                        </Link>
                    </Stack>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default Navbar;