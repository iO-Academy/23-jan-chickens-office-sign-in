import { Link } from 'react-router-dom'
import iOLogo from '../io-logo.jpg'
const NoMatch = () => {
    return (
        <div>
            <nav className="bg-amber-300 p-4 flex">
                <Link className="ease-in-out delay-150 duration-300 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow" to="/">Home</Link>
            </nav>            
            <div className="flex flex-col items-center justify-center">
                <img className="max-w-sm pt-10" src={iOLogo} alt="iO academy logo" />
                <h1 className="text-3xl p-1 text-center">404</h1>
                <h2 className="text-center p-1">Page not found.</h2>
            </div>
        </div>
    )
}

export default NoMatch