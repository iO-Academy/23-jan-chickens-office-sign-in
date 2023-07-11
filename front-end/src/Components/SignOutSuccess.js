import GenericPage from './GenericPage'

const SignOutSuccess = () =>
    <GenericPage
        h1="Visitor sign-out"
        h2="You have been successfully signed out"
        links={[]} 
        button="Home"
        replace={true} />

export default SignOutSuccess