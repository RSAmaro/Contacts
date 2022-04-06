import { Button, Container, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function ConfirmEmail() {
  return (
    <div>
        <Container maxWidth="md" sx={{marginTop: 5}}>
            <Paper sx={{padding: 6}}>
                <img src="handshake.png" alt="[Confirm]" width="125" height="120" style={{display: 'block', border: '0px', margin: 'auto'}}/>
                <Typography variant="h5" color="primary">We've sent you a Confirmation Email!</Typography>
                <Typography variant="h6" color="initial">Please check your inbox.</Typography>
                <Link to="../"><Button>Go to Home</Button></Link>
            </Paper>
        </Container>
    </div>
  )
}
