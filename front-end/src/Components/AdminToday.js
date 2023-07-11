import { useNavigate, useOutletContext, useLocation } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import { baseURL } from '../config'
import LoadingSpinner from './LoadingSpinner'
import VisitorRow from './VisitorRow'
import VisitorContainer from './VisitorContainer'
import IOLogoContainer from './IOLogoContainer'

const AdminToday = () => {
    const [visitors, setVisitors] = useState(null)
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const [signOutClickIsLoading, setSignOutClickIsLoading] = useState(false)
    const [, setLinks] = useOutletContext()
    const location = useLocation()

    useEffect(() => {
        setLinks(["Back"])
        if (!signOutClickIsLoading) {
            if (visitors?.length) {
                setLinks(["Back", "Bulk Sign Out"])
            } else if (visitors?.length === 0) {
                setLinks(["Back", "Logout"])
            }
        }
    }
        , [setLinks, visitors, signOutClickIsLoading])

    const handleSignoutClick = (event) => {
        setSignOutClickIsLoading(true)
        const id = event.target.id
        const today = new Date()
        today.setTime(today.getTime() - new Date().getTimezoneOffset() * 60 * 1000)
        const visitorSignOutDate = today.toLocaleDateString("en-GB")
        const visitorSignOutTime = today.toISOString().substring(11, 16)
        const requestBody = {
            signOutDate: visitorSignOutDate,
            signOutTime: visitorSignOutTime
        }

        fetch(baseURL + '/admin/' + id
            , {
                method: "PUT",
                credentials: 'include',
                body: JSON.stringify(requestBody),
                headers: {
                    "Content-Type": "application/json"
                }
            }).then((response) => {
                setSignOutClickIsLoading(false)
                if (response.status === 200) {
                    navigate("/admin/today/sign-out-success")
                } else if (response.status === 401) {
                    navigate("/admin/login")
                } else if (window.location.pathname === location.pathname) {
                    navigate("/sign-out/failure", { state: response.status })
                }
            })
            .catch((e) => {
                console.error(e.message)
                window.location.pathname === location.pathname && navigate("/sign-out/failure")
            })
    }

    useEffect(() => {
        setIsLoading(true)
        fetch(baseURL + "/visitors?signedIn=true", {
            method: "GET",
            credentials: 'include',
        })
            .then((response) => {
                setIsLoading(false)
                if (response.status === 200) {
                    return response.json()
                } else if (response.status === 401) {
                    navigate("/admin/login")
                } else if (window.location.pathname === location.pathname) {
                    navigate("error", { state: response.status })
                }
            })
            .then((data) => {
                setIsLoading(false)
                setVisitors(data?.data)
            })
            .catch((e) => {
                console.error(e.message)
                window.location.pathname === location.pathname && navigate("error")
            })
    }, [navigate, location.pathname])

    if (signOutClickIsLoading) {
        return (
            <IOLogoContainer >
                <LoadingSpinner message="Signing out..." />
            </IOLogoContainer>
        )
    }

    return (
        <>
            <div className="flex flex-col gap-4 items-center justify-center pt-10 pb-7">
                <h1 className="text-4xl p-1 text-center">Today's Visitors</h1>
            </div>
            <div className="flex flex-wrap justify-center items-center gap-2 mx-auto mb-2">
                {isLoading ? (<LoadingSpinner />) : (
                    visitors?.length ? ((visitors?.map((visitor, index) => {
                        return (
                            <React.Fragment key={index}>
                                <VisitorContainer>
                                    <VisitorRow prefix="Name: " text={visitor.name} />
                                    <VisitorRow prefix="From: " text={(visitor.company ?? 'Did not say')} />
                                    <VisitorRow prefix="Time in: " text={visitor.signInTime} />
                                    <input id={visitor._id} className="w-full col-span-full transition ease-in-out delay-150 bg-blue-500  hover:bg-blue-700 duration-300 text-white font-bold py-1 px-2 focus:outline-none focus:shadow-outline" type="submit" value="Sign out" onClick={handleSignoutClick} />
                                </VisitorContainer>
                            </React.Fragment>
                        )
                    }))) : (<p className="text-center pt-10">No visitors present.</p>)
                )
                }
            </div>
        </>
    )
}

export default AdminToday