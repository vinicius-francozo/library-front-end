import {
  Button,
  Grid,
  Select,
  MenuItem,
  TextField,
  FormControl,
  InputLabel,
  FormHelperText,
  IconButton,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import schema from "./schema";
import "./BookForm.css";
import { useEffect, useState } from "react";
import {
  CREATE_BOOK,
  GET_AUTHORS,
  GET_BOOKS,
  GET_BOOKS_PAGINATED,
  GET_BOOK_BY_ID,
  GET_CATEGORIES,
  UPDATE_BOOK,
} from "../../../../service";
import { BackDrop, Snackbar } from "../../../Utils";
import { useNavigate } from "react-router-dom";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { BookFormDialog } from ".";
import { useMutation, useQuery } from "@apollo/client";

export default function BookForm({ book, method = "POST" }) {
  const [open, setOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [authorsArray, setAuthorsArray] = useState();
  const [categoriesArray, setCategoriesArray] = useState();
  const [author, setAuthor] = useState(book?.author?.id || "");
  const [category, setCategory] = useState(book?.category?.id || "");

  const getCategory = useQuery(GET_CATEGORIES);
  const getAuthors = useQuery(GET_AUTHORS);
  const [createBookFn, createBook] = useMutation(CREATE_BOOK, {
    refetchQueries: [GET_BOOKS_PAGINATED, GET_BOOKS],
  });
  const [updateBookFn, updateBook] = useMutation(UPDATE_BOOK, {
    refetchQueries: [GET_BOOK_BY_ID],
  });

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (bookData) => {
    if (typeof bookData.cover !== "string") {
      bookData.cover = bookData.cover[0];
    } else {
      delete bookData.cover;
      delete bookData.reviews;
    }
    try {
      setLoading(true);
      if (method === "POST") {
        await createBookFn({ variables: { ...bookData } });
        if (createBook.error) throw new Error();
        navigate("/book", { state: { openSnackbar: true } });
      } else {
        await updateBookFn({
          variables: {
            id: book.id,
            ...bookData,
          },
        });
        if (updateBook.error) throw new Error();
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
        if (key == "release_date") {
          setValue(key, getDate());
        } else if (key != "author" && key != "category") {
          setValue(key, value);
        } else {
          setValue(`${key}_id`, value.id);
        }
      }
    }
  }, [author, book]);

  useEffect(() => {
    const fetchCategories = async () => {
      setCategoriesArray(getCategory.data?.findAllCategories);
    };

    const fetchAuthors = async () => {
      setAuthorsArray(getAuthors.data?.findAllAuthors);
    };

    fetchCategories();
    fetchAuthors();
  }, [getCategory.data, getAuthors.data]);

  const getDate = () => {
    if (book) {
      const date = new Date(book?.release_date).toJSON().slice(0, 10);
      return date;
    }
  };

  return (
    <>
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
                  setValue("author_id", e.target.value);
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
              {errors.author_id?.message && (
                <FormHelperText>{errors.author_id?.message}</FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12} lg={6} display="flex" alignItems="center">
            <FormControl fullWidth>
              <InputLabel id="category">Categoria</InputLabel>
              <Select
                labelId="category"
                label="Categoria"
                id="category"
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                  setValue("category_id", e.target.value);
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
              {errors.category_id?.message && (
                <FormHelperText>{errors.category_id?.message}</FormHelperText>
              )}
            </FormControl>
            <IconButton
              size="large"
              onClick={() => {
                setOpenDialog(true);
              }}
            >
              <AddCircleOutlineIcon sx={{ fontSize: 32 }} />
            </IconButton>
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
              id="release_date"
              label="Data de lançamento"
              InputLabelProps={{ shrink: true }}
              sx={{
                backgroundColor: "#dbb376",
                borderRadius: 2,
                minWidth: "100%",
              }}
              variant="filled"
              helperText={errors.release_date?.message || ""}
              {...register("release_date")}
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
        <Snackbar
          message={"Ocorreu algum erro"}
          open={open}
          setOpen={setOpen}
        />
        <BackDrop open={loading} />
      </form>
      <BookFormDialog open={openDialog} setOpen={setOpenDialog} />
    </>
  );
}
