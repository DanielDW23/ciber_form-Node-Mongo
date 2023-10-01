
import axios from 'axios';

const verifyRecaptcha = async (token) => {
    const secret_key = process.env.SECRET_KEY_RECAPTCHA_V3;
    try {
        const response = await axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=${secret_key}&response=${token}`);
        return response.data.success;
    } catch (error) {
        console.error("Error al validar reCAPTCHA:", error);
        throw new Error("Error al validar reCAPTCHA");
    }
};

export default verifyRecaptcha;
