import { Button, Grid, TextField, FormHelperText } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import schema from "./schema";
import "./AuthorForm.css";
import { useEffect, useState } from "react";
import { createAuthor, updateAuthor } from "../../../../service";
import { useNavigate } from "react-router-dom";
import { BackDrop, Snackbar } from "../../../Utils";

export default function AuthorForm({ author, method = "POST" }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    const formData = new FormData();
    for (const item of Object.entries(data)) {
      if (item[0] !== "picture") {
        formData.append(item[0], item[1]);
      }
    }
    formData.append(
      "image",
      typeof data.picture === "string" ? data.picture : data.picture[0]
    );

    try {
      setLoading(true);
      if (method === "POST") {
        await createAuthor(formData);
        navigate("/author", { state: { openSnackbar: true } });
      } else {
        await updateAuthor(author.id, formData);
        navigate(`/author/show/${author.id}`, {
          state: { openSnackbar: true },
        });
      }
    } catch (err) {
      setOpen(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (author) {
      for (const [key, value] of Object.entries(author)) {
        if (key == "birth_date") {
          setValue(key, getDate());
        } else {
          setValue(key, value);
        }
      }
    }
  }, []);

  const getDate = () => {
    if (author) {
      const date = new Date(author?.birth_date).toJSON().slice(0, 10);
      return date;
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            id="name"
            label="Nome"
            sx={{
              backgroundColor: "#dbb376",
              borderRadius: 2,
              minWidth: "100%",
            }}
            variant="filled"
            helperText={errors.name?.message || ""}
            {...register("name")}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="surname"
            label="Sobrenome"
            sx={{
              backgroundColor: "#dbb376",
              borderRadius: 2,
              minWidth: "100%",
            }}
            variant="filled"
            helperText={errors.surname?.message || ""}
            {...register("surname")}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="description"
            label="Descrição"
            multiline
            rows={4}
            variant="filled"
            sx={{
              backgroundColor: "#dbb376",
              borderRadius: 2,
              minWidth: "100%",
            }}
            helperText={errors.description?.message || ""}
            {...register("description")}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <TextField
            id="country"
            label="País"
            sx={{
              backgroundColor: "#dbb376",
              borderRadius: 2,
              minWidth: "100%",
            }}
            variant="filled"
            helperText={errors.country?.message || ""}
            {...register("country")}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <TextField
            type="date"
            id="birth_date"
            label="Data de nascimento"
            InputLabelProps={{ shrink: true }}
            sx={{
              backgroundColor: "#dbb376",
              borderRadius: 2,
              minWidth: "100%",
            }}
            variant="filled"
            helperText={errors.birth_date?.message || ""}
            {...register("birth_date")}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <Button
            className="FileButton"
            component="label"
            role={undefined}
            size="large"
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
            sx={{
              backgroundColor: "#dbb376",
              borderRadius: 2,
              minWidth: "100%",
              minHeight: "100%",
              color: "rgba(0, 0, 0, 0.6)",
            }}
          >
            Retrato
            <input hidden type="file" {...register("picture")} />
          </Button>
          {errors.picture?.message && (
            <FormHelperText>{errors.picture?.message}</FormHelperText>
          )}
        </Grid>
        <Grid item xs={6} lg={3}>
          <Button
            sx={{
              borderRadius: 20,
              width: "100%",
              height: 50,
            }}
            size="large"
            variant="contained"
            type="submit"
          >
            {author ? "Atualizar" : "Criar"}
          </Button>
        </Grid>
      </Grid>
      <Snackbar message={"Ocorreu algum erro"} open={open} setOpen={setOpen} />
      <BackDrop open={loading} />
    </form>
  );
}
