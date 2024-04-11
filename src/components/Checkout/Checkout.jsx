import {
  Container,
  Divider,
  Grid,
  Paper,
  Typography,
  Card,
  Box,
  CardContent,
  CardMedia,
  Button,
  IconButton,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useEffect, useState } from "react";
import {
  deleteFromCheckout,
  getCheckout,
  confirmPurchase,
} from "../../service";
import { BackDrop, Snackbar } from "../Utils";
import { useAuth } from "../../context";

export default function Checkout() {
  const matches = useMediaQuery("(max-width:600px)");
  const [cart, setCart] = useState();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { setUser } = useAuth();

  const fetchCheckout = async () => {
    try {
      setLoading(true);
      const response = await getCheckout();
      setCart(response.rents);
    } catch (err) {
      return err;
    } finally {
      setLoading(false);
    }
  };

  const removeItem = async (id) => {
    try {
      setLoading(true);
      await deleteFromCheckout(id);
      setUser((prevUser) => {
        return { ...prevUser, checkout: --prevUser.checkout };
      });
      fetchCheckout();
    } catch (err) {
      return err;
    } finally {
      setLoading(false);
    }
  };

  const confirmBookPurchase = async (id) => {
    try {
      setLoading(true);
      await confirmPurchase(id);
      setUser((prevUser) => {
        return { ...prevUser, checkout: --prevUser.checkout };
      });
      setOpen(true);
      fetchCheckout();
    } catch (err) {
      return err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCheckout();
  }, []);

  return (
    <Container
      maxWidth={"lg"}
      sx={{
        p: 3,
        minHeight: "100vh",
        height: "fit-content",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Paper
        elevation={20}
        sx={{
          backgroundColor: "rgba(201, 190, 129, 0.932) !important",
          borderRadius: 2,
          width: "100%",
          height: "100%",
          alignSelf: "center",
        }}
      >
        <Grid container>
          <Grid item>
            <Typography
              p={2}
              variant="overline"
              fontSize={24}
              color={"rgba(103, 102, 95, 0.932)"}
            >
              Checkout
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            <Typography
              p={2}
              variant="overline"
              fontSize={24}
              color={"rgba(103, 102, 95, 0.932)"}
            >
              Livros no carrinho:
            </Typography>
          </Grid>
          {!cart?.length ? (
            <Typography
              pl={2}
              variant="overline"
              fontSize={24}
              color={"rgba(103, 102, 95, 0.932)"}
            >
              Não há livros no momento!
            </Typography>
          ) : (
            cart?.map((book) => (
              <Grid
                item
                key={book?.book.id}
                xs={12}
                sx={{
                  backgroundColor: "whitesmoke",
                  borderRadius: 1,
                  margin: 2,
                  p: 2,
                  width: "fill-available",
                }}
              >
                <Card sx={{ display: "flex" }}>
                  <CardMedia
                    component="img"
                    sx={{ width: 80 }}
                    image={book?.book.cover}
                    alt="Live from space album cover"
                  />
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      width: "70%",
                    }}
                  >
                    <CardContent sx={{ flex: "1 0 auto" }}>
                      <Typography
                        component="div"
                        variant="h5"
                        textOverflow="ellipsis"
                        whiteSpace="nowrap"
                        overflow="hidden"
                      >
                        {book?.book.title}
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        color="text.secondary"
                        component="div"
                        textOverflow="ellipsis"
                        whiteSpace="nowrap"
                        overflow="hidden"
                      >
                        {book?.book.author?.name}
                      </Typography>
                      <Typography
                        textOverflow="ellipsis"
                        whiteSpace="nowrap"
                        overflow="hidden"
                      >
                        {book?.book.sinopsis}
                      </Typography>
                      <Box
                        sx={{
                          display: matches ? "flex" : "none",
                          alignItems: "center",
                          ml: "auto",
                        }}
                      >
                        <IconButton onClick={() => removeItem(book.id)}>
                          <DeleteOutlineIcon color="error" />
                        </IconButton>
                      </Box>
                    </CardContent>
                  </Box>
                  <Box
                    sx={{
                      display: matches ? "none" : "flex",
                      alignItems: "center",
                      ml: "auto",
                    }}
                  >
                    <IconButton onClick={() => removeItem(book.id)}>
                      <DeleteOutlineIcon color="error" />
                    </IconButton>
                  </Box>
                </Card>
              </Grid>
            ))
          )}
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        {cart?.length > 0 && (
          <>
            <Grid item xs={12}>
              <Typography
                p={2}
                variant="overline"
                fontSize={24}
                color={"rgba(103, 102, 95, 0.932)"}
              >
                Total:
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography
                variant="overline"
                pl={2}
                fontSize={24}
                color={"rgba(103, 102, 95, 0.932)"}
                sx={{ verticalAlign: "sub" }}
              >
                {`R$ ${cart?.length}0.00`}
              </Typography>
              <Button
                sx={{ m: 2 }}
                variant="contained"
                color="success"
                onClick={confirmBookPurchase}
              >
                Finalizar Transação
              </Button>
            </Grid>
          </>
        )}
      </Paper>
      <BackDrop open={loading} />
      <Snackbar
        message={"Livros alugados com sucesso! confira em Meus Livros"}
        open={open}
        setOpen={setOpen}
      />
    </Container>
  );
}
