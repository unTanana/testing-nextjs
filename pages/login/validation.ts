import * as Yup from 'yup';

const validationSchema = Yup.object({
  username: Yup.string().max(15, 'Maximum 15 characters').required('Required'),
  password: Yup.string().required('Required'),
});

export { validationSchema };
