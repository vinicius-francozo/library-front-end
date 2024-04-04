import * as yup from "yup";

const schema = yup.object().shape({
  title: yup.string().required("O título não pode ficar em branco"),
  author_id: yup.number().required("O autor não pode ficar em branco"),
  category_id: yup.number().required("A categoria não pode ficar em branco"),
  publisher: yup.string().required("A editora não pode ficar em branco"),
  sinopsis: yup.string().required("A sinópse não pode ficar em branco"),
  pages: yup
    .number()
    .typeError("Insira uma quantidade de páginas válida")
    .positive()
    .required("O número de páginas não pode ficar em branco"),
  release_date: yup
    .date()
    .typeError("Insira uma data válida")
    .required("A data de lançamento não pode ficar em branco"),
  edition: yup.string().required("A edição não pode ficar em branco"),
  cover: yup
    .mixed()
    .test("file", "A capa não pode ficar em branco", (value) => {
      if (value.length > 0) {
        return true;
      }
      return false;
    }),
});

export default schema;
