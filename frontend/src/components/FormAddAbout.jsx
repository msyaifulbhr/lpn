import React, {useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";

const FormAddAbout = () => {
    const [history, setHistory] = useState("");
    const [vision, setVision] = useState("");
    const [mision, setMision] = useState("");
    const [values, setValues] = useState("");
    const [msg, setMsg] = useState("");
    const {admin} = useSelector((state) => state.auth);
    console.log(admin, 'login sebagai')
    const navigate = useNavigate();

    const saveAbout = async(e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:3636/abouts", {
                history: history,
                vision: vision,
                mision: mision,
                values: values,
                userId : admin.id
            });
            navigate("/admin/abouts");
        } catch (error) {
            if(error.response) {
                setMsg(error.response.data.msg);
            }
        }
    };

return (
    <div className="py-4">
        <h1 className="title"> About </h1>
        <h2 className="subtitle"> Add New About </h2>
        <div className="card is-shadowless">
            <div className="card-content">
                <div className="content">
                <form onSubmit={saveAbout}>
                <p className="has-text-centered">{msg}</p>
                    <div className="field">
                        <label className="label"> History </label>
                        <div className="control">
                            <input
                            type="text"
                            className="input"
                            value={history}
                            onChange={(e)=> setHistory(e.target.value)}
                            placeholder="history"
                            />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label"> Vision </label>
                        <div className="control">
                            <input
                            type="text"
                            className="input"
                            value={vision}
                            onChange={(e)=> setVision(e.target.value)}
                            placeholder="vision"
                            />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label"> Mision </label>
                        <div className="control">
                            <input
                            type="text"
                            className="input"
                            value={mision}
                            onChange={(e)=> setMision(e.target.value)}
                            placeholder="mision"
                            />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label"> Values </label>
                        <div className="control">
                            <input
                            type="text"
                            className="input"
                            value={values}
                            onChange={(e)=> setValues(e.target.value)}
                            placeholder="values"
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

export default FormAddAbout;