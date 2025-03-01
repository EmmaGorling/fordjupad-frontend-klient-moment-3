import './Header.scss'
import { NavLink } from "react-router-dom"
import { useAuth } from "../context/authContext"

const Header = () => {

    const { user, logout } = useAuth();



    return (
        <header>
            <div className="shade">
                <ul className={user ? "loged-in" : ""}>
                    
                    {
                        user && (
                            <>
                                <li><NavLink to="/">Min blogg</NavLink></li>
                                <li><NavLink to="/createpost">Skapa inlägg</NavLink></li>
                            </>
                        )
                    }
                    <li>
                        {
                            !user ? <NavLink to="/login">Logga in</NavLink> : <button onClick={logout}>Logga ut</button>
                        }
                    </li>
                </ul>
                <h1>Emma Görling</h1>
            </div>
        </header>
    )
}

export default Header