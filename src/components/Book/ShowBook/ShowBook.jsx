import { Grid, Typography } from "@mui/material";
import { BookCard } from "../components";
import { BookComment, CreateBookComment } from "./components";
import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { GET_BOOK_BY_ID } from "../../../service";
import { BackDrop, Snackbar } from "../../Utils";
import { useQuery } from "@apollo/client";

export default function ShowBook() {
  const location = useLocation();
  const [book, setBook] = useState();
  const [comments, setComments] = useState();
  const [open, setOpen] = useState(
    location?.state?.openSnackbar ? true : false
  );
  const { bookId } = useParams();

  const { data, loading } = useQuery(GET_BOOK_BY_ID, {
    variables: { id: bookId },
  });

  useEffect(() => {
    setBook(data?.findOneBook);
    setComments(data?.findOneBook.reviews);
  }, [data]);

  return (
    <Grid
      container
      minHeight={"100vh"}
      display="flex"
      justifyContent="center"
      alignItems="center"
      p={1}
    >
      {book && <BookCard book={book} width={"100%"} height={"auto"} lg={3} />}
      <Grid item xs={12}></Grid>
      <Grid item xs={12} lg={4} pt={2}>
        <CreateBookComment bookId={book?.id} />
      </Grid>
      <Grid item xs={12}></Grid>
      <Grid item xs={12} lg={4}>
        <Typography textAlign="center" variant="h4" color={"#e1ebf3"}>
          Comentários:
        </Typography>
        {comments?.length ? (
          comments?.map((comment) => (
            <BookComment key={comment.id} comment={comment} />
          ))
        ) : (
          <Typography textAlign="center" variant="h5" color={"#e1ebf3"}>
            Ainda não há comentários
          </Typography>
        )}
      </Grid>

      <BackDrop open={loading} />
      <Snackbar
        message={"Livro atualizado com sucesso"}
        open={open}
        setOpen={setOpen}
      />
    </Grid>
  );
}
