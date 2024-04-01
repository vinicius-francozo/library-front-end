import * as yup from "yup";

const schema = yup.object().shape({
  text: yup.string().required("O comentário não pode ficar em branco"),
  rate: yup.number().required("A nota não pode ficar em branco"),
});

export default schema;
