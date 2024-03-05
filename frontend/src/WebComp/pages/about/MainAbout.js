import React, {useState, useEffect} from 'react';
import axios from "axios";
import './App.css';
import NavbarCom from "../../inc/NavbarCom";
import Footer from "../../inc/Footer";

const MainAbout = () => {

    const [About, setAbout] = useState([]);
    console.log(About)
    
    useEffect(() =>{
        getAbout();
    },[]);

    const getAbout = async () => {
        const response = await axios.get('http://localhost:3636/abouts');
        setAbout(response.data);
    };

    function RenderList({ list }) {
        return <>
            {list.map((text, index) => <p key={index}>{text}</p>)}
        </>
    }
    
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
                <h3 className='main-heading text-center'> SEJARAH </h3>

                {About.map((about, index) => (
                    <div className='row'>
                        <div className='col-md-12'>
                            <div className='underline mx-auto'></div>
                            <RenderList list={about.history.split("<p>")}/>
                        </div>
                    </div>
                    ))}

                
                    <div className='row mt-5'>
                        <div className='col-md-12 text-center'>
                            <h3 className='main-heading'> Vision, Mision And Values </h3>
                            <div className='underline mx-auto'></div>
                        </div>

                        {About.map((about, index) => (
                        <div className='col-md-4 '>
                            <h5 className='vismisval text-center'> Our Vision </h5>
                            <RenderList list={about.vision.split("<p>")}/>
                        </div>
                        ))}




                        {About.map((about, index) => (
                        <div className='col-md-4 '>
                            <h5 className='vismisval text-center'>Our Mision</h5>
                            <RenderList list={about.mision.split("<p>")}/>
                        </div>
                        ))}




                        {About.map((about, index) => (
                        <div className='col-md-4 '>
                            <h5 className='vismisval text-center'>Our Values</h5>
                            <RenderList list={about.values.split("<p>")}/>
                        </div>
                        ))}

                    </div>

                </div>
            </section>

        <Footer/>
        </div>
    )
}

export default MainAbout;