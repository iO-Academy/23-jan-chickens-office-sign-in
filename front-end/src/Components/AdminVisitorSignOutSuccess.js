import GenericPage from './GenericPage'

const AdminVisitorSignOutSuccess = () =>
    <GenericPage
        h1="Admin visitor sign-out"
        h2="Visitor has been successfully signed out"
        links={["Back", "History"]} 
        button="Logout"
        replace={true} />

export default AdminVisitorSignOutSuccess

