import * as yup from "yup";

const schema = yup.object().shape({
  username: yup.string().required("Seu usuário não pode ficar em branco"),
  email: yup
    .string()
    .email("Insira um E-mail válido")
    .required("O E-mail não pode ficar em branco"),
  password: yup
    .string()
    .min(8, "A senha deve conter pelo menos 8 caracteres")
    .required("A senha não pode ficar em branco"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "As senhas não combinam")
    .required("A confirmação não pode ficar em branco"),
});

export default schema;
