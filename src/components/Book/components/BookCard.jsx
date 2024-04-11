import {
  Card,
  CardHeader,
  CardMedia,
  CardActions,
  CardContent,
  IconButton,
  Typography,
  Grid,
  Button,
  Divider,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../../context";
import {
  createCheckoutOrder,
  deleteBook,
  favorite,
  getFavorite,
  getOneCheckout,
  unfavorite,
} from "../../../service";
import { useEffect, useState } from "react";
import { BackDrop } from "../../Utils";

export default function BookCard(props) {
  const [loading, setLoading] = useState(false);
  const [isFavorite, setIsFavorite] = useState();
  const [isOrdered, setIsOrdered] = useState(false);
  const { book } = props;
  const { user, setUser } = useAuth();
  const { bookId } = useParams();
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await deleteBook(book.id);
      navigate("/book", { state: { openSnackbar: true } });
    } catch (err) {
      return err;
    }
  };

  const addCheckout = async (book_id) => {
    try {
      await createCheckoutOrder(book_id);
      setIsOrdered(true);
      setUser((prevUser) => {
        return { ...prevUser, checkout: ++prevUser.checkout };
      });
    } catch (err) {
      return err;
    }
  };

  const addFavorite = async (book_id) => {
    try {
      await favorite(book_id);
      setIsFavorite(true);
    } catch (err) {
      return err;
    }
  };

  const removeFavorite = async (book_id) => {
    try {
      await unfavorite(book_id);
      setIsFavorite(false);
    } catch (err) {
      return err;
    }
  };

  const handleRedirect = () => {
    navigate("/login");
  };

  useEffect(() => {
    const fetchFavorite = async (book_id) => {
      try {
        setLoading(true);
        const response = await getFavorite(book_id);
        if (response?.favorites) setIsFavorite(true);
      } catch (err) {
        return err;
      } finally {
        setLoading(false);
      }
    };

    fetchFavorite(book?.id);
  }, [book]);

  useEffect(() => {
    const fetchCheckout = async (book_id) => {
      const response = await getOneCheckout(book_id);
      if (response?.rents) setIsOrdered(true);
    };

    fetchCheckout(book?.id);
  }, []);

  return (
    <Grid item xs={12} lg={props.lg || 3}>
      <Card
        sx={{
          maxWidth: props.width || 345,
          backgroundColor: "#cdcf81d6",
        }}
      >
        <CardHeader
          title={book?.title}
          subheader={`${book?.author?.name || "Desconhecido"} ${book?.author?.surname || ""} - ${book?.category?.name || "Desconhecido"} - ${new Date(book?.release_date).toLocaleDateString()}`}
          sx={{
            "& div": {
              width: "100%",
              "& span": {
                textOverflow: "ellipsis",
                overflow: "hidden",
                whiteSpace: "nowrap",
              },
            },
          }}
        />
        <CardMedia
          component="img"
          height={props.height || "194"}
          image={book?.cover}
          alt="book cover"
        />
        <CardContent>
          <Typography
            variant="body2"
            color="text.secondary"
            textOverflow="ellipsis"
            whiteSpace="nowrap"
            overflow="hidden"
          >
            {book?.sinopsis}
          </Typography>
          {bookId && (
            <>
              <Divider>Informações do livro</Divider>
              <Typography
                variant="body2"
                color="text.secondary"
                textOverflow="ellipsis"
                whiteSpace="nowrap"
                overflow="hidden"
              >
                {`Páginas: ${book?.pages}`}
                <br />
                {`Editora: ${book?.publisher}`}
                <br />
                {`Edição: ${book?.edition}`}
              </Typography>
            </>
          )}
        </CardContent>
        <CardActions disableSpacing>
          {!user ? (
            <IconButton aria-label="login to favorite" onClick={handleRedirect}>
              <FavoriteBorderIcon />
            </IconButton>
          ) : isFavorite ? (
            <IconButton
              aria-label="remove from favorites"
              onClick={() => removeFavorite(book?.id)}
            >
              <FavoriteIcon />
            </IconButton>
          ) : (
            <IconButton
              aria-label="add to favorites"
              onClick={() => addFavorite(book?.id)}
            >
              <FavoriteBorderIcon />
            </IconButton>
          )}
          {!user ? (
            <IconButton onClick={handleRedirect}>
              <AddShoppingCartIcon />
            </IconButton>
          ) : (
            <IconButton
              onClick={() => addCheckout(book?.id)}
              disabled={isOrdered}
            >
              <AddShoppingCartIcon />
            </IconButton>
          )}
          {props.seeMore ? (
            <Button>
              <Link
                style={{ color: "darkolivegreen" }}
                to={`/book/show/${book?.id}`}
              >
                Ver Mais
              </Link>
            </Button>
          ) : (
            <>
              {user?.id === book.user_id && (
                <Button>
                  <Link
                    style={{ color: "darkolivegreen" }}
                    to={`/book/update/${book?.id}`}
                  >
                    Editar
                  </Link>
                </Button>
              )}
              {user?.id === book.user_id && (
                <Button
                  sx={{
                    color: "darkolivegreen",
                    textDecoration: "underline !important",
                  }}
                  onClick={handleDelete}
                >
                  Excluir
                </Button>
              )}
              <Button>
                <Link style={{ color: "darkolivegreen" }} to="/book">
                  Voltar
                </Link>
              </Button>
            </>
          )}
        </CardActions>
      </Card>
      <BackDrop open={loading} />
    </Grid>
  );
}
