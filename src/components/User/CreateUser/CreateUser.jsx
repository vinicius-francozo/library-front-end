import { Box, Typography } from "@mui/material";
import "./CreateUser.css";
import { CreateUserForm } from "./components";
import { Snackbar } from "../../Utils";
import { useState } from "react";

export default function CreateUser() {
  const [open, setOpen] = useState(false);
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
        <CreateUserForm setOpen={setOpen} />
      </Box>
      <Snackbar
        message={"Esse nome de usuário já existe."}
        open={open}
        setOpen={setOpen}
      />
    </Box>
  );
}
