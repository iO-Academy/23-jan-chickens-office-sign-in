import { useState } from "react"
import { useNavigate } from "react-router-dom"
const SignInForm = () => {

    const today = new Date()
    const defaultDate = today.toISOString().substring(0, 10)
    const defaultTime = today.toISOString().substring(11, 16);
    const navigate = useNavigate()
    const [name, setName] = useState(null)
    const [company, setCompany] = useState(null)
    const [time, setTime] = useState(defaultTime)
    const [date, setDate] = useState(defaultDate)

    const handleSignIn = (event) => {
        event.preventDefault()
        const requestBody = {
            name: name,
            company: company,
            date: date,
            signInTime: time
        }
        fetch('http://localhost:3001/visitors', {
            method: "POST",
            body: JSON.stringify(requestBody),
            headers: {
                "Content-Type": "application/json"
            }
        }
        ).then((response) => {
            response.status === 200 ?
                navigate("/sign-in/success") :
                navigate("/sign-in/failure")
        })
    }


    const handleNameChange = (event) => {
        setName(event.target.value)
    }
    const handleCompanyChange = (event) => {
        setCompany(event.target.value)
    }
    const handleDateChange = (event) => {
        setDate(event.target.value)
    }
    const handleTimeChange = (event) => {
        setTime(event.target.value)
    }


    return (
        <div className="w-full max-w-xs mx-auto">
            <form className="bg-amber-300 shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSignIn}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Name*</label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" id="name" name="name" onChange={handleNameChange} required />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="company">Company</label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" id="company" name="company" onChange={handleCompanyChange} />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">Date*</label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="date" id="date" name="date" onChange={handleDateChange} defaultValue={defaultDate} required />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="time">Time*</label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="time" id="time" name="time" onChange={handleTimeChange} defaultValue={defaultTime} required />
                </div>
                <div>
                    <input className="transition ease-in-out delay-150 bg-blue-500  hover:bg-blue-700 duration-300 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit" value="Sign me in" />
                </div>
                <p className="text-500 text-xs italic">* required</p>
            </form>
        </div>
    )
}

export default SignInForm