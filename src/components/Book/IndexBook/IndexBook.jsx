import Carousel from "react-material-ui-carousel";
import { styled } from "@mui/material/styles";
import { Paper, Box, Typography, Grid } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { BookCard } from "../components";
import { BackDrop, Snackbar, Pagination } from "../../Utils";
import { useEffect, useState } from "react";
import { getBooks, getPaginatedBooks } from "../../../service";

export default function IndexBook() {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(
    location?.state?.openSnackbar ? true : false
  );
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(4);
  const [totalBooks, setTotalBooks] = useState();
  const foundBooks = location?.state?.foundBooks;
  const [books, setBooks] = useState(foundBooks);

  const booksCarousel = [
    {
      src: "src/assets/matt-ridley-H-LIL57PHCc-unsplash.jpg",
    },
    {
      src: "src/assets/morgan-housel-aZ_MmSmAcjg-unsplash.jpg",
    },
  ];

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const response = await getBooks();
        setTotalBooks(response?.books?.length);
      } catch (err) {
        return err;
      } finally {
        setLoading(false);
      }
    };
    if (!foundBooks) fetchBooks();
  }, [foundBooks]);

  useEffect(() => {
    const fetchAuthor = async () => {
      try {
        setLoading(true);
        const response = await getPaginatedBooks(rowsPerPage, page);
        setBooks(response?.books);
      } catch (err) {
        return err;
      } finally {
        setLoading(false);
      }
    };
    if (!foundBooks) fetchAuthor();
  }, [page, rowsPerPage, setPage, setRowsPerPage, foundBooks]);

  const Img = styled("img")({
    display: "block",
    width: "50px",
    minWidth: "100%",
    height: "90vh",
    objectFit: "cover",
  });

  return (
    <Box sx={{ overflowX: "hidden" }}>
      <Carousel sx={{ width: "100vw" }}>
        {booksCarousel.map((item, i) => (
          <Paper sx={{ width: "100vw" }} key={i}>
            <Img src={item.src} alt="capa do livro" />
          </Paper>
        ))}
      </Carousel>
      <Grid container spacing={5} pl={2} pb={4}>
        <Grid item xs={12}>
          <Typography variant="h4" color={"#e1ebf3b8"} pb={3}>
            Gostaria de cadastrar um livro? Faça isso agora clicando{" "}
            <Link style={{ color: "inherit" }} to="/book/create">
              Aqui!
            </Link>
          </Typography>
        </Grid>
        {books?.map((book) => (
          <BookCard key={book.id} book={book} seeMore={true} />
        ))}
      </Grid>
      <Grid item xs={12} display="flex" justifyContent="center">
        <Pagination
          page={page}
          setPage={setPage}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
          count={totalBooks || foundBooks?.length}
        />
      </Grid>
      <Snackbar
        message={"Ação realizada com sucesso"}
        open={open}
        setOpen={setOpen}
      />
      <BackDrop open={loading} />
    </Box>
  );
}
