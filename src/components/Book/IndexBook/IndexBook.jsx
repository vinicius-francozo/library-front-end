import Carousel from "react-material-ui-carousel";
import { styled } from "@mui/material/styles";
import { Paper, Box, Grid } from "@mui/material";
import { useLocation } from "react-router-dom";
import { BookCard } from "../components";
import { BackDrop, Snackbar, Pagination } from "../../Utils";
import { useEffect, useState } from "react";
import { GET_BOOKS, GET_BOOKS_PAGINATED } from "../../../service";
import { useQuery } from "@apollo/client";

export default function IndexBook() {
  const location = useLocation();
  const [open, setOpen] = useState(
    location?.state?.openSnackbar ? true : false
  );
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(4);
  const [totalBooks, setTotalBooks] = useState();
  const foundBooks = location?.state?.foundBooks;
  const [books, setBooks] = useState(foundBooks);

  const getBooks = useQuery(GET_BOOKS);
  const getBooksPaginated = useQuery(GET_BOOKS_PAGINATED, {
    variables: { perPage: `${rowsPerPage}`, page: `${page + 1}` },
  });

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
      setTotalBooks(getBooks.data?.findAllBooks?.length);
    };

    const fetchBooksPaginated = async () => {
      if (rowsPerPage && page && !getBooksPaginated.data) {
        getBooksPaginated.refetch();
        return;
      }
      setBooks(getBooksPaginated.data?.bookPerPage);
    };
    if (!foundBooks) {
      fetchBooks();
      fetchBooksPaginated();
    }
  }, [foundBooks, getBooks.data, getBooksPaginated.data]);

  useEffect(() => {
    getBooksPaginated.fetchMore({
      variables: { perPage: `${rowsPerPage}`, page: `${page + 1}` },
    });
  }, [page, rowsPerPage, setPage, setRowsPerPage]);

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
          count={totalBooks || foundBooks?.length || 0}
        />
      </Grid>
      <Snackbar
        message={"Ação realizada com sucesso"}
        open={open}
        setOpen={setOpen}
      />
      <BackDrop open={getBooks.loading || getBooksPaginated.loading} />
    </Box>
  );
}
