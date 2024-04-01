import { Container, Paper, Box, Typography } from "@mui/material";
import { BookForm } from "../components";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBook } from "../../../service";
import { BackDrop } from "../../Utils";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function UpdateBook() {
  const [loading, setLoading] = useState(false);
  const [book, setBook] = useState();
  const { bookId } = useParams();
  const matches = useMediaQuery("(max-width:600px)");

  useEffect(() => {
    const fetchAuthor = async () => {
      try {
        setLoading(true);
        const response = await getBook(bookId);
        setBook(response?.book);
      } catch (err) {
        return err;
      } finally {
        setLoading(false);
      }
    };
    fetchAuthor();
  }, []);

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
