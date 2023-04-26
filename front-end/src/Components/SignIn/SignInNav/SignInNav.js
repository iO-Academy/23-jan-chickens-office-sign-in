import {Link} from 'react-router-dom'

const SignInNav = () => {
    return (
        <>
            <nav className="bg-amber-300 p-4">
                <Link className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow" to="/sign-in" to="/">Home</Link>
            </nav>
        </>
    )
}

export default SignInNav