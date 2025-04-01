import React from 'react';
import {Link} from 'react-router-dom';
import logoWeb from '../img/logo-gatos-unidos.png';

const NavBar = () => {
    return (
        <nav>
            <img src={logoWeb} className="imgLogo" />
            <ul>
                <li> <Link to="Index"> Inicio </Link> </li>
                <li> <Link to="AboutUs"> ¿Quiénes Somos? </Link> </li>
                <li> <Link to="Clinics"> Clinicas </Link> </li>
                <li> <Link to="Colaborate"> Colabora </Link> </li>
                <li> <Link to="ContactUs"> Contacto </Link> </li>
                <li> <Link to="PersonalArea"> Area personal </Link> </li>
            </ul>
        </nav>
    );
};

export default NavBar;