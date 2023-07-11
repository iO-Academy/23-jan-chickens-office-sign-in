import GenericPage from './GenericPage'

const NoMatch = () =>
    <GenericPage
        h1="404"
        h2="Page not found."
        links={["Home"]} 
        replace={true} />

export default NoMatch