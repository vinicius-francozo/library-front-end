import * as yup from "yup";

const schema = yup.object().shape({
  username: yup.string().required("Seu usuário não pode ficar em branco"),
  password: yup.string().required("A senha não pode ficar em branco"),
});

export default schema;
