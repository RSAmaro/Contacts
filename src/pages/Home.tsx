import { Container, Paper, Typography } from "@mui/material";

export default function Home() {
    return (
        <>
            <Container maxWidth="sm" sx={{ marginTop: "2em"}}>
                <Paper sx={{ padding: 2 }}>
                    <Typography variant="h5" color="initial">Bemvindo</Typography>
                    <img width={'100%'} height={'100%'} src="/background.jpg" alt="[Welcome]"/>
                </Paper>
            </Container>
        </>
    )
}
