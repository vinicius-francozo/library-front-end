import { Grid } from "@mui/material";
import { AuthorCard } from "../components";
import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAuthor } from "../../../service";
import { BackDrop, Snackbar } from "../../Utils";

export default function ShowAuthor() {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [author, setAuthor] = useState();
  const [open, setOpen] = useState(
    location?.state?.openSnackbar ? true : false
  );
  const { authorId } = useParams();

  useEffect(() => {
    const fetchAuthor = async () => {
      try {
        setLoading(true);
        const response = await getAuthor(authorId);
        setAuthor(response?.authors);
      } catch (err) {
        return err;
      } finally {
        setLoading(false);
      }
    };
    fetchAuthor();
  }, []);

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
