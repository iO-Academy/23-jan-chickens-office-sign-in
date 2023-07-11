import { useOutletContext, useLocation } from 'react-router-dom'
import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { baseURL } from '../config'
import IOLogoContainer from "./IOLogoContainer"
import LoadingSpinner from './LoadingSpinner'
import VisitorContainer from './VisitorContainer'
import VisitorRow from './VisitorRow'

const SignOut = () => {
    const navigate = useNavigate()
    const [, setName] = useState(null)
    const [visitorsByName, setVisitorsByName] = useState(null)
    const [invalidName, setInvalidName] = useState(null)
    const [nameSearchIsLoading, setNameSearchIsLoading] = useState(false)
    const [signOutClickIsLoading, setSignOutClickIsLoading] = useState(false)
    const [, setLinks] = useOutletContext()
    const location = useLocation()
    useEffect(() => setLinks(["Home"]), [setLinks])

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
            } else if (response.status === 404) {
                setInvalidName(true)
                return response.json()
            } else if (window.location.pathname === location.pathname) {
                navigate("failure", { state: response.status })
            }
        })
            .then(data => {
                setNameSearchIsLoading(false)
                setVisitorsByName(data?.data)
            })
            .catch((e) => {
                console.error(e.message)
                window.location.pathname === location.pathname && navigate("failure")
            })
    }

    const handleNameChange = (event) => {
        setVisitorsByName(null)
        setInvalidName(null)
        setName(event.target.value)
    }

    const handleSignoutClick = (event) => {
        setSignOutClickIsLoading(true)
        const today = new Date()
        today.setTime(today.getTime() - new Date().getTimezoneOffset() * 60 * 1000)
        const visitorSignOutDate = today.toLocaleDateString("en-GB")
        const visitorSignOutTime = today.toISOString().substring(11, 16)
        const requestBody = {
            signOutDate: visitorSignOutDate,
            signOutTime: visitorSignOutTime
        }
        const id = event.target.id

        fetch(baseURL + '/visitors/' + id
            , {
                method: "PUT",
                body: JSON.stringify(requestBody),
                headers: {
                    "Content-Type": "application/json"
                }
            }).then((response) => {
                setSignOutClickIsLoading(false)
                if (response.status === 200) {
                    navigate("/sign-out/success")
                } else if (window.location.pathname === location.pathname) {
                    navigate("failure", { state: response.status })
                }
            })
            .catch((e) => {
                console.error(e.message)
                window.location.pathname === location.pathname && navigate("failure")
            })
    }

    if (signOutClickIsLoading) {
        return (
            <IOLogoContainer >
                <LoadingSpinner message="Signing out..." />
            </IOLogoContainer>
        )
    }

    return (
        <>
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
                {nameSearchIsLoading ? (<><LoadingSpinner color="blue-500" /></>) :
                    (invalidName || visitorsByName) && (invalidName ? (
                        <p className="text-center pt-10">Name not found. Please try again or contact admin.</p>) : (
                        (visitorsByName?.map((visitor, index) => {
                            return (
                                <React.Fragment key={index}>
                                    <VisitorContainer>
                                        <VisitorRow prefix="Name: " text={visitor.name} />
                                        <VisitorRow prefix="From: " text={(visitor.company ?? 'Did not say')} />
                                        <VisitorRow prefix="Time in: " text={visitor.signInTime} />
                                        <input id={visitor._id} className="w-full col-span-full transition ease-in-out delay-150 bg-blue-500  hover:bg-blue-700 duration-300 text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline" type="submit" value="Sign me out" onClick={handleSignoutClick} />
                                    </VisitorContainer>
                                </React.Fragment>
                            )
                        }))
                    ))}
            </div>
        </>

    )
}

export default SignOut