import {
  Button,
  Grid,
  Select,
  MenuItem,
  TextField,
  FormControl,
  InputLabel,
  FormHelperText,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import schema from "./schema";
import "./BookForm.css";
import { useEffect, useState } from "react";
import {
  createBook,
  getAuthors,
  getCategories,
  updateBook,
} from "../../../../service";
import { BackDrop, Snackbar } from "../../../Utils";
import { useNavigate } from "react-router-dom";

export default function BookForm({ book, method = "POST" }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [authorsArray, setAuthorsArray] = useState();
  const [categoriesArray, setCategoriesArray] = useState();
  const [author, setAuthor] = useState(book?.authorId || "");
  const [category, setCategory] = useState(book?.categoryId || "");

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    const formData = new FormData();
    for (const item of Object.entries(data)) {
      if (item[0] !== "cover") {
        formData.append(item[0], item[1]);
      }
    }
    formData.append(
      "image",
      typeof data.cover === "string" ? data.cover : data.cover[0]
    );

    try {
      setLoading(true);
      if (method === "POST") {
        await createBook(formData);
        navigate("/book", { state: { openSnackbar: true } });
      } else {
        await updateBook(book.id, formData);
        navigate(`/book/show/${book.id}`, {
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
    if (book) {
      for (const [key, value] of Object.entries(book)) {
        if (key == "releaseDate") {
          setValue(key, getDate());
        } else if (key != "authorId" && key != "categoryId") {
          setValue(key, value);
        } else {
          setValue(key, value);
        }
      }
    }
  }, [author, book]);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await getCategories();
      setCategoriesArray(response.categories);
    };

    const fetchAuthors = async () => {
      const response = await getAuthors();
      setAuthorsArray(response.authors);
    };

    try {
      setLoading(true);
      fetchCategories();
      fetchAuthors();
    } catch (err) {
      return err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getDate = () => {
    if (book) {
      const date = new Date(book?.releaseDate).toJSON().slice(0, 10);
      return date;
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2} height="auto">
        <Grid item xs={12}>
          <TextField
            id="title"
            label="Título"
            sx={{
              backgroundColor: "#dbb376",
              borderRadius: 2,
              minWidth: "100%",
            }}
            variant="filled"
            helperText={errors.title?.message || ""}
            {...register("title")}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <FormControl fullWidth>
            <InputLabel id="author">Autor</InputLabel>
            <Select
              labelId="author"
              label="Autor"
              id="author"
              value={author}
              onChange={(e) => {
                setAuthor(e.target.value);
                setValue("authorId", e.target.value);
              }}
              sx={{
                backgroundColor: "#dbb376",
                minWidth: "100%",
                borderRadius: 2,
              }}
            >
              {authorsArray &&
                authorsArray.map((author) => (
                  <MenuItem key={author.id} value={author.id}>
                    {author.name}
                  </MenuItem>
                ))}
            </Select>
            {errors.author?.message && (
              <FormHelperText>{errors.author?.message}</FormHelperText>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12} lg={6}>
          <FormControl fullWidth>
            <InputLabel id="category">Categoria</InputLabel>
            <Select
              labelId="category"
              label="Categoria"
              id="category"
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setValue("categoryId", e.target.value);
              }}
              sx={{
                backgroundColor: "#dbb376",
                minWidth: "100%",
                borderRadius: 2,
              }}
            >
              {categoriesArray &&
                categoriesArray.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
            </Select>
            {errors.category?.message && (
              <FormHelperText>{errors.category?.message}</FormHelperText>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12} lg={6}>
          <TextField
            type="number"
            id="pages"
            label="Nº de páginas"
            sx={{
              backgroundColor: "#dbb376",
              borderRadius: 2,
              minWidth: "100%",
            }}
            variant="filled"
            helperText={errors.pages?.message || ""}
            {...register("pages")}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <TextField
            id="publisher"
            label="Editora"
            sx={{
              backgroundColor: "#dbb376",
              borderRadius: 2,
              minWidth: "100%",
            }}
            variant="filled"
            helperText={errors.publisher?.message || ""}
            {...register("publisher")}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="sinopsis"
            label="Sinópse"
            multiline
            rows={4}
            variant="filled"
            sx={{
              backgroundColor: "#dbb376",
              borderRadius: 2,
              minWidth: "100%",
            }}
            helperText={errors.sinopsis?.message || ""}
            {...register("sinopsis")}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <TextField
            id="edition"
            label="Edição"
            sx={{
              backgroundColor: "#dbb376",
              borderRadius: 2,
              minWidth: "100%",
            }}
            variant="filled"
            helperText={errors.edition?.message || ""}
            {...register("edition")}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <TextField
            type="date"
            id="releaseDate"
            label="Data de lançamento"
            InputLabelProps={{ shrink: true }}
            sx={{
              backgroundColor: "#dbb376",
              borderRadius: 2,
              minWidth: "100%",
            }}
            variant="filled"
            helperText={errors.releaseDate?.message || ""}
            {...register("releaseDate")}
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
            Capa do livro
            <input hidden type="file" {...register("cover")} />
          </Button>
          {errors.cover?.message && (
            <FormHelperText>{errors.cover?.message}</FormHelperText>
          )}
        </Grid>
        <Grid item xs={5} lg={3}>
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
            {book ? "Atualizar" : "Criar"}
          </Button>
        </Grid>
      </Grid>
      <Snackbar message={"Ocorreu algum erro"} open={open} setOpen={setOpen} />
      <BackDrop open={loading} />
    </form>
  );
}
