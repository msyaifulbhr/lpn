import Heros from "../models/HeroModel.js";
import Admin from "../models/AdminModel.js";
import {Op} from "sequelize";
import path from "path";
import fs from "fs";

export const getHeros = async (req, res)=> {
    try {
        let response;
        response = await Heros.findAll({
            attributes: ['id', 'uuid', 'name', 'image', 'kether', 'url', 'createdAt', 'updatedAt'],
            include: [{
                model: Admin
            }]
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const getHeroById = async (req, res)=> {
    try {
        const heros = await Heros.findOne({
            where:{
                id: req.params.id
            }
        });
        if(!heros) return res.status(404).json({msg: "Data tidak ditemukan"});
        let response;
        response = await Heros.findOne({
            attributes: ['uuid', 'name', 'image', 'kether', 'url','userId', 'createdAt', 'updatedAt'],
            where: {
                id: heros.id
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

export const createHero = async (req, res)=> {
    if(req.files === null) return res.status(400).json({msg: "No File Uploaded"});
    const name = req.body.title;
    const file = req.files.file;
    const keterangan = req.body.kether;
    const uid = req.body.userId;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    const fileName = file.md5 + ext;
    const url = `${req.protocol}://${req.get("host")}/images/imgHero/${fileName}`;
    const allowedType = ['.png','.jpg','.jpeg'];

    if(!allowedType.includes(ext.toLowerCase())) return res.status(422).json({msg: "Invalid Images"});
    if(fileSize > 5000000) return res.status(422).json({msg: "Image must be less than 5 MB"});

    file.mv(`./public/images/imgHero/${fileName}`, async (err)=>{
        if(err) return res.status(500).json({msg: err.message});
        try {
            await Heros.create({
                name: name,
                image: fileName,
                kether: keterangan,
                url: url,
                userId: uid
            });
            res.status(201).json({msg: "Hero Created Successfuly"});
        } catch (error) {
            res.status(500).json({msg: error.message});
        }
    })
}

export const updateHero = async (req, res)=> {
    const heros = await Heros.findOne({
        where:{
            id : req.params.id
        }
    });
    if(!heros) return res.status(404).json({msg: "no Data found"});
    let nama = "";
    let fileName = "";
    let keter = "";
    if(req.title===null){
        nama = Heros.name;
        keter = Heros.kether;
    }
    if(req.files === null){
        fileName = Heros.image;
        keter = Heros.kether;
        // jika image kosong ID Admin upldate title tanpa update imagenya
    }else{
        const file = req.files.file;
        const fileSize = file.data.length;
        const ext = path.extname(file.name);
        fileName = file.md5 + ext;
        const allowedType = ['.png','.jpg','.jpeg'];

        if(!allowedType.includes(ext.toLowerCase())) return res.status(422).json({msg: "Invalid Images"});
        if(fileSize > 5000000) return res.status(422).json({msg: "Image must be less than 5 MB"});

        const filepath = `./public/images/imgHero/${heros.image}`;
        fs.unlinkSync(filepath);

        file.mv(`./public/images/imgHero/${fileName}`, (err)=>{
            if(err) return res.status(500).json({msg: err.message})
        });
    }
    const name = req.body.title;
    const keterangan = req.body.kether;
    const url = `${req.protocol}://${req.get("host")}/images/imgHero/${fileName}`;
    try {
        await Heros.update({name: name, image: fileName, kether: keterangan, url: url},{
            where: {
                [Op.and]:[{id: heros.id}]
            }
        });
        res.status(200).json({msg: "Hero updated successfully"});
    } catch (error) {
        console.log(error.message);
    }
}

export const deleteHero = async (req, res)=> {
    const heros = await Heros.findOne({
        where:{
            id : req.params.id
        }
    });
    if(!heros) return res.status(404).json({msg: "no Data found"});
    const {name, image, kether, url} = req.body;
    
        const filepath = `./public/images/imgHero/${heros.image}`;
        fs.unlinkSync(filepath);
        try {
            await Heros.destroy({
            where: {
                id : heros.id
            }
        });
        
        res.status(200).json({msg: "Hero deleted successfully"});
    } catch (error) {
        console.log(error.message);
    }
}