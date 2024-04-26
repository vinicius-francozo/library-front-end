import { FormGroup, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { BackDrop, CustomTextField } from "../../../../Utils";
import { yupResolver } from "@hookform/resolvers/yup";
import schema from "./schema";
import "./CreateUserForm.css";
import { CREATE_USER } from "../../../../../service";
import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_REQUEST } from "../../../../../service";
import { useNavigate } from "react-router-dom";

export default function CreateUserForm({ setOpen }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const [loading, setLoading] = useState(false);
  const [login, loginMutation] = useMutation(LOGIN_REQUEST);
  const [createUser, createUserMutation] = useMutation(CREATE_USER);

  const navigate = useNavigate();

  const onSubmit = async (userData) => {
    await createUser({
      variables: {
        username: userData.username,
        password: userData.password,
        confirmPassword: userData.confirmPassword,
        email: userData.email,
      },
    });
    if (!createUserMutation.loading) {
      await login({
        variables: { username: userData.username, password: userData.password },
      });

      if (loginMutation.data) {
        localStorage.setItem("token", loginMutation.data.login);
        navigate("/", { state: { openSnackbar: true } });
        navigate(0);
      }
    }
  };

  useEffect(() => {
    setLoading(loginMutation.loading || createUserMutation.loading);
    if ((createUserMutation.error, loginMutation.error)) setOpen(true);
  }, [
    loginMutation.loading,
    createUserMutation.loading,
    loginMutation.error,
    createUserMutation.error,
  ]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup className="CreateUserForm">
          <CustomTextField
            label={"Usuário"}
            id={"username"}
            labelColor={"#f36800"}
            textColor={"#e1ebf3"}
            register={{ ...register("username") }}
            styling={{ mb: 1.5 }}
            errors={errors.username?.message}
          />
          <CustomTextField
            label={"E-mail"}
            id={"email"}
            labelColor={"#f36800"}
            textColor={"#e1ebf3"}
            register={{ ...register("email") }}
            styling={{ mb: 1.5 }}
            errors={errors.email?.message}
          />
          <CustomTextField
            label={"Senha"}
            id={"password"}
            labelColor={"#f36800"}
            textColor={"#e1ebf3"}
            register={{ ...register("password") }}
            type={"password"}
            styling={{ mb: 1.5 }}
            errors={errors.password?.message}
          />
          <CustomTextField
            label={"Confirme sua senha"}
            id={"confirm-password"}
            labelColor={"#f36800"}
            textColor={"#e1ebf3"}
            register={{ ...register("confirmPassword") }}
            type={"password"}
            styling={{ mb: 1.5 }}
            errors={errors.confirmPassword?.message}
          />
          <Button
            sx={{
              borderRadius: 20,
              height: 50,
              backgroundColor: "#ff9e55",
            }}
            size="large"
            variant="contained"
            type="submit"
          >
            Criar
          </Button>
        </FormGroup>
        <BackDrop open={loading} />
      </form>
    </>
  );
}
