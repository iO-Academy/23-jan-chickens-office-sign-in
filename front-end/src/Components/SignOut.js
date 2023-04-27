import { Link } from 'react-router-dom'
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const SignOut = () => {

    const navigate = useNavigate()
    const [name, setName] = useState(null)

    const handleNameSearch = (event) => {
        event.preventDefault()
        const name = event.target.name.value 
        console.log('http://localhost:3001/visitors/'+name)     
        fetch('http://localhost:3001/visitors/'+name, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }
        ).then((response) => {
            body = JSON(response.body) 
            console.log(body) 
        })
    }

    const handleNameChange = (event) => {
        setName(event.target.value)
    }

    return (
        <>
            <nav className="bg-amber-300 p-4">
                <Link className="ease-in-out delay-150 duration-300 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow" to="/">Home</Link>
            </nav>            
            <h1 className="p-5 text-3xl text-center">Visitor sign out</h1>
            <div className="w-full max-w-xs mx-auto">
            <form className="bg-amber-300 shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleNameSearch}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Name*</label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" id="name" name="name" onChange={handleNameChange} required />
                </div>
                <div>
                    <input className="transition ease-in-out delay-150 bg-blue-500  hover:bg-blue-700 duration-300 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit" value="Search for my name" />
                </div>
            </form>
        </div>

        </>
    )
}


export default SignOut