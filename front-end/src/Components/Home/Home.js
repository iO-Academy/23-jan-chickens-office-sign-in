import { Link } from "react-router-dom"

const Home = () => {
    return (
        <>
            <nav>
                <Link to="/admin-login">Admin</Link>
            </nav>
            <h1>iO Academy visitor sign-in</h1>
            <h2>Please sign in or out of the office below</h2> 
            <div>
                <Link to="/sign-in">Sign In</Link>
                <Link to="/sign-out">Sign Out</Link>
            </div>
        </>
    )
}

export default Home