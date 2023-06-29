import { useOutletContext } from "react-router-dom"
import { useEffect } from "react"
import IOLogoContainer from "./IOLogoContainer"
import Button from "./Button"

const SignOutSuccess = (props) => {
    const [, setLinks] = useOutletContext()
    useEffect(() => setLinks(props.links), [])

    return (
        <IOLogoContainer>
            <h1 className="text-3xl p-1 text-center">{props.title}</h1>
            <h2 className="text-center p-1">{props.message}</h2>
            <Button link="Home"/>
        </IOLogoContainer>
    )
}

export default SignOutSuccess