import { Link } from 'react-router-dom'
import iOLogo from '../io-logo.jpg'

const AdminLoginFailure = () => {
    return (
        <>
            <nav className="bg-amber-300 p-4 flex flex-row">
                <Link className="ease-in-out delay-150 delay-300 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow" to="/admin-login">Admin</Link>
            </nav>
            <div className="flex flex-col gap-4 items-center justify-center pt-10">
                <img className="max-w-sm pt-10" src={iOLogo} alt="iO academy logo" />
                <h1 className="text-3xl p-1 text-center">Admin login</h1>
                <h2 className="text-center p-1">Something went wrong. Please try again.</h2>
            </div>
        </>
    )
}

export default AdminLoginFailure