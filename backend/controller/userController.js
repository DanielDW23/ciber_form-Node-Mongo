import User from "../models/userModel.js";

//Crud (crear, leer, actualizar, borrar)

//crear

export const createUser = async (req, res) =>{
    // console.log (req.body)
    const {name, surname, nick, email, password, roles} = req.body
    
   
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
export const getUserid = async (req,res) =>{
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
export const updateUser = async (req, res) => {
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
export const deleteUser = async (req, res) =>{
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