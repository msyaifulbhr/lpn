import React, {useState, useEffect} from 'react';
import axios from "axios";
import './App.css';
import NavbarCom from "../../inc/NavbarCom";
import Footer from "../../inc/Footer";


const MainLayanan = () => {

    const [Service, setService] = useState([]);
    
    useEffect(() =>{
        getService();
    },[]);

    const getService = async () => {
        const response = await axios.get('http://localhost:3636/services');
        setService(response.data);
    };

    return (
        <div>
            <NavbarCom/>
            <section className='py-3 bg-info'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-4 my-auto'>
                            <h4> Layanan </h4>
                        </div>
                        <div className='col-md-8 my-auto'>
                            <h6 className='float-end'> Home /  Layanan </h6>
                        </div>
                    </div>
                </div>
            </section> 

            <section className='section'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-12 text-center'>
                            <h3 className='main-heading'> LAYANAN KAMI </h3>
                            <div className='underline mx-auto'></div>
                            <p className='pTit'>" Ship Services You Can Count On "
                            </p>
                            <p className='pTit'>" Kami bekerja untuk KEPUASAN ANDA dan kepuasan Anda Adalah PRIORITAS UTAMA KAMI "
                            </p>
                        </div>
                    </div>
                </div>
            </section>


            <section className='section border-top'>
                <div className='container'>

                    {/* Card 1 */}
                    {Service.map((service, index) => (
                    <div className='row mb-6'>
                        <div className='col-md-4'>
                            <div className='card shadow'>
                                <img src={`http://localhost:3636/images/imgService/${service.image}`} className='imgser' alt='Services' />
                            </div>
                        </div>
                        <div className='card-body col-md-7 ml-3'>
                                    <h6> {`${service.name}`} </h6>
                                    <div className='underline'></div>
                                    <p> {`${service.ketser}`} </p>
                        </div>
                    </div>
                    ))}

                </div>
            </section>

        <Footer/>
        </div>
    )
}

export default MainLayanan