import FormLock from "../models/formModel.js";

//Crud (crear, leer, actualizar, borrar)

//crear

export const createForm = async (req, res) =>{
    // console.log (req.body)
    const {email, name, subject, message, phone, direction} = req.body
    
    if ( phone || direction ){
        res.status(500).json ()
    }

    if (!email || !name || !subject || !message ){
        res.status(400).json ({message: "Todos los campos son requeridos."})
    }
    try {
        const form = await FormLock.create(req.body)
        res.status(201).json(form)
        
    } catch (error) {
        res.status(400).json({message: error.message})
    }
};

//traer un formulario con su id
export const getFormid = async (req,res) =>{
    try {
        const id = req.params.id 
        const form =await FormLock.findById(id)
        res.status(200).json(form)
        
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

//todos los formularios.
export const getForms = async (req,res) =>{
    try {
        const form =await FormLock.find()
        res.status(200).json(form)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

//Actualizar el formulario.
export const updateForm = async (req, res) => {
    const {email, name, subject, message} = req.body

    if(!email && !name && !subject && !message ) {
        res.status(400).json({ message: "Debe proporcionar al menos un campo para actualizar." });
    }
    try {
        const id = req.params.id
        const form = await FormLock.findByIdAndUpdate({_id: id}, req.body, {new:true});
        if (!form){
            res.status(404).json({ message: "No se encontró el formulario con el id especificado." });
        }
        res.status(200).json(form);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

//borrar
export const deleteform = async (req, res) =>{
    try {
        const id = req.params.id
        const form = await FormLock.deleteOne({_id: id});
         if (!form){
            res.status(404).json({ message: "No se encontró el formulario con el id especificado." });
         }
         res.status(200).json({ message: "¡Formulario se ha eliminado correctamente!" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}