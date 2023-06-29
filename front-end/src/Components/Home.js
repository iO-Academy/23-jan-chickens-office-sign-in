import { Link, useOutletContext } from "react-router-dom"
import React, { useEffect } from "react"
import IOLogoContainer from "./IOLogoContainer"
import Button from "./Button"

const Home = () => {
    const [links, setLinks] = useOutletContext()
    useEffect(() => setLinks(["Admin"]), [])

    return (
        <IOLogoContainer>
            <h1 className="text-3xl p-1 text-center">Visitor sign-in</h1>
            <h2 className="text-center p-1">Please sign in or out of the office below</h2>
            <div className="flex flex-row gap-4 items-center justify-center pt-10">
                <Button link="Sign In" />
                <Button link="Sign Out" />
            </div>
        </IOLogoContainer>
    )
}

export default Home