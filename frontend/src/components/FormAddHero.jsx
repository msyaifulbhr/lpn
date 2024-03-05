import React, {useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";

const FormAddHero = () => {
    const [title, setName] = useState("");
    const [file, setFile] = useState("");
    const [keterangan, setKetHer] = useState("");
    const [msg, setMsg] = useState("");
    const [preview, setPreview] = useState("");
    const navigate = useNavigate();
    const {admin} = useSelector((state) => state.auth);
    console.log(admin, 'login sebagai')

    const loadImage = (e) => {
        const image = e.target.files[0];
        setFile(image);
        setPreview(URL.createObjectURL(image));
    };

    const saveHero = async(e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", title);
        formData.append("file", file);
        formData.append("kether", keterangan);
        formData.append("userId", admin.id);
        try {
            await axios.post("http://localhost:3636/heros", formData,{
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            navigate("/admin/heros");
        } catch (error) {
            if(error.response) {
                setMsg(error.response.data.msg);
            }
        }
    };

return (
    <div className="py-4">
        <h1 className="title"> Hero </h1>
        <h2 className="subtitle"> Add New Hero </h2>
        <div className="card is-shadowless">
            <div className="card-content">
                <div className="content">
                <form onSubmit={saveHero}>
                <p className="has-text-centered">{msg}</p>
                    <div className="field">
                        <label className="label"> Hero </label>
                        <div className="control">
                            <input
                            type="text"
                            className="input"
                            value={title} 
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
                            onChange={(e) => setKetHer(e.target.value)}
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
                            <button type="submit" className="button is-success ">Save</button>
                        </div>
                    </div>
                </form>
                </div>
            </div>
        </div>
    </div>
);
};

export default FormAddHero;