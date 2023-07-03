import { useOutletContext } from "react-router-dom"
import { useEffect } from 'react'
import IOLogoContainer from "./IOLogoContainer"
import Button from "./Button"

const Admin = () => {
    const [, setLinks] = useOutletContext();
    // useEffect(() => setLinks(["Logout"]), [])
    useEffect(() => setLinks(["Logout"]), [setLinks])


    return (
        <IOLogoContainer>
            <h1 className="text-4xl p-1 text-center">Admin</h1>
            <div className="flex flex-row gap-4 justify-center pt-10">
                <Button link="Today" />
                <Button link="History" />
            </div>
        </IOLogoContainer>
    )
}

export default Admin