import { useOutletContext } from "react-router-dom"
import { useEffect } from "react"
import IOLogoContainer from "./IOLogoContainer"
import Button from "./Button"

const SignInSuccess = () => {
    const [links, setLinks] = useOutletContext();
    useEffect(() => setLinks([]), [])

    return (
        <IOLogoContainer>
            <h1 className="text-3xl p-1 text-center">Visitor sign-in</h1>
            <h2 className="text-center p-1">You have successfully signed in</h2>
            <Button link="Home"/>
        </IOLogoContainer>
    )
}

export default SignInSuccess