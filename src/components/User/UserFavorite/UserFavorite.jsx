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
import { GET_FAVORITES, REMOVE_FAVORITE } from "../../../service";
import { BackDrop } from "../../Utils";
import { useMutation, useQuery } from "@apollo/client";

export default function UserFavorites() {
  const matches = useMediaQuery("(max-width:600px)");
  const [favorites, setFavorites] = useState();

  const getFavorites = useQuery(GET_FAVORITES);
  const [removeFavoritefn, removeFavorite] = useMutation(REMOVE_FAVORITE, {
    refetchQueries: [GET_FAVORITES],
  });

  const deleteFavorite = async (bookId) => {
    await removeFavoritefn({ variables: { bookId: bookId } });
    fetchFavorites();
  };

  const fetchFavorites = async () => {
    setFavorites(getFavorites?.data.getUserFavorites);
  };

  useEffect(() => {
    fetchFavorites();
  }, [getFavorites?.data]);

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
            favorites?.map((favorite) => (
              <Grid
                item
                key={favorite?.id}
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
                    image={favorite?.book.cover}
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
                        {favorite?.book.title}
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        color="text.secondary"
                        component="div"
                        textOverflow="ellipsis"
                        whiteSpace="nowrap"
                        overflow="hidden"
                      >
                        {favorite?.book.author?.name}
                      </Typography>
                      <Box
                        sx={{
                          display: matches ? "flex" : "none",
                          alignItems: "center",
                          mt: 1,
                        }}
                      >
                        <Button
                          onClick={() => deleteFavorite(favorite.book.id)}
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
                      onClick={() => deleteFavorite(favorite.book.id)}
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
      <BackDrop open={getFavorites.loading || removeFavorite.loading} />
    </Container>
  );
}
