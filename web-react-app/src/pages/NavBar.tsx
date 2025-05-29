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
                <li className="colabora"> <Link to="Colaborate"> Colabora </Link>
                    <ul className="desplegable-contenido">
                        <li><Link to="Donar">Donar</Link></li>
                        <li><Link to="Adoptar">Adoptar</Link></li>
                        <li><Link to="Reportar">Reportar</Link></li>
                        
                    </ul>
                </li>
            </ul>
        </nav>
    );
};

export default NavBar;