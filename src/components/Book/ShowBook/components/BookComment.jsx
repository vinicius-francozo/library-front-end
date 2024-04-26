import { Button, Grid, Rating, Typography } from "@mui/material";
import { useAuth } from "../../../../context";
import { useRef, useState } from "react";
import { DELETE_REVIEW, UPDATE_REVIEW } from "../../../../service";
import { useNavigate } from "react-router-dom";
import { BackDrop } from "../../../Utils";
import "./BookComment.css";
import { useMutation } from "@apollo/client";

export default function BookComment({ comment }) {
  const [updating, setUpdating] = useState(false);
  const [rating, setRating] = useState();
  const typoRef = useRef();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [updateReview, { loading }] = useMutation(UPDATE_REVIEW);
  const [deleteReview] = useMutation(DELETE_REVIEW);

  const handleDelete = async (reviewId) => {
    await deleteReview({ variables: { reviewId: `${reviewId}` } });
    navigate(0);
  };

  const handleUpdate = async (reviewId) => {
    try {
      if (!updating) {
        setUpdating((prev) => !prev);
      } else {
        await updateReview({
          variables: {
            reviewId,
            text: typoRef.current.textContent,
            rate: rating || comment?.rate,
          },
        });
        setUpdating((prev) => !prev);
      }
    } catch (err) {
      return err;
    }
  };

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
        <Typography
          suppressContentEditableWarning={true}
          contentEditable={updating}
          ref={typoRef}
          className={updating ? "BookComment" : ""}
        >
          {comment?.text || "texto do comentário"}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Rating
          sx={{ mt: 2 }}
          readOnly={!updating}
          name="simple-controlled"
          value={rating || comment?.rate}
          onChange={(event, newValue) => {
            setRating(newValue);
          }}
        />
      </Grid>
      {(user?.id === comment?.user.id || user?.isAdmin) && (
        <Grid item>
          <Button
            color="error"
            variant="contained"
            onClick={() => handleDelete(comment?.id)}
          >
            Excluir
          </Button>
        </Grid>
      )}
      {user?.id === comment?.user.id && (
        <Grid item ml={2}>
          <Button
            color={updating ? "success" : "info"}
            variant="contained"
            onClick={() => handleUpdate(comment?.id)}
          >
            {updating ? "Confirmar" : "Atualizar"}
          </Button>
        </Grid>
      )}
      <BackDrop open={loading} />
    </Grid>
  );
}
