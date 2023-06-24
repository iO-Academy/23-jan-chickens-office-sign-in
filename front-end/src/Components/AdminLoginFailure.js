import iOLogo from '../io-logo.jpg'
import Nav from './Nav.js'

const AdminLoginFailure = (props) => {
    // props.navSetter([{name: "Admin", path: "/admin-login"}])
    return (
        <>
            {/* <Nav links={[{name: "Admin", path: "/admin-login"}]}/> */}
            <Nav links={["Admin"]}/>
            <div className="flex flex-col gap-4 items-center justify-center pt-10">
                <img className="max-w-sm pt-10" src={iOLogo} alt="iO academy logo" />
                <h1 className="text-3xl p-1 text-center">Admin login</h1>
                <h2 className="text-center p-1">Something went wrong. Please try again.</h2>
            </div>
        </>
    )
}

export default AdminLoginFailure