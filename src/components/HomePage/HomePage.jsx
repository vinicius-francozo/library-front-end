import { Box, Button, Grid, Typography } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import "./HomePage.css";
import { Link } from "react-router-dom";
import { useAuth } from "../../context";

export default function HomePage() {
  const matches = useMediaQuery("(max-width:600px)");

  const { user } = useAuth();

  return (
    <Box className="HomePage">
      <Grid container rowGap={7}>
        <Grid item xs={12}>
          <Typography variant={matches ? "h4" : "h2"} color={"#e1ebf3f0"}>
            Bem vindo à PedLivro!
          </Typography>
        </Grid>
        {!user && (
          <>
            <Grid item xs={12}>
              <Typography variant={matches ? "h4" : "h2"} color={"#e1ebf3f0"}>
                Entre para garantir seu livro...
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Link
                to="/login"
                style={{ color: "white", textDecoration: "none" }}
              >
                <Button
                  variant="contained"
                  size="large"
                  sx={{
                    mx: 2,
                    minWidth: "fit-content",
                    width: 200,
                    minHeight: 50,
                    mb: matches ? 3 : 0,
                    borderRadius: 10,
                  }}
                  className="HomeButton"
                >
                  Login
                </Button>
              </Link>
              <Link
                to="/user/create"
                style={{ color: "white", textDecoration: "none" }}
              >
                <Button
                  variant="contained"
                  size="large"
                  sx={{
                    mx: 2,
                    minWidth: "fit-content",
                    width: 200,
                    minHeight: 50,
                    borderRadius: 10,
                  }}
                  className="HomeButton"
                >
                  Cadastre-se
                </Button>
              </Link>
            </Grid>
          </>
        )}

        <Grid item xs={12}>
          <Typography variant={matches ? "h4" : "h2"} color={"#e1ebf3f0"}>
            {`${!user ? "Ou d" : "D"}ê uma olhada sem compromisso...`}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Link to="/book" style={{ color: "white", textDecoration: "none" }}>
            <Button
              variant="contained"
              size="large"
              sx={{
                mx: 2,
                minWidth: "fit-content",
                width: 200,
                minHeight: 50,
                mb: matches ? 3 : 0,
                borderRadius: 10,
              }}
              className="HomeButton"
            >
              Ver livros...
            </Button>
          </Link>
          <Link to="/author" style={{ color: "white", textDecoration: "none" }}>
            <Button
              variant="contained"
              size="large"
              sx={{
                mx: 2,
                minWidth: "fit-content",
                width: 200,
                minHeight: 50,
                mb: matches ? 3 : 0,
                borderRadius: 10,
              }}
              className="HomeButton"
            >
              Ver autores...
            </Button>
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
}
