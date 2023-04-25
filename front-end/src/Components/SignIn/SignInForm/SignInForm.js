import { useState } from "react"
import { useNavigate } from "react-router-dom"
const SignInForm = () => {

    const navigate = useNavigate()
    const [name, setName] = useState(null)
    const [company, setCompany] = useState(null)
    const [date, setDate] = useState(null)
    const [time, setTime] = useState(null)

    async function handleSignIn(event) {
        event.preventDefault()
        const requestBody = {
            name: name,
            company: company,
            signInTime: time
        }
        fetch('http://localhost:3001/visitors', {
            method: "POST",
            body: JSON.stringify(requestBody),
            headers: {
                "Content-Type": "application/json"
            }
        }
        ).then(response => response.json())
        .then((data) => {
                console.log(data)
                navigate("/sign-in/success")
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
        <>
            <form onSubmit={handleSignIn}>
                <label htmlFor="name">Name*</label>
                <input type="text" id="name" name="name" onChange={handleNameChange} required />
                <label htmlFor="company">Company</label>
                <input type="text" id="company" name="company" onChange={handleCompanyChange} />
                <label htmlFor="date">Date*</label>
                <input type="date" id="date" name="date" onChange={handleDateChange} required />
                <label htmlFor="time">Time*</label>
                <input type="time" id="time" name="time" onChange={handleTimeChange} required />
                <input type="submit" value="Sign me in" />
            </form>
            <p>* required field</p>
        </>
    )
}

export default SignInForm