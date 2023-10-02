// recaptchaMiddleware.js
import verifyRecaptcha from "../libs/recaptchaService.js";

const recaptchaMiddleware = async (req, res, next) => {
  const token = req.body["g-recaptcha-response"];
  try {
    const isValid = await verifyRecaptcha(token);
    if (isValid) {
      next();
    } else {
      res.status(400).send("reCAPTCHA failed validation!");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export default recaptchaMiddleware;
