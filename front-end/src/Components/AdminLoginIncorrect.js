import { useOutletContext } from 'react-router-dom'
import { useEffect } from 'react'
import IOLogoContainer from './IOLogoContainer'
import Button from './Button'

const AdminLoginIncorrect = () => {
    const [, setLinks] = useOutletContext()
    useEffect(() => setLinks(["Home"]), [])

    return (
        <IOLogoContainer>
            <h1 className="text-3xl p-1 text-center">Admin login</h1>
            <h2 className="text-center p-1">Incorrect passcode. Please try again.</h2>
            <Button link="Login"/>
        </IOLogoContainer>
    )
}

export default AdminLoginIncorrect