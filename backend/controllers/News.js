import News from "../models/NewsModels.js";
import Admin from "../models/AdminModel.js";
import { Op } from "sequelize";
import path from "path";
import fs from "fs";

export const getNews = async (req, res) => {
    try {
        let response;
        response = await News.findAll({
            attributes: ['id', 'uuid', 'name', 'image', 'ket', 'url','userId', 'createdAt', 'updatedAt'],
            include: [{
                model: Admin
            }]
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const getNewById = async (req, res) => {
    try {
        console.log(req.params);
        const news = await News.findOne({
            where: {
                id: req.params.id
            }
        });
        if (!news) return res.status(404).json({ msg: "Data tidak ditemukan" });
        let response;
        response = await News.findOne({
            attributes: ['id', 'uuid', 'name', 'image', 'ket', 'url','userId', 'createdAt', 'updatedAt'],
            where: {
                id: news.id
            },
            include: [{
                model: Admin
            }]
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const createNew = async (req, res) => {
    if (req.files === null) return res.status(400).json({ msg: "No File Uploaded" });
    const name = req.body.title;
    const file = req.files.file;
    const keterangan = req.body.ket;
    const uid = req.body.userId;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    const fileName = file.md5 + ext;
    const url = `${req.protocol}://${req.get("host")}/images/imgNews/${fileName}`;
    const allowedType = ['.png', '.jpg', '.jpeg'];

    if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ msg: "Invalid Images" });
    if (fileSize > 5000000) return res.status(422).json({ msg: "Image must be less than 5 MB" });

    file.mv(`./public/images/imgNews/${fileName}`, async (err) => {
        if (err) return res.status(500).json({ msg: err.message });
        try {
            await News.create({
                name: name,
                image: fileName,
                ket: keterangan,
                url: url,
                userId: uid
            });
            res.status(201).json({ msg: "NEWS Created Successfuly" });
        } catch (error) {
            res.status(500).json({ msg: error.message });
        }
    })
}

export const updateNew = async (req, res) => {
    const news = await News.findOne({
        where: {
            id: req.params.id
        }
    });
    if (!news) return res.status(404).json({ msg: "no Data found" });
    let nama = "";
    let fileName = "";
    let kete = "";
    if (req.title === null) {
        nama = News.name;
        kete = News.ket;
    }
    if (req.files === null) {
        fileName = News.image;
        kete = News.ket;
        // jika image kosong ID ADMIN upldate title tanpa update imagenya
    } else {
        const file = req.files.file;
        const fileSize = file.data.length;
        const ext = path.extname(file.name);
        fileName = file.md5 + ext;
        const allowedType = ['.png', '.jpg', '.jpeg'];

        if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ msg: "Invalid Images" });
        if (fileSize > 5000000) return res.status(422).json({ msg: "Image must be less than 5 MB" });

        const filepath = `./public/images/imgNews/${news.image}`;
        fs.unlinkSync(filepath);

        file.mv(`./public/images/imgNews/${fileName}`, (err) => {
            if (err) return res.status(500).json({ msg: err.message })
        });
    }
    const name = req.body.title;
    const keterangan = req.body.ket;
    const url = `${req.protocol}://${req.get("host")}/images/imgNews/${fileName}`;
    try {
        await News.update({ name: name, image: fileName, ket: keterangan, url: url }, {
            where: {
                [Op.and]: [{ id: news.id }]
            }
        });
        res.status(200).json({ msg: "NEWS updated successfully" });
    } catch (error) {
        console.log(error.message);
    }
}

export const deleteNew = async (req, res) => {
    const news = await News.findOne({
        where: {
            id: req.params.id
        }
    });
    if (!news) return res.status(404).json({ msg: "no Data found" });
    const {name, image, ket, url} = req.body;
        const filepath = `./public/images/imgNews/${news.image}`;
        fs.unlinkSync(filepath);
        try {
            await News.destroy({
            where: {
                id: news.id
            }
        });
        
        res.status(200).json({ msg: "NEWS deleted successfully" });
    } catch (error) {
        console.log(error.message);
    }
}