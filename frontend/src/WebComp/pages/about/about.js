import React from 'react';
import './App.css';
// import { Card } from "react-bootstrap";

import ReactMarkdown from 'react-markdown';

const MainAbout = (props) => {
        return(
            // <Card style={{ width: '18rem' }}>
            // <Card.Body>
            //     <Card.Title>{props.SubTitle}</Card.Title>
            //     <Card.Text>
            //     <p>{props.description}</p>
            //     </Card.Text>
            // </Card.Body>
            // </Card>

            <ReactMarkdown components={{
                // Use h2s instead of h1s
                p: 'p',
                // Use a component instead of hrs
            }}>
                {props.description}
            </ReactMarkdown>
        )
    };

export default MainAbout;