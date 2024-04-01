import { Container, Paper, Divider, Typography, Box } from "@mui/material";
import { UpdateUserForm } from "./components";
import "./ShowUser.css";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useAuth } from "../../../context";
import { useEffect, useState } from "react";
import { getUser, getUserReviews } from "../../../service";
import { BackDrop } from "../../Utils";

export default function ShowUser() {
  const matches = useMediaQuery("(max-width:600px)");
  const [userData, setUserData] = useState();
  const [loading, setLoading] = useState(false);
  const [reviews, setReviews] = useState();

  const { user } = useAuth();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        if (user?.id) {
          const response = await getUser(user?.id);
          setUserData(response);
        }
      } catch (err) {
        return err;
      } finally {
        setLoading(false);
      }
    };

    const fetchUserReviews = async () => {
      try {
        setLoading(true);
        if (user?.id) {
          const response = await getUserReviews(user?.id);
          setReviews(response?.reviews?.length);
        }
      } catch (err) {
        return err;
      } finally {
        setLoading(false);
      }
    };
    fetchUserReviews();
    fetchUser();
  }, [user]);

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
          {userData && reviews !== undefined && (
            <>
              <Typography
                variant="h6"
                textTransform="uppercase"
                fontFamily="roboto"
                fontWeight="300"
                color="rgba(245, 255, 193, 0.89)"
                gridColumn={matches ? "span 3" : "span 1"}
              >
                Conta criada em:{" "}
                {new Date(userData?.createdAt).toLocaleDateString()}
              </Typography>
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
                # Comentários: {reviews}
              </Typography>
            </>
          )}
        </Box>
      </Paper>
      <BackDrop open={loading} />
    </Container>
  );
}
