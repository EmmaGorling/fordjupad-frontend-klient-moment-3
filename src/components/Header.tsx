import { NavLink } from "react-router-dom"
import { useAuth } from "../context/authContext"

const Header = () => {

    const { user, logout } = useAuth();



    return (
        <header>
            <h1>Bloggy</h1>
            <ul>
                <li><NavLink to="/">Start</NavLink></li>
                {
                    user && <li><NavLink to="/createpost">Skapa inlägg</NavLink></li>
                }
                {
                    user && <li>Inloggad som {user.firstName} {user.lastName}</li>
                }
                <li>
                    {
                        !user ? <NavLink to="/login">Logga in</NavLink> : <button onClick={logout}>Logga ut</button>
                    }
                </li>
            </ul>
        </header>
    )
}

export default Header