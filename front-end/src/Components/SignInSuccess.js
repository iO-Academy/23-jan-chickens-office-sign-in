import { useNavigate} from "react-router-dom"
import iOLogo from "../io-logo.jpg"

import Nav from './Nav.js'

const SignInSuccess = () => {
    const navigate = useNavigate()
    
    const handleButtonClick = () => {
        navigate("/")
    }

    return (
        <div>
            {/* <Nav links={[{name: "Home", path: "/"}]}/> */}
            {/* <Nav links={["Home"]}/> */}
            <Nav />

            <div className="flex flex-col gap-4 items-center justify-center pt-10">
                <img className="max-w-sm pt-10" src={iOLogo} alt="iO academy logo" />
                <h1 className="text-3xl p-1 text-center">Visitor sign-in</h1>
                <h2 className="text-center p-1">You have successfully signed in</h2>
                <button className="mt-10 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow" onClick={handleButtonClick}>Go Home</button>
            </div>
        </div>

    )
}

export default SignInSuccess