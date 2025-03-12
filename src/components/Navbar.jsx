import { Link } from "react-router-dom";
import "../styles/navbar.css"; 
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

function Navbar() {
    const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
    return (
        
        <nav>
            <ul className="nav-links">
            <li>
                <Link to="/">
                    Home
                </Link>
            </li>
            {isLoggedIn &&(
                <>
                <li>
                <Link to="/myprofile">
                    My Profile
                </Link>
                </li>
                <li>
                <Link to="/myprofile">
                    Our Community
                </Link>
                </li>
                <li>
                <Link to="/myprofile/addgame">
                    <button>Add a game to your collection</button>
                </Link>
            </li>
                <Link to="/">
                <button onClick={logOutUser}>Logout</button>
                </Link>
                <span>{user && user.name}</span>
                </>
            )}
            {!isLoggedIn && (
                <>
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
            </>
            )}
            
            </ul>
        </nav>
    )
}

export default Navbar