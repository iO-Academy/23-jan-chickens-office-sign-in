import SignInNav from "../SignInNav/SignInNav"
import { useNavigate } from "react-router-dom"

const SignInSuccess = () => {
    const navigate = useNavigate()
    const handleButtonClick = () => {
        navigate("/")
    }

    return (
        <>
            <SignInNav />
            <p>You have successfully signed in!</p>
            <button onClick={handleButtonClick}>Go Home</button>
        </>

    )
}

export default SignInSuccess