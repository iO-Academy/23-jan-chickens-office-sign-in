import { useNavigate, Link } from "react-router-dom";
import iOLogo from '../io-logo.jpg'
const Admin = () => {
    const navigate = useNavigate()
    setTimeout(function () {
        //set login to false
        navigate("/adming-login");
    }, 500000);

    return (
        <>
            <nav className="bg-amber-300 p-4 flex flex-row justify-between">
                <Link className="ease-in-out delay-150 duration-300 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow" to="/">Logout</Link>
                <div className="flex flex-row gap-4 justify-center">
                    <button className="ease-in-out delay-150 duration-300 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">Today</button>
                    <button className="ease-in-out delay-150 duration-300 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">History</button>
                </div>
            </nav>
            <div className="flex flex-col gap-4 items-center justify-center pt-10">
                <img className="max-w-sm pt-10" src={iOLogo} alt="iO academy logo" />
                <h1 className="text-4xl p-1 text-center">Admin</h1>
            </div>
        </>
    )
}

export default Admin