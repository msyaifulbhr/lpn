import React, {useState , useEffect} from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";

const FormEditBerita = () => {
    const [name, setName] = useState("");
    const [file, setFile] = useState("");
    const [keterangan, setKet] = useState("");
    const [msg, setMsg] = useState("");
    const [preview, setPreview] = useState("");
    const {id} = useParams();
    const navigate = useNavigate();
    const {admin} = useSelector((state) => state.auth);


    useEffect(() => {
        const getNewById = async () => {
            try {
                const response = await axios.get(`http://localhost:3636/news/${id}`
                );
                setName(response.data.name);
                setFile(response.data.image);
                setKet(response.data.ket);
            } catch (error) {
                if (error.response){
                    setMsg(error.response.data.msg);
                }
            }
        };
        getNewById();
    }, [id]);

    const loadImage = (e) => {
        const image = e.target.files[0];
        setFile(image);
        setPreview(URL.createObjectURL(image));
    };

    const updateNew = async(e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", name);
        formData.append("file", file);
        formData.append("ket", keterangan);
        try {
            await axios.patch(`http://localhost:3636/news/${id}`, formData,{
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            navigate("/admin/news");
        } catch (error) {
            if(error.response) {
                setMsg(error.response.data.msg);
            }
        }
    };

return (
    <div className="py-4">
        <h1 className="title"> Berita </h1>
        <h2 className="subtitle"> Add New Products</h2>
        <div className="card is-shadowless">
            <div className="card-content">
                <div className="content">
                <form onSubmit={updateNew}>
                <p className="has-text-centered">{msg}</p>
                    <div className="field">
                        <label className="label"> Nama Berita </label>
                        <div className="control">
                            <input
                            type="text"
                            className="input"
                            value={name} 
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Product Name"
                            />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label"> Images </label>
                        <div className="control">
                            <div className="file">
                                <label className="file-label">
                                    <input type="file" className="file-input" onChange={loadImage}/>
                                    <span className="file-cta">
                                    <span className="file-label">Choose a File </span>
                                    </span>
                                </label>
                            </div>
                        </div>
                    </div>
                    {preview ?(
                    <figure className="image is-128x128">
                        <img src={preview} alt="preview images" />
                    </figure>
                    ):(
                    ""
                    )}
                    <div className="field">
                        <label className="label"> Keterangan </label>
                        <div className="control">
                            <input
                            type="text"
                            className="input"
                            value={keterangan} 
                            onChange={(e) => setKet(e.target.value)}
                            placeholder="Keterangan"
                            />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label"> Role </label>
                            {admin && admin.name}
                    </div>
                    <div className="field">
                        <div className="control">
                            <button type="submit" className="button is-success ">Update</button>
                        </div>
                    </div>
                </form>
                </div>
            </div>
        </div>
    </div>
);
};

export default FormEditBerita;