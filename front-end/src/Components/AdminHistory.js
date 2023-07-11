import { useNavigate, useOutletContext, useLocation } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import { baseURL } from '../config'
import LoadingSpinner from './LoadingSpinner'
import VisitorContainer from './VisitorContainer'
import VisitorRow from './VisitorRow'

const AdminHistory = () => {
    const [visitors, setVisitors] = useState(null)
    const navigate = useNavigate()
    const [, setLinks] = useOutletContext()
    const location = useLocation()
    useEffect(() => setLinks(["Back", "Logout"]), [setLinks])

    useEffect(() => {
        fetch(baseURL + "/visitors?signedIn=false", {
            method: "GET",
            credentials: 'include',
        })
            .then((response) => {
                if (response.status === 200) {
                    return response.json()
                } else if (response.status === 401) {
                    navigate("/admin/login")
                } else if (window.location.pathname === location.pathname) {
                    navigate("error", { state: response.status })
                }
            })
            .then((data) => {
                setVisitors(data?.data.reverse())
            })
            .catch((e) => {
                console.error(e.message)
                window.location.pathname === location.pathname && navigate("error")
            })
    }, [navigate, location.pathname])

    return (
        <>
            <div className="flex flex-col gap-4 items-center justify-center pt-10 pb-7">
                <h1 className="text-4xl p-1 text-center">Visitor History</h1>
            </div>
            <div className="flex flex-wrap justify-center items-start gap-2 mx-auto mb-2">
                {visitors?.map((visitor, index) => {
                    return (
                        <React.Fragment key={index}>
                            <VisitorContainer >
                                <VisitorRow prefix="Name: " text={visitor.name} />
                                <VisitorRow prefix="From: " text={(visitor.company ?? 'Did not say')} />
                                <VisitorRow prefix="Date in: " text={visitor.signInDate} />
                                <VisitorRow prefix="Time in: " text={visitor.signInTime} />
                                <VisitorRow prefix="Date out: " text={visitor.signOutDate} />
                                <VisitorRow prefix="Time out: " text={visitor.signOutTime} />
                            </VisitorContainer>
                        </React.Fragment>
                    )
                }) ??
                    <LoadingSpinner />
                }
            </div>
        </>
    )
}

export default AdminHistory