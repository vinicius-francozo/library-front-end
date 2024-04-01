import { Box, Typography } from "@mui/material";
import "./CreateUser.css";
import { CreateUserForm } from "./components";

export default function CreateUser() {
  return (
    <Box className={"CreateUser"}>
      <Box className={"FormBox"}>
        <Typography
          variant="h4"
          fontWeight={"300"}
          fontFamily={"roboto"}
          color={"#e1ebf3b8"}
          mb={4}
        >
          Crie sua conta!
        </Typography>
        <CreateUserForm />
      </Box>
    </Box>
  );
}
