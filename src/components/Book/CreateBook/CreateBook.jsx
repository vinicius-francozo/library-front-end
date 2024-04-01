import { Container, Paper, Box, Typography } from "@mui/material";
import { BookForm } from "../components";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function CreateBook() {
  const matches = useMediaQuery("(max-width:600px)");

  return (
    <Container
      sx={{ minHeight: "100vh", height: "fit-content", paddingBlock: 2 }}
    >
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
          height={matches ? "fit-content" : "80vh"}
        >
          <Typography variant="h4" fontSize="300" color={"#e1ebf3"} mb={2}>
            Cadastrar Livro...
          </Typography>
          <BookForm />
        </Box>
      </Paper>
    </Container>
  );
}
