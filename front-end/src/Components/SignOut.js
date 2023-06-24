import { Link } from 'react-router-dom'
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { baseURL } from '../config'
import LoadingLogo from './LoadingLogo'
import Nav from './Nav.js'

const SignOut = () => {
    const navigate = useNavigate()
    const [, setName] = useState(null)
    const [visitorsByName, setVisitorsByName] = useState(null)
    const [invalidName, setInvalidName] = useState(null)
    const [nameSearchIsLoading, setNameSearchIsLoading] = useState(false)
    const [signOutClickIsLoading, setSignOutClickIsLoading] = useState(false)

    const handleNameSearch = (event) => {
        event.preventDefault()
        const name = event.target.name.value
        setNameSearchIsLoading(true)

        fetch(baseURL + '/visitors/' + name, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }
        ).then((response) => {
            if (response.ok) {
                return response.json()
            } else if (response.status == 404) {
                setInvalidName(true)
                return response.json()
            }
        })
            .then(data => {
                setNameSearchIsLoading(false)
                setVisitorsByName(data.data)
            })
    }

    const handleNameChange = (event) => {
        setVisitorsByName(null)
        setInvalidName(null)
        setName(event.target.value)

    }

    const handleSignoutClick = (event) => {
        const today = new Date()
        today.setTime(today.getTime() - new Date().getTimezoneOffset() * 60 * 1000)
        const visitorSignOutDate = today.toISOString().substring(0, 10)
        const visitorSignOutTime = today.toISOString().substring(11, 16)
        const requestBody = {
            signOutDate: visitorSignOutDate,
            signOutTime: visitorSignOutTime
        }
        const id = event.target.id
        setSignOutClickIsLoading(true)

        fetch(baseURL + '/visitors/' + id
            , {
                method: "PUT",
                body: JSON.stringify(requestBody),
                headers: {
                    "Content-Type": "application/json"
                }
            }).then((response) => {
                setSignOutClickIsLoading(false)
                response.status !== 200 ?
                    navigate("/sign-out/failure") :
                    navigate("/sign-out/success")
            })
    }

    // return (
    //     <>
    //         <nav className="bg-amber-300 p-4">
    //             <Link className="ease-in-out delay-150 duration-300 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow" to="/">Home</Link>
    //         </nav>

    //     </>
    if (signOutClickIsLoading) {
        return (
            <>
                {/* <nav className="bg-amber-300 p-4">
                    <Link className="ease-in-out delay-150 duration-300 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow" to="/">Home</Link>
                </nav> */}
            {/* <Nav links={[{name: "Home", path: "/"}]}/> */}
            <Nav links={["Home"]}/>
                <LoadingLogo message="Signing out..."/>
            </>
        )
    }

    return (
        <>

            {/* <nav className="bg-amber-300 p-4">
                <Link className="ease-in-out delay-150 duration-300 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow" to="/">Home</Link>
            </nav> */}
            <Nav links={[{name: "Home", path: "/"}]}/>
            <h1 className="p-5 text-3xl text-center">Visitor sign out</h1>
            <div className="w-full max-w-xs mx-auto">
                <form className="bg-amber-300 shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleNameSearch}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Name*</label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" id="name" name="name" onChange={handleNameChange} required />
                    </div>
                    <div>
                        <input className="transition ease-in-out delay-150 bg-blue-500  hover:bg-blue-700 duration-300 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit" value="Search" />
                    </div>
                </form>
            </div>
            <div className="flex flex-row flex-wrap justify-center items-center gap-3 mx-auto">
                {nameSearchIsLoading ? (<p className="text-center pt-10">Loading...</p>) :
                    (invalidName || visitorsByName) && (invalidName ? (
                        <p className="text-center pt-10">Name not found. Please try again or contact admin.</p>) : (
                        (visitorsByName?.map((visitor, index) => {
                            return (
                                <div key={index}>
                                    <div className="w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white" key={index}>
                                        <p className="w-full px-4 py-2 border-b border-gray-200 rounded-t-lg dark:border-gray-600">Name: {visitor.name}</p>
                                        <p className="w-full px-4 py-2 border-b border-gray-200 dark:border-gray-600" >From: {visitor.company ?? 'Did not say'}</p>
                                        <p className="w-full px-4 py-2 rounded-b-lg">Time in: {visitor.signInTime}</p>
                                        <input id={visitor._id} className="w-full transition ease-in-out delay-150 bg-blue-500  hover:bg-blue-700 duration-300 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit" value="Sign me out" onClick={handleSignoutClick} />
                                    </div>
                                </div>
                            )
                        }))
                    ))}
            </div>
        </>

    )
}

export default SignOut