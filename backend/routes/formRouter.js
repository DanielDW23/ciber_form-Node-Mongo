import express from 'express';
import { createForm, deleteform, updateForm, getForms, getFormid } from '../controller/formController.js';
import { authRole } from '../middlewares/authRole.js';

const formRouter = express.Router();

// formRouter.post ('/', createForm )
formRouter.get('/', authRole("user"), getForms)
formRouter.get('/:id', authRole("user"), getFormid )
formRouter.put ('/:id', authRole("admin"), updateForm )
formRouter.delete ('/:id', authRole("admin"), deleteform)

export default formRouter