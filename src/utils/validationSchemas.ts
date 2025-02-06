import * as Yup from "yup";

export const tripValidationSchema = Yup.object().shape({
  region: Yup.string().required("Регион обязателен"),
  from: Yup.string()
    .max(200, "Максимальная длина 200 символов")
    .required("Адрес отправления обязателен"),
  to: Yup.string()
    .max(200, "Максимальная длина 200 символов")
    .required("Адрес назначения обязателен"),
  tariff: Yup.string().required("Тариф обязателен"),
});