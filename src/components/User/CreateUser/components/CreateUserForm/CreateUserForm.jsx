import { FormGroup, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { BackDrop, CustomTextField } from "../../../../Utils";
import { yupResolver } from "@hookform/resolvers/yup";
import schema from "./schema";
import "./CreateUserForm.css";
import { createUser, login } from "../../../../../service";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function CreateUserForm({ setOpen }) {
  const [loading, setLoading] = useState();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const createResponse = await createUser(data);
      if (createResponse?.response?.status == 500) {
        throw new Error();
      }
      const response = await login(data.username, data.password);
      console.log(response)
      localStorage.setItem("token", response);
      navigate("/", { state: { openSnackbar: true } });
      navigate(0);
    } catch (err) {
      setOpen(true);
    } finally {
      setLoading(false);
    }
  };

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
