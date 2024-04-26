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
  GET_ONE_CHECKOUT_OR_RENTED,
  CREATE_CHECKOUT_ORDER,
  DELETE_BOOK,
  CREATE_FAVORITE,
  GET_FAVORITE,
  REMOVE_FAVORITE,
  GET_CHECKOUT,
} from "../../../service";
import { useEffect, useState } from "react";
import { BackDrop } from "../../Utils";
import { useMutation, useQuery } from "@apollo/client";

export default function BookCard(props) {
  const [isFavorite, setIsFavorite] = useState();
  const [isOrdered, setIsOrdered] = useState(false);
  const { book } = props;
  const { user, setUser } = useAuth();
  const { bookId } = useParams();
  const navigate = useNavigate();

  const getOneCheckout = useQuery(GET_ONE_CHECKOUT_OR_RENTED, {
    variables: { bookId: `${book.id}` },
  });

  const [createCheckoutOrder, createCheckout] = useMutation(
    CREATE_CHECKOUT_ORDER,
    { refetchQueries: [GET_ONE_CHECKOUT_OR_RENTED, GET_CHECKOUT] }
  );

  const [createFavoriteFn, createFavorite] = useMutation(CREATE_FAVORITE);

  const [removeFavoriteFn, removeFavorite] = useMutation(REMOVE_FAVORITE);

  const [deleteBookFn, deleteBook] = useMutation(DELETE_BOOK);

  const getFavorites = useQuery(GET_FAVORITE, {
    variables: { bookId: book?.id },
  });

  const handleDelete = async () => {
    await deleteBookFn({ variables: { id: book.id } });
    if (!deleteBook.error) navigate("/book", { state: { openSnackbar: true } });
  };

  const addCheckout = async (book_id) => {
    await createCheckoutOrder({ variables: { bookId: book_id } });
    if (!createCheckout.error) {
      setIsOrdered(true);
      setUser((prevUser) => {
        return { ...prevUser, checkout: ++prevUser.checkout };
      });
    }
  };

  const addFavorite = async (book_id) => {
    await createFavoriteFn({ variables: { bookId: book_id } });
    if (!createFavorite.error) {
      setIsFavorite(true);
    }
  };

  const deleteFavorite = async (book_id) => {
    await removeFavoriteFn({ variables: { bookId: book_id } });
    if (!removeFavorite.error) {
      setIsFavorite(false);
    }
  };

  const handleRedirect = () => {
    navigate("/login");
  };

  useEffect(() => {
    const fetchFavorite = async (book_id) => {
      if (book_id && !getFavorites.data) {
        return getFavorites.refetch();
      }

      if (!getFavorites.error) {
        setIsFavorite(getFavorites.data.getFavoriteByUserAndBookId);
      }
    };

    fetchFavorite(book?.id);
  }, [book, getFavorites?.data]);

  useEffect(() => {
    if (getOneCheckout?.data?.listRentedOrCheckout.length) setIsOrdered(true);
  }, [book, getOneCheckout.data]);

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
              onClick={() => deleteFavorite(book?.id)}
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
              {(user?.id == book.user.id || user?.isAdmin) && (
                <Button>
                  <Link
                    style={{ color: "darkolivegreen" }}
                    to={`/book/update/${book?.id}`}
                  >
                    Editar
                  </Link>
                </Button>
              )}
              {(user?.id == book.user.id || user?.isAdmin) && (
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
      <BackDrop
        open={
          getOneCheckout.loading ||
          createCheckout.loading ||
          getFavorites.loading
        }
      />
    </Grid>
  );
}
