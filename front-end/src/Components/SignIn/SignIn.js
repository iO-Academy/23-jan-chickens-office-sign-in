import SignInForm from "./SignInForm/SignInForm"
import SignInNav from "./SignInNav/SignInNav"

const SignIn = () => {

    return (
        <>
            <SignInNav />
            <h1 className="p-5 text-3xl text-center">Visitor sign in</h1>
            <SignInForm />
        </>
    )
}

export default SignIn