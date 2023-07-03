import { useNavigate, useOutletContext } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { baseURL } from '../config'
import LoadingSpinner from './LoadingSpinner'

const AdminToday = () => {
    const [visitors, setVisitors] = useState(null)
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const [, setLinks] = useOutletContext()

    useEffect(() => {
        setLinks(["Back"])
        if (visitors?.length) {
            setLinks(["Back", "Bulk Sign Out"])
        } else if (visitors?.length === 0) {
            setLinks(["Back", "Logout"])
        }
    }
        , [visitors])

    const handleSignoutClick = (event) => {
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
                response.status !== 200 ?
                    navigate("/sign-out/failure") :
                    navigate("/admin/today/sign-out-success")
            })
            .catch((e) => {
                console.error(e.message)
                navigate("/sign-out/failure")
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
                } else {
                    navigate("/admin/today/error")
                }
            })
            .then((data) => {
                setIsLoading(false)
                setVisitors(data?.data)
            })
            .catch((e) => {
                console.error(e.message)
                navigate("/admin/today/error")
            })
    }, [])

    return (
        <>
            <div className="flex flex-col gap-4 items-center justify-center pt-10">
                <h1 className="text-4xl p-1 text-center">Today's Visitors</h1>
                <p></p>
            </div>
            <div className="flex flex-wrap justify-center items-center gap-2 mx-auto">
                {isLoading ? (<LoadingSpinner />) : (
                    visitors?.length ? ((visitors?.map((visitor, index) => {
                        return (
                            <div className="w-48 text-xs font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white" key={index}>
                                <p className="w-full px-2 py-1 border-b border-gray-200 rounded-t-lg dark:border-gray-600">Name: {visitor.name}</p>
                                <p className="w-full px-2 py-1 border-b border-gray-200 dark:border-gray-600" >From: {visitor.company ?? 'Did not say'}</p>
                                <p className="w-full px-2 py-1 rounded-b-lg">Time in: {visitor.signInTime}</p>
                                <input id={visitor._id} className="w-full transition ease-in-out delay-150 bg-blue-500  hover:bg-blue-700 duration-300 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline" type="submit" value="Sign out" onClick={handleSignoutClick} />
                            </div>)
                    }))) : (<p className="text-center pt-10">No visitors present.</p>)
                )
                }
            </div>
        </>
    )
}

export default AdminToday