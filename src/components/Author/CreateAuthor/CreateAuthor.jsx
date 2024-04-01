import { Container, Paper, Box, Typography } from "@mui/material";
import { AuthorForm } from "../components";

export default function CreateAuthor() {
  return (
    <Container sx={{ height: "100vh", paddingBlock: 2 }}>
      <Paper
        sx={{
          backgroundColor: "rgba(150, 142, 99, 0.932)",
          width: "100%",
          height: "100%",
          padding: 4,
          borderRadius: 3,
        }}
        elevation={19}
      >
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="space-around"
          height="80vh"
        >
          <Typography variant="h4" fontSize="300" color={"#e1ebf3"} my={2}>
            Cadastrar Autor...
          </Typography>
          <AuthorForm />
        </Box>
      </Paper>
    </Container>
  );
}
