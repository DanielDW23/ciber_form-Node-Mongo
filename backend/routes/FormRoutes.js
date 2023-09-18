import express from 'express';
import { createForm, deleteform, updateForm, getForms, getFormid } from '../controller/formController.js';

const formRouter = express.Router();

formRouter.get('/', getForms)
formRouter.get('/:id',getFormid )
formRouter.post ('/', createForm )
formRouter.put ('/:id', updateForm )
formRouter.delete ('/:id', deleteform)

export default formRouter