import { useLocation } from "react-router-dom"
import GenericPage from "./GenericPage"

const GenericError = () => {
    const location = useLocation()
    const errorCode = location.state

    return (
        <GenericPage
            h1={errorCode || "Error"}
            h2="Something went wrong. Please try again."
            links={[]}
            button="Home"
            replace={true} />
    )
}

export default GenericError