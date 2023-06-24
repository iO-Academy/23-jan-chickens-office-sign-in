import { Link } from 'react-router-dom'
import iOLogo from '../io-logo.jpg'
import Nav from './Nav.js'

const NoMatch = () => {
    return (
        <div>
            {/* <Nav links={[{name: "Home", path: "/"}]}/> */}
            <Nav links={["Home"]}/>
            <div className="flex flex-col items-center justify-center">
                <img className="max-w-sm pt-10" src={iOLogo} alt="iO academy logo" />
                <h1 className="text-3xl p-1 text-center">404</h1>
                <h2 className="text-center p-1">Page not found.</h2>
            </div>
        </div>
    )
}

export default NoMatch