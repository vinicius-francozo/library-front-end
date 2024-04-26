import { Container, Paper, Box, Typography } from "@mui/material";
import { BookForm } from "../components";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GET_BOOK_BY_ID } from "../../../service";
import { BackDrop } from "../../Utils";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useQuery } from "@apollo/client";

export default function UpdateBook() {
  const [book, setBook] = useState();
  const { bookId } = useParams();
  const { data, loading } = useQuery(GET_BOOK_BY_ID, {
    variables: { id: bookId },
  });
  const matches = useMediaQuery("(max-width:600px)");

  useEffect(() => {
    setBook(data?.findOneBook);
  }, [data]);

  return (
    <Container
      sx={{ height: "fit-content", minHeight: "100vh", paddingBlock: 2 }}
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
          <Typography variant="h4" fontSize="300" color={"#e1ebf3"}>
            Atualizar Livro...
          </Typography>
          {book && <BookForm book={book} method="PUT" />}
        </Box>
      </Paper>
      <BackDrop open={loading} />
    </Container>
  );
}
