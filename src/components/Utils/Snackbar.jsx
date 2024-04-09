import React from "react";
import { Snackbar, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function SimpleSnackbar({
  message,
  open,
  setOpen,
  vert = "top",
  hori = "left",
}) {
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <div>
      <Snackbar
        sx={{ mt: 6, "& div": { backgroundColor: "#b099b7", color: "black" } }}
        open={open}
        anchorOrigin={{ vertical: vert, horizontal: hori }}
        autoHideDuration={4000}
        onClose={handleClose}
        message={message}
        action={action}
        key={vert + hori}
      />
    </div>
  );
}
