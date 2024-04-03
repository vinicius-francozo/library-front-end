import Carousel from "react-material-ui-carousel";
import { styled } from "@mui/material/styles";
import { Paper, Box, Grid } from "@mui/material";
import { useLocation } from "react-router-dom";
import { AuthorCard } from "../components";
import { BackDrop, Pagination, Snackbar } from "../../Utils";
import { useEffect, useState } from "react";
import { getAuthors, getPaginatedAuthors } from "../../../service";

export default function IndexAuthor() {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(
    location?.state?.openSnackbar ? true : false
  );
  const [authors, setAuthors] = useState();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(4);
  const [totalAuthors, setTotalAuthors] = useState();

  const booksCarousel = [
    {
      src: "src/assets/matt-ridley-H-LIL57PHCc-unsplash.jpg",
    },
    {
      src: "src/assets/morgan-housel-aZ_MmSmAcjg-unsplash.jpg",
    },
  ];

  useEffect(() => {
    const fetchAuthor = async () => {
      try {
        setLoading(true);
        const response = await getAuthors();
        setTotalAuthors(response?.authors?.length);
      } catch (err) {
        return err;
      } finally {
        setLoading(false);
      }
    };
    fetchAuthor();
  }, []);

  useEffect(() => {
    const fetchAuthor = async () => {
      try {
        setLoading(true);
        const response = await getPaginatedAuthors(rowsPerPage, page);
        setAuthors(response?.authors);
      } catch (err) {
        return err;
      } finally {
        setLoading(false);
      }
    };
    fetchAuthor();
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
          count={totalAuthors}
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
