import Carousel from "react-material-ui-carousel";
import { styled } from "@mui/material/styles";
import { Paper, Box, Grid } from "@mui/material";
import { useLocation } from "react-router-dom";
import { AuthorCard } from "../components";
import { BackDrop, Pagination, Snackbar } from "../../Utils";
import { useEffect, useState } from "react";
import { GET_AUTHORS, GET_AUTHORS_PAGINATED } from "../../../service";
import { useQuery } from "@apollo/client";

export default function IndexAuthor() {
  const location = useLocation();
  const [open, setOpen] = useState(
    location?.state?.openSnackbar ? true : false
  );
  const [authors, setAuthors] = useState();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(4);
  const [totalAuthors, setTotalAuthors] = useState();

  const getAuthors = useQuery(GET_AUTHORS);
  const getAuthorsPaginated = useQuery(GET_AUTHORS_PAGINATED, {
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
    if (getAuthors.data) {
      setTotalAuthors(getAuthors.data.findAllAuthors.length);
    }
    const fetchAuthor = async () => {
      if (rowsPerPage && page && !getAuthorsPaginated.data) {
        getAuthorsPaginated.refetch();
        return;
      }
      setAuthors(getAuthorsPaginated.data?.authorPerPage);
    };
    fetchAuthor();
  }, [getAuthors.data, getAuthorsPaginated.data]);

  useEffect(() => {
    getAuthorsPaginated.fetchMore({
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
            <Img src={item.src} alt="autor" />
          </Paper>
        ))}
      </Carousel>
      <Grid container spacing={5} pl={2} pb={4}>
        {authors?.map((author) => (
          <AuthorCard key={author.id} author={author} seeMore={true} />
        ))}
      </Grid>
      <Grid item xs={12} justifyContent="center" display="flex">
        <Pagination
          page={page}
          setPage={setPage}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
          count={totalAuthors || 0}
        />
      </Grid>
      <Snackbar
        message={"Ação realizada com sucesso"}
        open={open}
        setOpen={setOpen}
      />
      <BackDrop open={getAuthors.loading || getAuthorsPaginated.loading} />
    </Box>
  );
}
