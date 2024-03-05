import React from 'react';
import './App.css';
import {Link} from 'react-router-dom';
import Logo from '../../logolpn.png'

const Footer = () => {
    return (
        // <div>
            <section className='section footer bg-dark text-white'>
                <div className='containter text-center'>
                    <div className='row'>
                        <div className='col-md-2'>
                            <img src={Logo} className='logoFoo' alt='logo'/>

                        </div>
                        <div className='col-md-3'>
                            <h6> Information</h6>
                            <hr/>
                            <p className='text-white'>
                            PT. LPN Shipyard memiliki area yang luas dan dilengkapi peralatan terbaik untuk memastikan semua kebutuhan layanan Kapal Anda terpenuhi seluruhnya.
                            </p>
                        </div>
                        <div className='col-md-4'>
                            <h6> Jam Kerja </h6>
                            <hr/>
                            Monday - Friday : <span class="text-right"> 08:00 - 16:00 </span>
                            <br/>
                            Saturday - Sunday : <span class="text-right"> 08:00 - 16:00 </span>
                        </div>
                        <div className='col-md-3'>
                            <h6> Link </h6>
                            <hr/>
                            <div><Link to='/'>Home</Link></div>
                            <div><Link to='/layanan'>Layanan</Link></div>
                            <div><Link to='/about'>About</Link></div>
                            <div><Link to='/contact'>Contact</Link></div>
                        </div>
                    </div>
                </div>
            </section>
        // </div>
    )
}

export default Footer