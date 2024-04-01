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
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useEffect, useState } from "react";
import { getFavorites, unfavorite } from "../../../service";
import { BackDrop } from "../../Utils";

export default function UserFavorites() {
  const matches = useMediaQuery("(max-width:600px)");
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState();

  const removeFavorite = async (bookId) => {
    try {
      setLoading(true);
      await unfavorite(bookId);
      fetchFavorites();
    } catch (err) {
      return err;
    } finally {
      setLoading(false);
    }
  };

  const fetchFavorites = async () => {
    try {
      setLoading(true);
      const response = await getFavorites();
      setFavorites(response.favorites);
    } catch (err) {
      return err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFavorites();
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
              Livros Favoritos
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          {!favorites?.length ? (
            <Typography
              pl={2}
              variant="overline"
              fontSize={24}
              color={"rgba(103, 102, 95, 0.932)"}
            >
              Não há livros no momento!
            </Typography>
          ) : (
            favorites?.map((book) => (
              <Grid
                item
                key={book?.id}
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
                    image={book?.Book.cover}
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
                        {book?.Book.title}
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        color="text.secondary"
                        component="div"
                        textOverflow="ellipsis"
                        whiteSpace="nowrap"
                        overflow="hidden"
                      >
                        {book?.Book.Author?.name}
                      </Typography>
                      <Box
                        sx={{
                          display: matches ? "flex" : "none",
                          alignItems: "center",
                          mt: 1,
                        }}
                      >
                        <Button
                          onClick={() => removeFavorite(book.Book.id)}
                          color="success"
                        >
                          Desfavoritar
                        </Button>
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
                    <Button
                      onClick={() => removeFavorite(book.Book.id)}
                      color="success"
                    >
                      Desfavoritar
                    </Button>
                  </Box>
                </Card>
              </Grid>
            ))
          )}
        </Grid>
      </Paper>
      <BackDrop open={loading} />
    </Container>
  );
}
