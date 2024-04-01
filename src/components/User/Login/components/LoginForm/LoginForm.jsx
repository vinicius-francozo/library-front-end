import { Button, FormGroup } from "@mui/material";
import { useForm } from "react-hook-form";
import { CustomTextField, Snackbar } from "../../../../Utils";
import { yupResolver } from "@hookform/resolvers/yup";
import schema from "./schema";
import "./LoginForm.css";
import { useNavigate } from "react-router-dom";
import { login } from "../../../../../service";
import { useState } from "react";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      setOpen(false);
      const response = await login(data.username, data.password);
      if (response?.response?.status == 401) {
        throw new Error();
      }
      localStorage.setItem("token", response);
      navigate("/", { replace: true });
      navigate(0);
    } catch (err) {
      setOpen(true);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormGroup className="LoginForm">
        <CustomTextField
          label={"Usuário"}
          id={"username"}
          labelColor={"#ff9e55"}
          textColor={"#e1ebf3"}
          register={{ ...register("username") }}
          styling={{ mb: 1.5 }}
          errors={errors.username?.message}
        />
        <CustomTextField
          label={"Senha"}
          id={"password"}
          labelColor={"#ff9e55"}
          textColor={"#e1ebf3"}
          register={{ ...register("password") }}
          type={"password"}
          styling={{ mb: 1.5 }}
          errors={errors.password?.message}
        />
        <Button
          sx={{
            borderRadius: 20,
            height: 50,
          }}
          size="large"
          variant="contained"
          type="submit"
        >
          Entrar
        </Button>
      </FormGroup>
      <Snackbar
        message={"Usuário ou Senha incorretas"}
        open={open}
        setOpen={setOpen}
      />
    </form>
  );
}
