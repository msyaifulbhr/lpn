import React, {useState, useEffect} from 'react';
import Carousel from 'react-bootstrap/Carousel';
import axios from "axios";

const Slider = () => {

    const [Heros, setHeros] = useState([]);
    
    useEffect(() =>{
        getHero();
    },[]);

    const getHero = async () => {
        const response = await axios.get('http://localhost:3636/heros');
        setHeros(response.data);
    };

    return (
        <Carousel data-bs-theme="light">
            {Heros.map((hero, index) => (
            <Carousel.Item>
                <img
                className="d-block w-100"
                src={`http://localhost:3636/images/imgHero/${hero.image}`}
                alt="First slide"
                />
                <Carousel.Caption>
                <h5>{`${hero.name}`}</h5>
                <p className='text-light'>{`${hero.kether}`}</p>
                </Carousel.Caption>
            </Carousel.Item>
            ))}
            </Carousel>
            
    );
}

export default Slider;