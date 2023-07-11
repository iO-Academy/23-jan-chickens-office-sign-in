import GenericPage from "./GenericPage"

const BulkSignOutSuccess = () =>
    <GenericPage
        h1="Bulk sign-out"
        h2="You have successfully signed out all visitors."
        links={["Home", "History"]}
        button="Logout"
        replace={true} />

export default BulkSignOutSuccess