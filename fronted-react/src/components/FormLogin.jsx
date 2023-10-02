import { Col, Button, Row, Container, Card, Form, InputGroup } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import './css/FormLogin.css';

import { useContext, useState } from "react";
import { AuthContext } from "../AuthContext";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";

import { useFormik } from 'formik';
import * as Yup from 'yup';

import jwtDecode from 'jwt-decode';

const schema = Yup.object().shape({
    email: Yup.string().max(50, "Máximo 50 caracteres").matches(
        /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/, 'Email inválido').required("El email es obligatorio"),
    password: Yup.string().required("El password es obligatorio"),
})


function Login() {
    const { login, isLoggedIn, user } = useContext(AuthContext);
    const [showPassword, setShowPassword] = useState(false);

    const handlePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const formik = useFormik(
        {
            initialValues: {
                email: '',
                password: ''
            },
            validationSchema: schema,
            onSubmit: async (values) => {
                handleSubmit(values);
            },

        });


    const handleSubmit = async (values) => {
        try {
            const response = await fetch('http://127.0.0.1:8000/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values) // Aquí enviamos directamente los values del formulario.
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json(); // Asume que el servidor responde con un json.

            // Asume que el servidor responde con un objeto que tiene un token JWT.
            const user = jwtDecode(data.token);

            login(data.token, user);

        } catch (error) {
            console.error('Fetch error: ' + error.message);
            // Puedes configurar un estado para manejar errores y mostrar un mensaje al usuario.
        }

    };


    if (isLoggedIn) {
        if (user && user.role === 'admin') {
            return <Navigate to="/admin_dashboard" />;
        } else {
            return <Navigate to="/user_dashboard" />;
        }
    }



    return (
        <div>
            <Container>
                <Row className="vh-100 d-flex justify-content-center align-items-center">
                    <Col xl={12} md={12} lg={12} xs={12}>
                        <div className="border border-3 border-primary "></div>
                        <Card className="shadow">
                            <Card.Body>
                                <div className="mb-3 mt-md-4">
                                    <h2 className="fw-bold mb-2 text-uppercase text-center">Login Panel</h2>
                                    <p className=" mb-5"></p>
                                    <div className="mb-3">
                                        <Form onSubmit={formik.handleSubmit}>
                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Label className="text-center">
                                                    Email address
                                                </Form.Label>
                                                <Form.Control type="email" placeholder="Enter email" onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    value={formik.values.email}
                                                    name="email" />
                                                {formik.touched.email && formik.errors.email && <span>{formik.errors.email}</span>}
                                            </Form.Group>


                                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                                <Form.Label>Password</Form.Label>
                                                <InputGroup>
                                                    <Form.Control
                                                        type={showPassword ? "text" : "password"} // Cambiando el tipo de input dinámicamente
                                                        placeholder="Password"
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        value={formik.values.password}
                                                        name="password"
                                                    />
                                                    <InputGroup.Text onClick={handlePasswordVisibility}>
                                                        {showPassword ? <FaEyeSlash /> : <FaEye />} {/* Renderizando el icono basado en el estado showPassword */}
                                                    </InputGroup.Text>
                                                </InputGroup>
                                            </Form.Group>
                                            <Form.Group
                                                className="mb-3"
                                                controlId="formBasicCheckbox"
                                            >
                                                {/* <p className="small">
                          <a className="text-primary" href="#!">
                            Forgot password?
                          </a>
                        </p> */}
                                            </Form.Group>
                                            <div className="d-grid">
                                                <Button variant="primary" type="submit" className="background_element_custom">
                                                    Login
                                                </Button>
                                            </div>
                                        </Form>

                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                        <Link to="/" className="linkForm">&#8617;  Volver al formulario</Link>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Login;