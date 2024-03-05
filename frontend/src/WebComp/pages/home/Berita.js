import React, {useState, useEffect} from 'react';
import './App.css';
import axios from "axios";
import NavbarCom from "../../inc/NavbarCom";
import Footer from "../../inc/Footer";
import { useParams} from "react-router-dom";

const Berita = () => {
    const [name, setName] = useState("");
    const [file, setFile] = useState("");
    const [keterangan, setKet] = useState("");
    const [msg, setMsg] = useState("");
    const {id} = useParams();

useEffect(() => {
    const getNewById = async () => {
        try {
            const response = await axios.get(`http://localhost:3636/news/${id}`);
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


    return (
        <div>
            <NavbarCom/>
            <section className='py-3 bg-info'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-4 my-auto'>
                            <h4> News </h4>
                        </div>
                        <div className='col-md-8 my-auto'>
                            <h6 className='float-end'> Home /  News </h6>
                        </div>
                    </div>
                </div>
            </section> 

            <section className='section'>
                <div className='container'>
                    <p>{msg}</p>
                    <div className='row'>
                    
                        <div className='col-md-12 mb-3'>
                            <h3 className='main-heading text-center'> {name} </h3>
                                <div className='underline mx-auto'></div>
                        </div>
                        <div className='col-12 text-center'>
                            <img src={`http://localhost:3636/images/imgNews/${file}`} class="imagesNews" alt="..."/>
                        </div>

                        <div className='col-md-12 mb-4 mt-3'>
                            <p className='sejket'>
                            {keterangan}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

        <Footer/>
        </div>
    )
}

export default Berita