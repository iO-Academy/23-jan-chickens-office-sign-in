import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import iOLogo from '../io-logo.jpg'
import Nav from './Nav.js'

const VisitorError = () => {
    const navigate = useNavigate()
    const [imgLoaded, setImgLoaded] = useState(false)

    const handleImgLoad = () => {
        setImgLoaded(true)
    }

    const handleButtonClick = () => {
        navigate("/")
    }

    return (
        <div>
            {/* <nav className="bg-amber-300 p-4">
                <Link className="ease-in-out delay-150 duration-300 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow" to="/">Home</Link>
            </nav> */}
            {/* <Nav links={[{name: "Home", path: "/"}]}/> */}
            <Nav links={["Home"]}/>
            <div className="flex flex-col gap-4 items-center justify-center pt-10">
                <img className="max-w-sm pt-10" src={iOLogo} alt="iO academy logo" onLoad={handleImgLoad} />
                {imgLoaded && 
                <>
                <p className="pb-10">Something went wrong. Please try again.</p>
                <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow" onClick={handleButtonClick}>Go Home</button>
                </>
                }
            </div>
        </div>
    )
}

export default VisitorError