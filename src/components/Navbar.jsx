import { NavLink, Link } from "react-router-dom";
import "../styles/navbar.css";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { AppShell, Button } from '@mantine/core';



function Navbar() {
    const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

    console.log("user", user)
    return (

        <nav>
            <ul className="nav-links">

                <li>
                    <NavLink to="/" >
                        <img src="./joystick logo navbar.png"></img>
                    </NavLink>
                </li>

                <li className="home">
                    <NavLink to="/">
                        Home
                    </NavLink>
                </li>
                {isLoggedIn && (
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
                        <li className="logout" >
                            <NavLink to="/myprofile/addgame">
                                <Button 
                                color="#5315c6">Add a game to your collection</Button>
                            </NavLink>
                        </li>
                        <li className="logout">
                        <NavLink to="/">
                            <Button color="#736294" onClick={logOutUser}>Logout</Button>
                        </NavLink>
                        </li>
                        <span> Hi {user && user.username ? user.username : "Loading"} !</span>

                    </>
                )}
                {!isLoggedIn && (
                    <>
                        <li>
                            <NavLink to="/signup">
                                Sign up
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/login">
                                Login
                            </NavLink>
                        </li>

                    </>
                )}

            </ul>

        </nav>

    )
}

export default Navbar