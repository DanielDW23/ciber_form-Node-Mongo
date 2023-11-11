import { useFormik } from 'formik';
import * as Yup from 'yup';
import './css/FormContact.css';
import { Link } from "react-router-dom";


const schema = Yup.object().shape({
  email: Yup.string().max(100, "Maximum 100 characters").matches(
    /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/, 'Invalid email').required("Email is required"),
  name: Yup.string().max(80, "Maximum 80 characters").matches(/^[a-zA-ZáéíóúüÁÉÍÓÚÜñÑ]*$/, 'Only letters are allowed').required("Name is required"),
  subject: Yup.string().max(120, "Maximum 120 characters").required("Subject is required"),
  message: Yup.string().max(400, "Maximum 400 characters").required("Message is required"),
  phone: Yup.string().max(0),
  direction: Yup.string().max(0)
});

export const FormContact = () => {
  const submitForm = (values) => {
    grecaptcha.ready(function () {
      grecaptcha.execute('6Ldix2koAAAAAMoeIF5Bbix3m2PQI-Nwa3cLn20j', { action: 'submit' }).then(function (token) {

        values["g-recaptcha-response"] = token;

        fetch('http://127.0.0.1:8000/form', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(values)
        })
          .then(response => response.json())
          .then(data => {
            console.log('Success:', data);
            resetForm({});
          })
          .catch((error) => {
            console.error('Error:', error);
          });
      });
    });
  };

  const { handleSubmit, handleChange, errors, values, resetForm } = useFormik(
    {
      initialValues: {
        email: '',
        name: '',
        subject: '',
        message: '',
        phone: '',
        direction: ''
      },
      onSubmit: submitForm,
      validationSchema: schema,
    },
  );

  return (
    <> 
      <h1 className='title' >SECURED CONTACT FORM</h1>
      <div className="contactForm">
        <h2>Contact Us</h2>
        <form onSubmit={handleSubmit}>
          <div className="formContainerFirstLine">
            <div className="formFirstLine">
              <input
                type='email'
                placeholder='Your e-mail'
                name='email'
                value={values.email}
                onChange={handleChange}
                autoComplete='off'
              />
              <br />
              {errors.email && <span>{errors.email}</span>}
            </div>
            <div className="formFirstLine">
              <input
                type='text'
                placeholder='Your name'
                name='name'
                value={values.name}
                onChange={handleChange}
                autoComplete='off'
              />
              <br />
              {errors.name && <span>{errors.name}</span>}
            </div>
          </div>
          <div className="formSecondLine">
            <input
              type='text'
              placeholder='Subject'
              name='subject'
              value={values.subject}
              onChange={handleChange}
              autoComplete='off'
            />
            {errors.subject && <span>{errors.subject}</span>}
          </div>

          <div className="formThirdLine">
            <textarea
              placeholder='Your message'
              name='message'
              value={values.message}
              onChange={handleChange}
              autoComplete='off'
            />
            {errors.message && <span>{errors.message}</span>}
          </div>

          <input
            type='hidden'
            name='phone'
            value={values.phone}
            onChange={handleChange}
          />
          <input
            type='hidden'
            name='direction'
            value={values.direction}
            onChange={handleChange}
          />

          <button className="btnSend" type='submit'>SEND</button>

          <br />

        </form>
      </div>
      <Link to="/entrando_al_tunel23" className="linkLogin">ADMIN</Link>
    </>
  );
};

export default FormContact