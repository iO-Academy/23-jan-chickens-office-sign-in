import { useOutletContext } from 'react-router-dom'
import { useEffect } from 'react'
import IOLogoContainer from './IOLogoContainer'

const NoMatch = () => {
    const [links, setLinks] = useOutletContext();
    useEffect(() => setLinks(["Home"]), [])
    
    return (
        <IOLogoContainer>
            <h1 className="text-3xl p-1 text-center">404</h1>
            <h2 className="text-center p-1">Page not found.</h2>
        </IOLogoContainer>
    )
}

export default NoMatch