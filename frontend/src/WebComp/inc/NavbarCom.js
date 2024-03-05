import React from 'react';
import {Navbar, Container, Nav} from 'react-bootstrap';

const NavbarCom = () => {
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
        <Container >
        <Navbar.Brand className='navbarrr' style={{ maxHeight: '100px' }}>PT. LAYAR PERKASA NUSANTARA</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
            <Nav
            className="ml-auto"
            style={{ maxHeight: '100px' }}
            navbarScroll
            >
            <Nav.Link href="/"> Home </Nav.Link>
            <Nav.Link href="/layanan"> Services </Nav.Link>
            <Nav.Link href="/about"> About </Nav.Link>
            <Nav.Link href="/contact"> Contact </Nav.Link>
        </Nav>
        </Navbar.Collapse>
    </Container>
    </Navbar>
)
}

export default NavbarCom;