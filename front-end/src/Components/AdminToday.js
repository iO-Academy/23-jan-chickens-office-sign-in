import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import iOLogo from '../io-logo.jpg'

const AdminToday = () => {
    const [visitors, setVisitors] = useState(null)
    const navigate = useNavigate()
    
    const handleBulkSignout = (event) => {
        fetch('http://localhost:3001/visitors', {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            }
        }).then((response) => {
            response.status !== 200 ?
            navigate("/admin/today/bulk-sign-out-success"):
            navigate("/admin/today/bulk-sign-out-failure") 
        })
    }


    useEffect(() => {
        fetch("http://localhost:3001/visitors?signedIn=true")
            .then(response => response.json())
            .then((data) => {
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
                <img className="max-w-sm pt-10" src={iOLogo} alt="iO academy logo" />
                <h1 className="text-4xl p-1 text-center">Today's Visitors</h1>
                <p></p>
            </div>
            <div className="flex flex-wrap justify-center items-center gap-3 mx-auto">
                {visitors?.map((visitor, index) => {
                    return (<div className="w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white" key={index}>
                        <p className="w-full px-4 py-2 border-b border-gray-200 rounded-t-lg dark:border-gray-600">Name: {visitor.name}</p>
                        <p className="w-full px-4 py-2 border-b border-gray-200 dark:border-gray-600" >From: {visitor.company ?? 'Did not say'}</p>
                        <p className="w-full px-4 py-2 rounded-b-lg">Time in: {visitor.signInTime}</p>
                    </div>)
                }) ?? <p className="text-center pt-10">Loading...</p>
                }
            </div>
        </>
    )
}

export default AdminToday