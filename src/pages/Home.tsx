import { Container, Paper } from "@mui/material";

export default function Home() {
    return (
        <>
            <Container maxWidth="sm" sx={{ marginTop: "2em"}}>
                <Paper>
                    <div>Bemvindo!</div>
                    <img width={'100%'} height={'100%'} src="/background.jpg" alt="[Welcome Image]"/>
                </Paper>
            </Container>
        </>
    )
}
