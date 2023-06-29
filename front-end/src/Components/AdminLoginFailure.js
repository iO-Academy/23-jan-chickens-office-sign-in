import { useEffect } from 'react'
import { useOutletContext } from "react-router-dom"
import IOLogoContainer from './IOLogoContainer'

const AdminLoginFailure = () => {
    const [links, setLinks] = useOutletContext();
    useEffect(() => setLinks(["Back"]), [])
    return (
            <IOLogoContainer>
                <h1 className="text-3xl p-1 text-center">Admin login</h1>
                <h2 className="text-center p-1">Something went wrong. Please try again.</h2>
            </IOLogoContainer>
    )
}

export default AdminLoginFailure