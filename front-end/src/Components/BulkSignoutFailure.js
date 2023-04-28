import { useNavigate, Link } from "react-router-dom"

const BulkSignoutFailure = () => {

    const navigate = useNavigate()
    const handleButtonClick = () => {
        navigate("/")
    }

    return (
        <div>
            <nav className="bg-amber-300 p-4">
                <Link className="ease-in-out delay-150 duration-300 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow" to="/">Home</Link>
            </nav>
            <div className="flex flex-col items-center justify-center">
                <p className="pb-10">Something went wrong. Please try again.</p>
                <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow" onClick={handleButtonClick}>Go Home</button>
            </div>
        </div>
    )
}

export default BulkSignoutFailure