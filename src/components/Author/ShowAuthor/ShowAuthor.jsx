import { Grid } from "@mui/material";
import { AuthorCard } from "../components";
import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { GET_AUTHOR_BY_ID } from "../../../service";
import { BackDrop, Snackbar } from "../../Utils";
import { useQuery } from "@apollo/client";

export default function ShowAuthor() {
  const location = useLocation();
  const [author, setAuthor] = useState();
  const [open, setOpen] = useState(
    location?.state?.openSnackbar ? true : false
  );
  const { authorId } = useParams();

  const { data, loading } = useQuery(GET_AUTHOR_BY_ID, {
    variables: { id: authorId },
  });

  useEffect(() => {
    setAuthor(data?.findOneAuthor);
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
      {author && (
        <AuthorCard author={author} width={"100%"} height={"auto"} lg={3} />
      )}
      <BackDrop open={loading} />
      <Snackbar
        message={"Autor atualizado com sucesso"}
        open={open}
        setOpen={setOpen}
      />
    </Grid>
  );
}
