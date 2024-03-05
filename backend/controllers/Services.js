import Service from "../models/LayananModel.js";
import Admin from "../models/AdminModel.js";
import {Op} from "sequelize";
import path from "path";
import fs from "fs";

export const getServices = async (req, res)=> {
    
    try {
        let response;
        response = await Service.findAll({
            attributes: ['id', 'uuid', 'name', 'image', 'ketser', 'url', 'createdAt', 'updatedAt'],
            include: [{
                model: Admin
            }]
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const getServiceById = async (req, res)=> {
    try {
        const service = await Service.findOne({
            where:{
                id: req.params.id
            }
        });
        if(!service) return res.status(404).json({msg: "Data tidak ditemukan"});
        let response;
        response = await Service.findOne({
            attributes: ['id', 'uuid', 'name', 'image', 'ketser', 'url','userId', 'createdAt', 'updatedAt'],
            where: {
                id: service.id
            },
            include: [{
                model: Admin
            }]
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const createService = async (req, res)=> {
    if(req.files === null) return res.status(400).json({msg: "No File Uploaded"});
    const name = req.body.title;
    const file = req.files.file;
    const keterangan = req.body.ketser;
    const uid = req.body.userId;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    const fileName = file.md5 + ext;
    const url = `${req.protocol}://${req.get("host")}/images/imgService/${fileName}`;
    const allowedType = ['.png','.jpg','.jpeg'];

    if(!allowedType.includes(ext.toLowerCase())) return res.status(422).json({msg: "Invalid Images"});
    if(fileSize > 5000000) return res.status(422).json({msg: "Image must be less than 5 MB"});

    file.mv(`./public/images/imgService/${fileName}`, async (err)=>{
        if(err) return res.status(500).json({msg: err.message});
        try {
            await Service.create({
                name: name,
                image: fileName,
                ketser: keterangan,
                url: url,
                userId: uid
            });
            res.status(201).json({msg: "Services Created Successfuly"});
        } catch (error) {
            res.status(500).json({msg: error.message});
        }
    })
}

export const updateService = async (req, res)=> {
    const service = await Service.findOne({
        where:{
            id : req.params.id
        }
    });
    if(!service) return res.status(404).json({msg: "no Data found"});
    let nama = "";
    let fileName = "";
    let kete = "";
    if(req.title===null){
        nama = Service.name;
        kete = Service.ketser;
    }
    if(req.files === null){
        fileName = Service.image;
        kete = Service.ketser;
        // jika image kosong ID ADMIN upldate title tanpa update imagenya
    }else{
        const file = req.files.file;
        const fileSize = file.data.length;
        const ext = path.extname(file.name);
        fileName = file.md5 + ext;
        const allowedType = ['.png','.jpg','.jpeg'];

        if(!allowedType.includes(ext.toLowerCase())) return res.status(422).json({msg: "Invalid Images"});
        if(fileSize > 5000000) return res.status(422).json({msg: "Image must be less than 5 MB"});

        const filepath = `./public/images/imgService/${service.image}`;
        fs.unlinkSync(filepath);

        file.mv(`./public/images/imgService/${fileName}`, (err)=>{
            if(err) return res.status(500).json({msg: err.message})
        });
    }
    const name = req.body.title;
    const keterangan = req.body.ketser;
    const url = `${req.protocol}://${req.get("host")}/images/imgService/${fileName}`;
    try {
        await Service.update({name: name, image: fileName, ketser: keterangan, url: url}, {
            where: {
                [Op.and]:[{id: service.id}]
            }
        });
        res.status(200).json({msg: "Service updated successfully"});
    } catch (error) {
        console.log(error.message);
    }
}

export const deleteService = async (req, res)=> {
    const service = await Service.findOne({
        where:{
            id : req.params.id
        }
    });
    if(!service) return res.status(404).json({msg: "no Data found"});
    const {name, image, ketser, url} = req.body;

        const filepath = `./public/images/imgService/${service.image}`;
        fs.unlinkSync(filepath);
        try {
            await Service.destroy({
            where: {
                id : service.id
            }
        });

        res.status(200).json({msg: "Service deleted successfully"});
    } catch (error) {
        console.log(error.message);
    }
}