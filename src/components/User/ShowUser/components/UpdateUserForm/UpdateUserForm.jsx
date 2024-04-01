import {
  Button,
  Box,
  ButtonBase,
  Divider,
  Typography,
  FormControl,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useForm } from "react-hook-form";
import { styled } from "@mui/material/styles";
import { BackDrop, CustomTextField, Snackbar } from "../../../../Utils";
import { useAuth } from "../../../../../context";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useRef, useState } from "react";
import schema from "./schema";
import { changeImage, getUser, updateUser } from "../../../../../service";

export default function UpdateUserForm() {
  const [userData, setUserData] = useState();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const matches = useMediaQuery("(max-width:600px)");

  const { user } = useAuth();

  const inputFileRef = useRef();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const response = await updateUser(data, user?.id);
      setUserData(response.user);
      setOpen(true);
    } catch (err) {
      return err;
    } finally {
      setLoading(false);
    }
  };

  const Img = styled("img")({
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
    objectFit: "scale-down",
  });

  useEffect(() => {
    if (userData) {
      for (const [key, value] of Object.entries(userData)) {
        if (key !== "createdAt" && key !== "updatedAt" && key !== "id") {
          setValue(key, value);
        }
      }
    }
  }, [userData]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        if (user?.id) {
          const response = await getUser(user?.id);
          setUserData(response);
        }
      } catch (err) {
        return err;
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [user]);

  const handleUpdateImage = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    try {
      setLoading(true);
      const response = await changeImage(formData, user?.id);
      setUserData(response.user);
    } catch (err) {
      return err;
    } finally {
      setLoading(false);
    }
  };

  const handleImgClick = () => {
    inputFileRef.current.click();
  };

  return (
    <Box
      className="UpdateUserForm"
      display="grid"
      gridTemplateColumns={matches ? "1fr" : "1fr 2fr"}
      gap={3}
    >
      <Box justifySelf="center" alignSelf="center">
        <ButtonBase sx={{ width: 300, height: 300 }} onClick={handleImgClick}>
          <Img
            alt="complex"
            src={userData?.image || "/src/assets/default_photo.jpg"}
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleUpdateImage}
            ref={inputFileRef}
            style={{ display: "none" }}
          />
        </ButtonBase>
      </Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 1,
          }}
        >
          <Divider sx={{ gridColumn: "span 4" }} textAlign="left">
            <Typography
              variant="overline"
              fontSize={20}
              fontFamily={"roboto"}
              color={"rgba(245, 255, 193, 0.89)"}
            >
              Informações da Conta
            </Typography>
          </Divider>
          <CustomTextField
            labelProps={{ shrink: true }}
            label={"E-mail"}
            id={"email"}
            labelColor={"#f36800"}
            textColor={"#1e1a1e"}
            backgroundColor={"rgba(245, 255, 193, 0.89)"}
            borderRadius={1}
            register={{ ...register("email") }}
            styling={{ mb: 1.5, gridColumn: "1/3" }}
            errors={errors.email?.message}
          />
          <CustomTextField
            labelProps={{ shrink: true }}
            label={"Usuário"}
            id={"username"}
            labelColor={"#f36800"}
            textColor={"#1e1a1e"}
            backgroundColor={"rgba(245, 255, 193, 0.89)"}
            borderRadius={1}
            register={{ ...register("username") }}
            styling={{ mb: 1.5, gridColumn: "3/5" }}
            errors={errors.username?.message}
          />
          <Divider sx={{ gridColumn: "span 4" }} textAlign="left">
            <Typography
              variant="overline"
              fontSize={20}
              fontFamily={"roboto"}
              color={"rgba(245, 255, 193, 0.89)"}
            >
              Informações Pessoais
            </Typography>
          </Divider>
          <CustomTextField
            labelProps={{ shrink: true }}
            label={"Nome"}
            id={"name"}
            labelColor={"#f36800"}
            textColor={"#1e1a1e"}
            backgroundColor={"rgba(245, 255, 193, 0.89)"}
            borderRadius={1}
            register={{ ...register("name") }}
            styling={{ mb: 1.5, gridColumn: matches ? "span 2" : "span 1" }}
            errors={errors.name?.message}
          />
          <CustomTextField
            labelProps={{ shrink: true }}
            label={"Sobrenome"}
            id={"surname"}
            labelColor={"#f36800"}
            textColor={"#1e1a1e"}
            backgroundColor={"rgba(245, 255, 193, 0.89)"}
            borderRadius={1}
            register={{ ...register("surname") }}
            styling={{ mb: 1.5, gridColumn: matches ? "span 2" : "span 1" }}
            errors={errors.surname?.message}
          />
          <CustomTextField
            labelProps={{ shrink: true }}
            label={"Idade"}
            id={"age"}
            labelColor={"#f36800"}
            textColor={"#1e1a1e"}
            backgroundColor={"rgba(245, 255, 193, 0.89)"}
            borderRadius={1}
            register={{ ...register("age") }}
            type={"number"}
            styling={{ mb: 1.5, gridColumn: matches ? "span 2" : "span 1" }}
            errors={errors.age?.message}
          />
          <CustomTextField
            labelProps={{ shrink: true }}
            label={"Telefone"}
            id={"phone"}
            labelColor={"#f36800"}
            textColor={"#1e1a1e"}
            backgroundColor={"rgba(245, 255, 193, 0.89)"}
            borderRadius={1}
            register={{ ...register("phone") }}
            styling={{ mb: 1.5, gridColumn: matches ? "span 2" : "span 1" }}
            errors={errors.phone?.message}
          />
          <Divider sx={{ gridColumn: "span 4" }} textAlign="left">
            <Typography
              variant="overline"
              fontSize={20}
              fontFamily={"roboto"}
              color={"rgba(245, 255, 193, 0.89)"}
            >
              Informações de Endereço
            </Typography>
          </Divider>
          <CustomTextField
            labelProps={{ shrink: true }}
            label={"Rua"}
            id={"street"}
            labelColor={"#f36800"}
            textColor={"#1e1a1e"}
            backgroundColor={"rgba(245, 255, 193, 0.89)"}
            borderRadius={1}
            register={{ ...register("street") }}
            styling={{ mb: 1.5, gridColumn: "1/3" }}
            errors={errors.street?.message}
          />
          <CustomTextField
            labelProps={{ shrink: true }}
            label={"Bairro"}
            id={"nbhood"}
            labelColor={"#f36800"}
            textColor={"#1e1a1e"}
            backgroundColor={"rgba(245, 255, 193, 0.89)"}
            borderRadius={1}
            register={{ ...register("neighbourhood") }}
            styling={{ mb: 1.5, gridColumn: "3/5" }}
            errors={errors.neighbourhood?.message}
          />
          <CustomTextField
            labelProps={{ shrink: true }}
            label={"Número"}
            id={"number"}
            labelColor={"#f36800"}
            textColor={"#1e1a1e"}
            backgroundColor={"rgba(245, 255, 193, 0.89)"}
            borderRadius={1}
            register={{ ...register("number") }}
            styling={{ mb: 1.5 }}
            errors={errors.number?.message}
          />
          <CustomTextField
            labelProps={{ shrink: true }}
            label={"Cidade"}
            id={"city"}
            labelColor={"#f36800"}
            textColor={"#1e1a1e"}
            backgroundColor={"rgba(245, 255, 193, 0.89)"}
            borderRadius={1}
            register={{ ...register("city") }}
            styling={{ mb: 1.5, gridColumn: "2/4" }}
            errors={errors.city?.message}
          />
          <CustomTextField
            labelProps={{ shrink: true }}
            label={"País"}
            id={"country"}
            labelColor={"#f36800"}
            textColor={"#1e1a1e"}
            backgroundColor={"rgba(245, 255, 193, 0.89)"}
            borderRadius={1}
            register={{ ...register("country") }}
            styling={{ mb: 1.5 }}
            errors={errors.country?.message}
          />
          <Button
            sx={{
              borderRadius: 20,
              height: 50,
              gridColumn: matches ? "3/5" : "4/5",
              color: "white",
              border: 0,
              "& :hover": {
                border: 0,
              },
              "& span": {
                border: "1px solid white",
              },
            }}
            size="large"
            variant="outlined"
            type="submit"
            color="success"
          >
            Atualizar
          </Button>
        </FormControl>
      </form>
      <BackDrop open={loading} />
      <Snackbar
        message={"Usuário atualizado com sucesso"}
        open={open}
        setOpen={setOpen}
      />
    </Box>
  );
}
