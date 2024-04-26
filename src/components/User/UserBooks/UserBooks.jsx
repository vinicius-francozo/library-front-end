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
import { useState, useEffect } from "react";
import { GET_RENTALS, RETURN_BOOK } from "../../../service";
import { BackDrop } from "../../Utils";
import { useMutation, useQuery } from "@apollo/client";

export default function UserBooks() {
  const matches = useMediaQuery("(max-width:600px)");
  const [rents, setRents] = useState();

  const listRentals = useQuery(GET_RENTALS);
  const [returnBook, { loading }] = useMutation(RETURN_BOOK);

  const returnRental = async (id) => {
    await returnBook({ variables: { rentId: id } });
    fetchRentals();
  };

  const fetchRentals = async () => {
    await listRentals.refetch();
    setRents(listRentals?.data?.listRents);
  };

  useEffect(() => {
    fetchRentals();
  }, [listRentals.data]);

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
              Meus Livros
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          {!rents?.length ? (
            <Typography
              pl={2}
              variant="overline"
              fontSize={24}
              color={"rgba(103, 102, 95, 0.932)"}
            >
              Não há livros no momento!
            </Typography>
          ) : (
            rents?.map((rent) => (
              <Grid
                item
                key={rent.id}
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
                    image={rent.book.cover}
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
                        {rent.book.title}
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        color="text.secondary"
                        component="div"
                        textOverflow="ellipsis"
                        whiteSpace="nowrap"
                        overflow="hidden"
                      >
                        {rent.book.author?.name}
                      </Typography>
                      <Typography
                        textOverflow="ellipsis"
                        whiteSpace="nowrap"
                        overflow="hidden"
                      >
                        Devolver em: {matches ? "10d" : "10 dias"}
                      </Typography>
                      <Box
                        sx={{
                          display: matches ? "flex" : "none",
                          alignItems: "center",
                          mt: 1,
                        }}
                      >
                        <Button
                          color="success"
                          onClick={() => returnRental(rent.id)}
                        >
                          Devolver
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
                      color="success"
                      onClick={() => returnRental(rent.id)}
                    >
                      Devolver
                    </Button>
                  </Box>
                </Card>
              </Grid>
            ))
          )}
        </Grid>
      </Paper>
      <BackDrop open={loading || listRentals.loading} />
    </Container>
  );
}
