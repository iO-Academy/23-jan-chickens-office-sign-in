import SignInNav from "./SignInNav"
import { useNavigate } from "react-router-dom"

const SignInFailure = () => {
    
    const navigate = useNavigate()
    const handleButtonClick = () => {
        navigate("/")
    }

    return (
        <div>
            <SignInNav />
            <div className="flex flex-col items-center justify-center">
            <p className="pb-10">Something went wrong. Please try again.</p>
                <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow" onClick={handleButtonClick}>Go Home</button>
            </div>
        </div>
    )
}

export default SignInFailure