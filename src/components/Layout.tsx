import Header from "./Header"
import { Outlet } from "react-router-dom"

const Layout = () => {
    return (
        <>
            <Header />
            <main>
                <Outlet />
            </main>
            <footer>
                <p>Moment 3 | Fördjupad frontend-utvleckling | Emma Ådahl Görling</p>
            </footer>
        </>
    )
}

export default Layout