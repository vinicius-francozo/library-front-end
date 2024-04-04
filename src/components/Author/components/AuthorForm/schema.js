import * as yup from "yup";

const schema = yup.object().shape({
  name: yup.string().required("O nome não pode ficar em branco"),
  surname: yup.string().required("O sobrenome não pode ficar em branco"),
  description: yup.string().required("A descrição não pode ficar em branco"),
  country: yup.string().required("O país não pode ficar em branco"),
  birth_date: yup
    .string()
    .required("A data de nascimento não pode ficar em branco"),
  picture: yup
    .mixed()
    .test("file", "O retrato não pode ficar em branco", (value) => {
      if (value.length > 0) {
        return true;
      }
      return false;
    }),
});

export default schema;
