import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

const AdminToday = () => {
    const [visitors, setVisitors] = useState(null)
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)


    const handleBulkSignout = () => {
        const today = new Date()
        today.setTime(today.getTime() - new Date().getTimezoneOffset() * 60 * 1000)
        const bulkSignOutDate = today.toISOString().substring(0, 10)
        const bulkSignOutTime = today.toISOString().substring(11, 16)
        const requestBody = {
            signOutDate: bulkSignOutDate,
            signOutTime: bulkSignOutTime
        }

        fetch('https://visitorappapi.2023-williamt.dev.io-academy.uk/visitors', {
            method: 'PUT',
            credentials: 'include',
            body: JSON.stringify(requestBody),
            headers: {
                "Content-Type": "application/json"
            }
        }).then((response) => {
            if (response.status == 200) {
                navigate("/admin/today/bulk-sign-out-success")
            } else if (response.status == 401) {
                navigate("/admin-login")
            } else {
                navigate("/admin/today/bulk-sign-out-failure")
            }
        })
    }

    const handleSignoutClick = (event) => {
        const id = event.target.id
        const today = new Date()
        today.setTime(today.getTime() - new Date().getTimezoneOffset() * 60 * 1000)
        const visitorSignOutDate = today.toISOString().substring(0, 10)
        const visitorSignOutTime = today.toISOString().substring(11, 16)
        const requestBody = {
            signOutDate: visitorSignOutDate,
            signOutTime: visitorSignOutTime
        }

        fetch('https://visitorappapi.2023-williamt.dev.io-academy.uk/admin/' + id
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
                    navigate("/sign-out/success")
            })
    }

    useEffect(() => {
        setIsLoading(true)

        fetch("https://visitorappapi.2023-williamt.dev.io-academy.uk/visitors?signedIn=true", {
            method: "GET",
            credentials: 'include',
        })
            .then((response) => {
                if (response.status == 200) {
                    return response.json()
                } else {
                    navigate("/admin-login")
                }
            })
            .then((data) => {
                setIsLoading(false)
                setVisitors(data.data)
            })
    }, [])

    return (
        <>
            <nav className="bg-amber-300 p-4 flex justify-between">
                <Link className="mr-2 ease-in-out delay-150 duration-300 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow" to="/admin">Back</Link>
                <button className="mr-2 ease-in-out delay-150 duration-300 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow" onClick={handleBulkSignout}>Bulk Sign Out</button>
            </nav>
            <div className="flex flex-col gap-4 items-center justify-center pt-10">
                <h1 className="text-4xl p-1 text-center">Today's Visitors</h1>
                <p></p>
            </div>
            <div className="flex flex-wrap justify-center items-center gap-2 mx-auto">
                {isLoading ? (<p className="text-center pt-10">Loading...</p>) : (
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