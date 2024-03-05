import Admin from "../models/AdminModel.js";
import argon2 from "argon2";

export const Login = async (req, res) => {
    const admin = await Admin.findOne({
        where: {
            email: req.body.email
        }
    });
    if(!admin) return res.status(404).json({msg:"ID tidak ditemukan"});
    const match = await argon2.verify(admin.password, req.body.password);
    if(!match) return res.status(404).json({msg:"Wrong password"});
    req.session.adminId = admin.uuid;
    const userid = admin.id;
    const uuid = admin.uuid;
    const name = admin.name;
    const email = admin.email;
    const role = admin.role;
    res.status(200).json({userid,uuid, name, email, role});
}

export const Me = async (req, res) => {
    if(!req.session.adminId){
        return res.status(401).json({msg: "mohon login ke akun anda"});
    }
    const admin = await Admin.findOne({
        attributes: ['id','uuid', 'name','email','role'],
        where: {
            uuid: req.session.adminId
        }
    });
    if(!admin) return res.status(404).json({msg:"ID tidak ditemukan"});
    res.status(200).json(admin);
}

export const logOut = (req, res) => {
    req.session.destroy((err) => {
        if(err) return res.status(400).json({msg: "Tidak dapat LogOut"});
        res.status(200).json({msg: "anda telah LOGOUT"});
    });
}