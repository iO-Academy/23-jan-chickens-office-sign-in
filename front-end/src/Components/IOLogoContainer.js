import iOLogo from "../io-logo.jpg"
import { useState } from "react"

const IOLogoContainer = (props) => {
    const [imgLoaded, setImgLoaded] = useState(false)
    const handleImgLoad = () => {
        setImgLoaded(true)
    }

    return (
        <div className="flex flex-col gap-4 items-center justify-center pt-10">
            <img rel="preload" as="image" className="max-w-sm pt-10" src={iOLogo} alt="iO academy logo" onLoad={handleImgLoad} />
            {imgLoaded && <>
                {props.children}
            </>
            }
        </div>
    )
}

export default IOLogoContainer