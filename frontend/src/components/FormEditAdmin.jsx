import React, {useState, useEffect} from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const FormEditAdmin = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confPassword, setConfPassword] = useState("");
    const [role, setRole] = useState("");
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();
    const {id} = useParams();

    useEffect(() => {
        const getAdminById = async() => {
            try {
                const response = await axios.get(`http://localhost:3636/admins/${id}`);
                setName(response.data.name);
                setEmail(response.data.email);
                setRole(response.data.role);
            } catch (error) {
                if (error.response) {
                    setMsg(error.response.data.msg);
                }
            }
        }
        getAdminById();
    },[id]);
    const updateAdmin = async (e) => {
        e.preventDefault();
        try {
            await axios.get(`http://localhost:3636/admins/email/${email}`)
                .then(function (response) {
                    console.log(response.data)
                    if (response.data.msg === true) {
                        console.log('belum ada')
                        axios.patch(`http://localhost:3636/admins/${id}`, {
                            name: name,
                            email: email,
                            password: password,
                            confPassword: confPassword,
                            role: role
                        }).then(function (response) {
                            // handle success
                            navigate("/admin/admins");
                        })
                    } else {
                        setMsg("Email Sudah Ada!");
                    }
                })

        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
            }
        }
};
return (
    <div className="py-4">
        <h1 className="title"> Admin </h1>
        <h2 className="subtitle"> Update Id</h2>
        <div className="card is-shadowless">
            <div className="card-content">
                <div className="content">
                <form onSubmit={updateAdmin}>
                <p className="has-text-centered">{msg}</p>
                    <div className="field">
                        <label className="label"> Nama </label>
                        <div className="control">
                            <input
                            type="text"
                            className="input"
                            value={name}
                            onChange={(e)=> setName(e.target.value)}
                            placeholder="Name"
                            />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label"> Email </label>
                        <div className="control">
                            <input
                            type="text"
                            className="input"
                            value={email}
                            onChange={(e)=> setEmail(e.target.value)}
                            placeholder="Email"
                            />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label"> Password </label>
                        <div className="control">
                            <input
                            type="password"
                            className="input"
                            value={password}
                            onChange={(e)=> setPassword(e.target.value)}
                            placeholder="******"
                            />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label"> Confirm Password </label>
                        <div className="control">
                            <input
                            type="password"
                            className="input"
                            value={confPassword}
                            onChange={(e)=> setConfPassword(e.target.value)}
                            placeholder="******"
                            />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label"> Role </label>
                        <div className="control">
                            <div className="select is-fullwidth">
                            <select value={role} onChange={(e)=> setRole(e.target.value)}>
                                    <option value="admin">Admin</option>
                                    <option value="user">User</option>
                                </select>
                            </div>
                        </div>
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

export default FormEditAdmin;