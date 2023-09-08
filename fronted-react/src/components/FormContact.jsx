import { useFormik } from 'formik';
import * as Yup from 'yup';

const schema = Yup.object().shape({
  email: Yup.string().email('Email invalido').required(),
  name: Yup.string().min(1).required(),
});

export const FormLogin = () => {
  const submitForm = (values) => {};

  const { handleSubmit, handleChange, handleReset, errors, values } = useFormik(
    {
      initialValues: {
        email: '',
        name: '',
        subject: '',
        message: ''
      },
      onSubmit: submitForm,
      validationSchema: schema,
    },
  );

  return (
    <div>
      <form onSubmit={handleSubmit} onReset={handleReset}>
        <input
          type='email'
          placeholder='Your e-mail'
          name='email'
          value={values.email}
          onChange={handleChange}
          autoComplete='off'
        />
        <br />
        {errors.email && <span>Email invalido</span>}
        <input
          type='text'
          placeholder='Your name'
          name='name'
          value={values.name}
          onChange={handleChange}
          autoComplete='off'
        />
        <input
          type='text'
          placeholder='Subject'
          name='subject'
          value={values.subject}
          onChange={handleChange}
          autoComplete='off'
        />
        <input
          type='text'
          placeholder='Your message'
          name='message'
          value={values.message}
          onChange={handleChange}
          autoComplete='off'
        />
        
        <button type='submit'>ENVIAR</button>
        
        <br />
        
        {errors.password && (
          <span>La contraseña debe tener al menos 1 caracter</span>
        )}
      </form>
    </div>
  );
};

export default FormLogin