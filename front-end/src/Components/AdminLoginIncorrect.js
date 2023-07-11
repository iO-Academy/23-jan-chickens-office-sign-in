import GenericPage from './GenericPage'

const AdminLoginIncorrect = () =>
    <GenericPage
        h1="Admin login"
        h2="Incorrect passcode. Please try again."
        links={["Home"]}
        button="Login"
        replace={true} />

export default AdminLoginIncorrect