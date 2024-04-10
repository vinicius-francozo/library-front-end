import { Button, Grid, Rating, Typography } from "@mui/material";
import { useAuth } from "../../../../context";
import { useState } from "react";
import { deleteReview } from "../../../../service";
import { useNavigate } from "react-router-dom";
import { BackDrop } from "../../../Utils";

export default function BookComment({ comment }) {
  const [loading, setLoading] = useState();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleDelete = async (reviewId) => {
    try {
      setLoading(true);
      await deleteReview(reviewId);
      navigate(0);
    } catch (err) {
      return err;
    } finally {
      setLoading(false);
    }
  };

  console.log(comment, user);

  return (
    <Grid
      container
      sx={{
        backgroundColor: "white",
        p: 2,
        borderRadius: 1,
        lineBreak: "anywhere",
        mb: 2,
      }}
    >
      <Grid item xs={12}>
        <Typography variant="subtitle2">
          {comment?.user?.username || "Autor do comentário"}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography>{comment?.text || "texto do mentário"}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Rating
          sx={{ mt: 2 }}
          readOnly
          name="simple-controlled"
          value={comment?.rate}
        />
      </Grid>
      {(user?.id === comment?.user_id || user?.isAdmin) && (
        <Grid item xs={12}>
          <Button
            color="error"
            variant="contained"
            onClick={() => handleDelete(comment?.id)}
          >
            Excluir
          </Button>
        </Grid>
      )}
      <BackDrop open={loading} />
    </Grid>
  );
}
