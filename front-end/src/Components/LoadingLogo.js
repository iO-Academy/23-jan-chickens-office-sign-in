import { useState } from "react"
import iOLogo from '../io-logo.jpg'

const LoadingLogo = (props) => {

    const [imgLoaded, setImgLoaded] = useState(false)

    const handleImgLoad = () => {
        setImgLoaded(true)
    }

    return (
        <div className="w-full max-w-xs mx-auto">
            <div className="flex flex-col gap-4 items-center justify-center pt-10">
                <img className="max-w-sm pt-10" src={iOLogo} alt="iO academy logo" onLoad={handleImgLoad} />
                {imgLoaded &&
                    <>
                    <p>{props.message}</p>
                        {/* <div className="flex flex-col gap-4 items-center mt-4 animate-pulse">
                            <div className="h-6 w-48 bg-gray-100 rounded-full"></div>
                            <div className="h-4 w-56 bg-gray-100 rounded-full"></div>
                            <div className="h-4 w-56 bg-gray-100 rounded-full"></div>
                            <div className="h-4 w-44 bg-gray-100 rounded-full"></div>
                            <div className="h-7 w-28 bg-gray-100 rounded-full mt-2"></div>
                        </div> */}
                    </>}
            </div>
        </div >
    )
}

export default LoadingLogo