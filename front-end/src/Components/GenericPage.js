import { useOutletContext } from "react-router-dom"
import { useEffect } from "react"
import IOLogoContainer from "./IOLogoContainer"
import Button from "./Button"

const GenericPage = (props) => {
    const [, setLinks,, setReplace] = useOutletContext()
    useEffect(() => {
        setLinks(props.links)
        setReplace(props.replace)
        return () => setReplace(null)
    }, [setLinks, props.links, setReplace, props.replace])

    return (
        <IOLogoContainer>
            <h1 className="text-3xl p-1 text-center">{props.h1}</h1>
            <h2 className="text-center p-1">{props.h2}</h2>
            {props.button && <Button link={props.button} replace={props.replace} /> }
        </IOLogoContainer>
    )
}

export default GenericPage