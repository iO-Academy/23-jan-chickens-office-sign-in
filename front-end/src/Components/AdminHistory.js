import { useNavigate, useOutletContext } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { baseURL } from '../config'
import LoadingSpinner from './LoadingSpinner'

const AdminHistory = () => {
    const [visitors, setVisitors] = useState(null)
    const navigate = useNavigate()
    const [, setLinks] = useOutletContext();
    useEffect(() => setLinks(["Back", "Logout"]), [])

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
                } else {
                    navigate("/admin/history/error")
                }
            })
            .then((data) => {
                setVisitors(data?.data.reverse())
            }).catch((e) => {
                console.error(e.message)
                navigate("/admin/history/error")
            })
    }, [])

    return (
        <>
            <div className="flex flex-col gap-4 items-center justify-center pt-5">
                <h1 className="text-4xl p-1 text-center">Visitor History</h1>
                <p></p>
            </div>
            <div className="flex flex-wrap justify-center items-center gap-2 mx-auto">
                {visitors?.map((visitor, index) => {
                    return (
                        <div className="w-48 text-xs font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white" key={index}>
                            <p className="w-full px-2 py-1 border-b border-gray-200 rounded-t-lg dark:border-gray-600">Name: {visitor.name}</p>
                            <p className="w-full px-2 py-1 border-b border-gray-200 dark:border-gray-600" >From: {visitor.company ?? 'Did not say'}</p>
                            <p className="w-full px-2 py-1 border-b border-gray-200 dark:border-gray-600" >Date in: {visitor.signInDate}</p>
                            <p className="w-full px-2 py-1 border-b border-gray-200 dark:border-gray-600" >Time in: {visitor.signInTime}</p>
                            <p className="w-full px-2 py-1 border-b border-gray-200 dark:border-gray-600" >Date out: {visitor.signOutDate}</p>
                            <p className="w-full px-2 py-1" >Time out: {visitor.signOutTime}</p>
                        </div>)
                }) ??
                    <LoadingSpinner />
                }
            </div>
        </>
    )
}
{/* <p className="text-center pt-10">Loading...</p> */ }
export default AdminHistory