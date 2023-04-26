import { Link } from "react-router-dom"
import iOLogo from "../io-logo.jpg"

const Home = () => {
    return (
        <div>
            <nav className="bg-amber-300 p-4">
                <Link className="ease-in-out delay-150 duration-300 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow" to="/admin-login">Admin</Link>
            </nav>
            <div className="flex flex-col gap-4 items-center justify-center pt-10">
                <img className="max-w-sm pt-10" src={iOLogo} alt="iO academy logo" />
                <h1 className="text-3xl p-1 text-center">Visitor sign-in</h1>
                <h2 className="text-center p-1">Please sign in or out of the office below</h2>
            </div>
            <div className="flex flex-row gap-4 items-center justify-center pt-10">
                <Link className="transition ease-in-out delay-150 bg-white hover:-translate-y-1 hover:scale-110 duration-300 hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow" to="/sign-in">Sign In</Link>
                <Link className="transition ease-in-out delay-150 bg-white hover:-translate-y-1 hover:scale-110 duration-300 hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow" to="/sign-out">Sign Out</Link>
            </div>
        </div>


    )
}

export default Home