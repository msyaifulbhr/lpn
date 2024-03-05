import React from 'react';
import './App.css';
import NavbarCom from "../../inc/NavbarCom";
import Footer from "../../inc/Footer";
import { SocialIcon } from 'react-social-icons'

const MainContact = () => {
    return (
        <div>
        <NavbarCom/>
            <section className='py-3 bg-info'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-4 my-auto'>
                            <h4> Contact </h4>
                        </div>
                        <div className='col-md-8 my-auto'>
                            <h6 className='float-end'> Home /  Contact </h6>
                        </div>
                    </div>
                </div>
            </section> 


            <section className='section'>
                <div className='container'>
                    <div className='card shadow'>
                        <div className='card-body'>
                            <div className='row'>
                                <div className='col-md-6'>
                                    <div className='map-section'>
                                        <div className='gmap-frame'>
                                        <iframe id='gmap_canvas' width="100%" height="400" title='lpn' frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?width=100%25&amp;height=400&amp;hl=en&amp;q=PT.%20LPN%20SHIPYARD,%20Jl.%20Poros%20Makassar%20Makassar%20-%20Pare-Pare%20No.Km%20129,%20Batupute,%20Kec.%20Soppeng%20Riaja,%20Kab.%20Barru,%20Sulawesi%20Selatan%2090752+(PT.%20LPN%20SHIPYARD)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"><a href="https://www.maps.ie/population/">Calculate population in area</a></iframe>
                                        </div>
                                    </div>
                                </div>

                                <div className='col-md-6 border-start'>
                                    <h5 className='main-heading'> Address Information </h5>
                                    <div className='underline mb-4'></div>
                                    <div class="container">

                                        <div class="row align-items-start mb-5">
                                            <div class="col-4 ">
                                            Call Us
                                            </div>
                                            <div class="col-8">
                                            <h6>(0411) 871108</h6>
                                            <h6>(0427) 3230811</h6>
                                            <h6p>(+62) 812 4415 8203</h6p>
                                            </div>
                                        </div>

                                        <div class="row align-items-end mb-5">
                                            <div class="col-4 ">
                                            Email Us
                                            </div>
                                            <div class="col-8">
                                            marketing@ptlpn.com
                                            </div>
                                        </div>

                                        <div class="row align-items-end mb-5">
                                            <div class="colalamat col-4 py-4">
                                            Alamat
                                            </div>
                                            <div class=" col-8">
                                            Jl. Poros Makassar Makassar - Pare-Pare No.Km 129, Batupute, Kec. Soppeng Riaja, Kab. Barru, Sulawesi Selatan 90752, Indonesia
                                            </div>
                                        </div>

                                        <div class="row align-items-end mb-5">
                                            <div class="sosmed col-4 ">
                                            Sosial Media
                                            </div>
                                            <div class="col-8">
                                            <SocialIcon url="https://web.facebook.com/PTLayarPerkasaNusantara/photos/?_rdc=1&_rdr" className='facebook'/>
                                            <SocialIcon url="https://www.instagram.com/lpn.shipyard/?hl=de" className='instagram'/>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        <Footer/>
        </div>
    )
}

export default MainContact;