import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <Box
      height="100vh"
      textAlign="center"
      display="flex"
      flexDirection="column"
      justifyContent="center"
    >
      <Typography variant="h2" color="whitesmoke">
        Não conseguimos encontrar essa página :(
      </Typography>
      <Link style={{ color: "whitesmoke", fontSize: 40 }} to="/">
        Home
      </Link>
    </Box>
  );
}
