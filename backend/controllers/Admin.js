import Admin from "../models/AdminModel.js";
import argon2 from "argon2";

export const getAdmins = async (req, res)=> {
    try {
        const response = await Admin.findAll({
            attributes: ['uuid', 'name','email','role']
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const getAdminById = async (req, res)=> {
    try {
        const response = await Admin.findOne({
            attributes: ['uuid', 'name','email','role'],
            where: {
                uuid: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}
export const checkemailadmin = async (req, res)=> {
    try {
        const response = await Admin.findOne({
            attributes: ['uuid', 'name','email','role'],
            where: {
                email: req.params.email
            }
        });
        if(response){
            res.status(200).json({msg: true});
        }else{
            res.status(200).json({msg: false});
        }
        
    } catch (error) {
        res.status(500).json({msg: false});
    }
}

export const createAdmin = async (req, res)=> {
    const {name, email, password, confPassword, role} = req.body;
    if(password !== confPassword) return res.status(400).json({msg: "Password dan confpassword tdk sama"});
    const hashPassword = await argon2.hash(password);
    try {
        await Admin.create({
            name: name,
            email: email,
            password: hashPassword,
            role: role
        });
        res.status(201).json({msg: "Registers successfully"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}

export const updateAdmin = async(req, res)=> {
    const admin = await Admin.findOne({
        where: {
            uuid: req.params.id
        }
    });
    if(!admin) return res.status(404).json({msg:"Email tidak Adalah"});
    const {name, email, password, confPassword, role} = req.body;
    let hashPassword;
    if(password === "" || password === null){
        hashPassword = admin.password;
    }else{
        hashPassword = await argon2.hash(password);
    }
    if(password !== confPassword) return res.status(400).json({msg: "Password dan confpassword tdk sama"});
    try {
        await Admin.update({
            name: name,
            email: email,
            password: hashPassword,
            role: role
        },{
            where: {
                id: admin.id
            }
        });
        res.status(200).json({msg: "Updated Successfully"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}

export const deleteAdmin = async(req, res)=> {
    const admin = await Admin.findOne({
        where: {
            uuid: req.params.id
        }
    });
    if(!admin) return res.status(404).json({msg:"Email tidak ditemukan"});
    try {
        await Admin.destroy({
            where: {
                id: admin.id
            }
        });
        res.status(200).json({msg: "Delete Successfullly"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}