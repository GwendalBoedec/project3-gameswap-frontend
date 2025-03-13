import { NavLink, Link } from "react-router-dom";
import "../styles/navbar.css"; 
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { AppShell, Burger } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import { Button, Text, Container } from '@mantine/core';

function Navbar() {
    const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
    console.log("user", user)
    return (
        <AppShell> 
        <nav>
                    <ul className="nav-links">
            <li>
                <NavLink to="/">
                    Home
                </NavLink>
            </li>
            {isLoggedIn &&(
                <>
                <li>
                <NavLink to="/myprofile">
                    My Profile
                </NavLink>
                </li>
                <li>
                <NavLink to="/community">
                    Our Community
                </NavLink>
                </li>
                <li>
                <NavLink to="/myprofile/addgame">
                    <Button>Add a game to your collection</Button>
                </NavLink>
            </li>
                <NavLink to="/">
                <Button onClick={logOutUser}>Logout</Button>
                </NavLink>
                <span> Hi {user && user.username ? user.username : "Loading"} !</span>

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
       
        </AppShell>
        
    )
}

export default Navbar