import { Container, Paper, Divider, Typography, Box } from "@mui/material";
import { UpdateUserForm } from "./components";
import "./ShowUser.css";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useAuth } from "../../../context";
import { useEffect, useState } from "react";
import { GET_USER, GET_USER_REVIEWS } from "../../../service";
import { BackDrop } from "../../Utils";
import { useQuery } from "@apollo/client";

export default function ShowUser() {
  const matches = useMediaQuery("(max-width:600px)");
  const [userData, setUserData] = useState();

  const { user } = useAuth();
  const getUser = useQuery(GET_USER, {
    variables: { id: `${user?.id}` },
  });

  const getUserReviews = useQuery(GET_USER_REVIEWS);

  useEffect(() => {
    if (user && !getUser.data) {
      getUser.refetch();
    }

    if (user && !getUserReviews.data) {
      getUserReviews.refetch();
    }

    if (getUser.data) {
      setUserData(getUser.data.findOneUser);
    }
  }, [user, getUser.data, getUserReviews.data]);

  return (
    <Container
      className="ShowUser"
      maxWidth={"xl"}
      sx={{ paddingTop: 2, paddingBottom: 1 }}
    >
      <Paper
        className="Content"
        elevation={5}
        sx={{
          minHeight: "100%",
          height: "max-content",
          padding: matches ? 1 : 5,
          borderRadius: 4,
        }}
      >
        <UpdateUserForm />
        <Divider sx={{ gridColumn: "span 4" }} textAlign="left">
          <Typography
            variant="overline"
            fontSize={20}
            fontFamily={"roboto"}
            color={"rgba(245, 255, 193, 0.89)"}
          >
            Informações PedLivro
          </Typography>
        </Divider>
        <Box
          minHeight="27vh"
          alignItems="center"
          display="grid"
          gridTemplateColumns={matches ? "1fr" : "repeat(5, 1fr)"}
          rowGap={matches ? 4 : 0}
        >
          {userData && getUserReviews?.data && (
            <>
              <Typography
                variant="h6"
                textTransform="uppercase"
                fontFamily="roboto"
                fontWeight="300"
                color="rgba(245, 255, 193, 0.89)"
                gridColumn={matches ? "span 2" : "3/4"}
              >
                # Livros favoritos: {localStorage.getItem("cartChip")}
              </Typography>
              <Typography
                variant="h6"
                textTransform="uppercase"
                fontFamily="roboto"
                fontWeight="300"
                color="rgba(245, 255, 193, 0.89)"
                gridColumn={matches ? "span 2" : "5/6"}
              >
                Rank PedLivro: Platina
              </Typography>
              <Typography
                variant="h6"
                textTransform="uppercase"
                fontFamily="roboto"
                fontWeight="300"
                color="rgba(245, 255, 193, 0.89)"
                gridColumn={matches ? "span 2" : "span 1"}
              >
                Seguidores: 152
              </Typography>
              <Typography
                variant="h6"
                textTransform="uppercase"
                fontFamily="roboto"
                fontWeight="300"
                color="rgba(245, 255, 193, 0.89)"
                gridColumn={matches ? "span 2" : "3/4"}
              >
                Seguindo: 88
              </Typography>
              <Typography
                variant="h6"
                textTransform="uppercase"
                fontFamily="roboto"
                fontWeight="300"
                color="rgba(245, 255, 193, 0.89)"
                gridColumn={matches ? "span 2" : "5/6"}
              >
                # Comentários: {getUserReviews.data.getUserReviews.length}
              </Typography>
            </>
          )}
        </Box>
      </Paper>
      <BackDrop open={getUser.loading || getUserReviews.loading} />
    </Container>
  );
}
