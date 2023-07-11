import { Outlet } from 'react-router-dom'
import { useState } from 'react'
import Button from "./Button"

const Nav = () => {
    const [links, setLinks] = useState([])
    const [replace, setReplace] = useState(null)

    return (
        <>
            <nav className={`bg-amber-300 p-4 h-16 flex items-center ${links?.length > 1 ? "justify-between" : ""}`}>
                {
                    links?.map((link) => {
                        return (
                            <Button key={link} link={link} replace={replace}/>
                        )
                    })
                }
            </nav>
            <Outlet context={[links, setLinks, replace, setReplace]} />
        </>
    )
}
export default Nav