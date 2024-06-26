import {
  Box,
  Rating,
  TextField,
  Typography,
  Button,
  FormHelperText,
} from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import schema from "./schema";
import { createReview } from "../../../../../service";
import { useNavigate } from "react-router-dom";
import { BackDrop } from "../../../../Utils";
import { useAuth } from "../../../../../context";

export default function CreateBookComment({ bookId }) {
  const [rating, setRating] = useState();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const { user } = useAuth();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await createReview(data, bookId);
      navigate(0);
    } catch (err) {
      return err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: "white",
        p: 2,
        borderRadius: 1,
        lineBreak: "anywhere",
        mb: 2,
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="subtitle2">{user?.username}</Typography>
        <TextField
          fullWidth
          helperText={errors.text?.message || ""}
          {...register("text")}
        />

        <Rating
          sx={{ mt: 2, alignItems: "bottom", verticalAlign: "sub" }}
          name="simple-controlled"
          value={rating}
          onChange={(event, newValue) => {
            setRating(newValue);
            setValue("rate", newValue);
          }}
        />
        {errors.rating?.message && (
          <FormHelperText sx={{ ml: 2, mb: 1 }}>
            {errors.rating.message}
          </FormHelperText>
        )}
        <Box>
          <Button type="submit" variant="contained">
            Comentar
          </Button>
        </Box>
      </form>
      <BackDrop open={loading} />
    </Box>
  );
}
