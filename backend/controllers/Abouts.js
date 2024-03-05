import About from "../models/AboutModel.js";
import Admin from "../models/AdminModel.js";
import {Op} from "sequelize";

export const getAbouts = async (req, res)=> {
    
    try {
        let response;
        response = await About.findAll({
            attributes: ['id', 'uuid', 'history', 'vision', 'mision', 'values', 'createdAt', 'updatedAt'],
            include: [{
                model: Admin
            }]
        });
        // if(req.role === "admin"){
        //     response = await About.findAll({
        //         attributes:['uuid', 'history','vision','mision','values','userId'],
        //         include:[{
        //             model: Admin,
        //             attributes:['history','vision','mision','values','userId']
        //         }]
        //     });
        // }else{
        //     response = await About.findAll({
        //         attributes:['uuid', 'history','vision','mision','values','userId'],
        //         where:{
        //             userId: req.userId
        //         },
        //         include:[{
        //             model: Admin,
        //             attributes:['history','vision','mision','values','userId']
        //         }]
        //     });
        // }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const getAboutById = async (req, res)=> {
    
    try {
        const about = await About.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!about) return res.status(404).json({msg: "Data tidak ditemukan"});
        let response;
        if(req.role === "admin"){
            response = await About.findOne({
                attributes:['uuid', 'history','vision','mision','values','userId'],
                where:{
                    id: about.id
                },
                include:[{
                    model: Admin
                }]
            });
        }else{
            response = await About.findOne({
                attributes:['uuid', 'history','vision','mision','values','userId'],
                where:{
                    id: about.id
                },
                include:[{
                    model: Admin
                }]
            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const createAbout = async (req, res)=> {
    const {history, vision, mision, values, userId} = req.body;
    try {
        await About.create({
            history: history,
            vision: vision,
            mision: mision,
            values: values,
            userId: userId
        });
        res.status(201).json({msg: "Upload successfully"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}

export const updateAbout = async (req, res)=> {
    
    try {
        const about = await About.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if(!about) return res.status(404).json({msg: "Data tidak ditemukan"});
        const {history, vision, mision, values} = req.body;
        if(req.role === "admin"){
            await About.update({history, vision, mision, values},{
                where:{
                    id: about.id
                }
            });
        }else{
            await About.update({history, vision, mision, values},{
                where:{
                    id: about.id
                }
            });
        }
        res.status(200).json({msg: "Updated Successfully"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}

export const deleteAbout = async (req, res)=> {
    
        const about = await About.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if(!about) return res.status(404).json({msg: "Data tidak ditemukan"});
        const {history, vision, mision, values} = req.body;
            try {
            await About.destroy({
                where:{
                    id: about.id
                }
            });
        res.status(200).json({msg: "About Delete"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}