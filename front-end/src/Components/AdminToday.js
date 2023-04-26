import { Link } from 'react-router-dom'
import iOLogo from '../io-logo.jpg'
const AdminToday = () => {

    return (
        <>
            <nav className="bg-amber-300 p-4">
                <Link className="mr-2 ease-in-out delay-150 duration-300 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow" to="/admin">Back</Link>
            </nav>
            <div className="flex flex-col gap-4 items-center justify-center pt-10">
                <img className="max-w-sm pt-10" src={iOLogo} alt="iO academy logo" />
                <h1 className="text-4xl p-1 text-center">Todays Visitors</h1>
            </div>
        </>
    )
}

export default AdminToday