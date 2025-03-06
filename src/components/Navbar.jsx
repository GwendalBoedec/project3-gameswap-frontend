import { Link } from "react-router-dom";
import "../styles/navbar.css"

function Navbar() {
    return (

        <nav>
            <ul className="nav-links">
            <li>
                <Link to="/">
                    Home
                </Link>
            </li>
            <li>
                <Link to="/signup">
                    Sign up
                </Link>
            </li>
            <li>
                <Link to="/login">
                    Login
                </Link>
            </li>
            </ul>
        </nav>
    )
}

export default Navbar