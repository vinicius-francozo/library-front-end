import { Button, FormGroup } from "@mui/material";
import { useForm } from "react-hook-form";
import { CustomTextField, Snackbar } from "../../../../Utils";
import { yupResolver } from "@hookform/resolvers/yup";
import schema from "./schema";
import "./LoginForm.css";
import { useNavigate } from "react-router-dom";
// import { login } from "../../../../../service";
import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_REQUEST } from "../../../../../service";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const [login, { loading, error, data }] = useMutation(LOGIN_REQUEST);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (userData) => {
    login({
      variables: { username: userData.username, password: userData.password },
    });
  };

  useEffect(() => {
    if (error) setOpen(true);
    if (!loading && data) {
      localStorage.setItem("token", data.login);
      navigate("/", { replace: true });
      navigate(0);
    }
  }, [error, loading, data]);

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
