import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { createCategory } from "../../../../service";
import { useNavigate } from "react-router-dom";

export default function FormDialog({ open, setOpen }) {
  const navigate = useNavigate();

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: async (event) => {
            event.preventDefault();

            await createCategory(event.target[0].value);
            handleClose();
            navigate(0);
          },
        }}
      >
        <DialogTitle>Criar Categoria</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Digite o nome da categoria que deseja cadastrar:
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="name"
            label="Categoria"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Cadastrar</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
