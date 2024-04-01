import { Box, Typography } from "@mui/material";
import { LoginForm } from "./components";
import { Link } from "react-router-dom";
import "./Login.css";

export default function Login() {
  return (
    <Box className="Login">
      <Box>
        <Typography
          variant="h4"
          fontWeight={"300"}
          fontFamily={"roboto"}
          color={"#e1ebf3b8"}
          mb={5}
        >
          Bem-vindo...
        </Typography>
        <Box>
          <Typography
            variant="h4"
            fontFamily={"roboto"}
            fontWeight={"400"}
            color={"#e1ebf3"}
            mb={2}
          >
            Tem uma conta?
          </Typography>
          <LoginForm />
        </Box>
        <Typography variant="overline" color={"#e1ebf3"}>
          — Ou{" "}
          <Link to="/user/create" style={{ color: "inherit" }}>
            Crie
          </Link>{" "}
          uma Conta —
        </Typography>
      </Box>
    </Box>
  );
}
