import React from 'react';
import {Link} from 'react-router-dom';
import logoWeb from '../img/favicon32x32-transparente.png';

const NavBar = () => {
    return (
        <nav>
            <img src={logoWeb} className="logo-gatos-unidos" />
            <ul>
                <li> <Link to="Gatos"> Gatos </Link> </li>
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