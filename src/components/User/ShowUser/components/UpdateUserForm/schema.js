import * as yup from "yup";

const schema = yup.object().shape({
  username: yup.string().required("Seu usuário não pode ficar em branco"),
  email: yup
    .string()
    .email("Insira um E-mail válido")
    .required("O E-mail não pode ficar em branco"),
  name: yup.string().nullable(),
  surnname: yup.string().nullable(),
  age: yup.number().positive("Insira uma idade válida").nullable(),
  phone: yup.string().nullable(),
  street: yup.string().nullable(),
  neighbourhood: yup.string().nullable(),
  number: yup.string().nullable(),
  city: yup.string().nullable(),
  country: yup.string().nullable(),
});

export default schema;
