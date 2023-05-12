import { useNavigate, Link } from "react-router-dom";
import iOLogo from '../io-logo.jpg'

const Admin = (props) => {
    const navigate = useNavigate()

    const handleLogout = () => {
        fetch('/adminlogout', {//ADD URL
            method: "GET",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json"
            }
        }
        ).then((response) => {
            response.status == 200 ?
                navigate("/") :
                navigate("/admin-logout/failure")
        })
    }

    return (
        <div>
            <nav className="bg-amber-300 p-4">
                <button className="ease-in-out delay-150 duration-300 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow" onClick={handleLogout}>Logout</button>
            </nav>
            <div className="flex flex-col gap-4 items-center justify-center pt-10">
                <img className="max-w-sm pt-10" src={iOLogo} alt="iO academy logo" />
                <h1 className="text-4xl p-1 text-center">Admin</h1>
            </div>
            <div className="flex flex-row gap-4 justify-center pt-10">
                <Link className="ease-in-out delay-150 duration-300 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow" to="today">Today</Link>
                <Link className="ease-in-out delay-150 duration-300 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow" to="history">History</Link>
            </div>
        </div>
    )
}

export default Admin