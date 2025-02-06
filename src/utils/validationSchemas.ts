import * as Yup from 'yup';

export const tripValidationSchema = Yup.object({
  region: Yup.string().required('Регион обязателен'),
  from: Yup.string()
    .required('Адрес отправления обязателен')
    .min(3, 'Адрес отправления должен быть не менее 3 символов'),
  to: Yup.string()
    .required('Адрес назначения обязателен')
    .min(3, 'Адрес назначения должен быть не менее 3 символов'),
  tariff: Yup.string().required('Выберите тариф'),
});