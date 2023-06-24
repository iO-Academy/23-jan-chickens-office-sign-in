import SignInForm from "./SignInForm"
import { Link } from 'react-router-dom'
import Nav from './Nav.js'

const SignIn = () => {

    return (
        <>
            {/* <nav className="bg-amber-300 p-4">
                <Link className="ease-in-out delay-150 duration-300 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow" to="/">Home</Link>
            </nav> */}
            {/* <Nav links={[{name: "Home", path: "/"}]}/> */}
            <Nav links={["Home"]}/>
            <SignInForm />
        </>
    )
}

export default SignIn