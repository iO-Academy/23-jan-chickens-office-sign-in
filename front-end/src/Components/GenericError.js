import { useEffect } from "react"
import { useOutletContext } from "react-router-dom"
import IOLogoContainer from "./IOLogoContainer"
import Button from "./Button"

const GenericError = () => {
    const [links, setLinks] = useOutletContext();
    useEffect(() => setLinks(["Back"]), [])

    return (
        <IOLogoContainer>
            <p className="pb-10">Something went wrong. Please try again.</p>
            <Button link="Home"/>
        </IOLogoContainer>
    )
}

export default GenericError