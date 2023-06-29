import { useOutletContext } from "react-router-dom"
import { useEffect } from "react"
import IOLogoContainer from "./IOLogoContainer"
import Button from "./Button"

const BulkSignoutSuccess = () => {
    const [, setLinks] = useOutletContext();
    useEffect(() => setLinks(["Home", "History"]), [])

    return (
        <IOLogoContainer>
            <h1 className="text-3xl p-1 text-center">Bulk sign-out</h1>
            <h2 className="text-center p-1">You have successfully signed out all visitors.</h2>
            <Button link="Logout" />
        </IOLogoContainer>
    )
}

export default BulkSignoutSuccess