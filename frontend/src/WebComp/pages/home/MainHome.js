import React, {useState, useEffect} from 'react';
import './App.css';
import Slider from '../../inc/Slider';
import {Link} from 'react-router-dom';
import axios from "axios";
import NavbarCom from "../../inc/NavbarCom";
import Footer from "../../inc/Footer";
import moment from 'moment';
import 'moment/locale/id';

const MainHome = () => {

    const [News, setNews] = useState([]);
    
    useEffect(() =>{
        getNews();
    },[]);

    const getNews = async () => {
        const response = await axios.get('http://localhost:3636/news');
        setNews(response.data);
    };

    return (
        <div>
            <NavbarCom/>
            <Slider/>

            <section className='section'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-12 text-center mb-4'>
                            <h3 className='main-heading'> Sejarah PT. Layar Perkasa Nusantara </h3>
                            <div className='underline mx-auto'></div>
                            <h6 className='mt-4 mb-4'>
                            PT. Layar Perkasa Nusantara didirikan sebagai perusahaan pelayaran pada tahun 2012. Sejak itu, perusahaan telah memperluas layanannya untuk mencakup teknik mesin, sipil dan perbaikan kapal pada tahun 2014, dan kemudian terdaftar sebagai badan hukum pada tahun 2020. Galangan kapal ini berlokasi di Barru, provinsi Sulawesi Selatan, dan memiliki keahlian dalam arsitektur kapal serta seluruh aspek operasi kelautan, termasuk desain dan modifikasi segala jenis kapal, perbaikan kapal, dan overhaul mesin.
                            </h6>
                            <Link to='/about' className="btn btn-warning shadow">Read More</Link>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-md-12 mb-4 text-center'>
                            <h3 className='main-heading'> NEWS / BERITA </h3>  
                            <div className='underline mx-auto'></div>
                        </div>

                        {/* TESTES */}
                        {News.map((news, index) => (
                        <div key={news.id} className='col-md-4 '>
                            <div className='card shadow'>
                                <div className='card-body'>
                                    <img src={`http://localhost:3636/images/imgNews/${news.image}`} className='imgBer border-bottom' alt='...' />
                                    <h6 className='title text-center mt-4'> {`${news.name}`} </h6>
                                    <p>
                                        {news.ket.substring(0, 250)+"..."}
                                    </p>
                                    <p>{"Tanggal Dibuat : " + moment(news.createdAt).format('dddd, DD MMMM YYYY')}</p>
                                    <Link to={`/news/${news.id}`} className='btn btn-link'> Read More </Link>
                                </div>
                            </div>
                        </div>
                        ))}

                    </div>
                </div>
            </section>

            {/* Our Service */}
            <section className='section border-top'>
                <div className='container'>
                    
                </div>
            </section>
            <Footer/>
        </div>
        
    )
}

export default MainHome;