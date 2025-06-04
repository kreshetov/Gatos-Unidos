import {Link} from 'react-router-dom';

const NavBar = () => {
    return (
        <nav>
            <img src="https://storagegatosunidos.blob.core.windows.net/imagenes/favicon32x32-transparente.png" alt="logoGatosUnidos" className="logo-gatos-unidos" />
            <ul>
                <li> <Link to="Gatos"> Gatos </Link> </li>
                <li> <Link to="AboutUs"> ¿Quiénes Somos? </Link> </li>
                <li> <Link to="Clinics"> Clinicas </Link> </li>
                <li className="colabora"> <Link to="Colaborate"> Colabora </Link>
                    <ul className="desplegable-contenido">
                        <li><Link to="Donar">Donar</Link></li>
                    </ul>
                </li>
                <li> <Link to="/admin">Admin</Link></li>
            </ul>
        </nav>
    );
};

export default NavBar;