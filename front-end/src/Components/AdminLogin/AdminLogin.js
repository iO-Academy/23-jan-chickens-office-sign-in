import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const AdminLogin = () => {
    const [firstNumber, setFirstNumber] = useState(null)
    const [secondNumber, setSecondNumber] = useState(null)
    const [thirdNumber, setThirdNumber] = useState(null)
    const [fourthNumber, setFourthNumber] = useState(null)
    
    const navigate = useNavigate()
    const handleSubmit = (event) => {
        event.preventDefault()
        const pincodeString = firstNumber + secondNumber + thirdNumber + fourthNumber
        // fetch("/admin-login", {
        //     method: "POST",
        //     headers:{"Content-Type": "application/json"},
        //     body: JSON.encode(pincodeString)
        // })
        // .then(response => response.json())
        // .then((data) => {
        //     //set the session.id here, record as state in app
        // })

        navigate("/admin")
    }

    const handleFirstNumberChange  = (event) => {
        setFirstNumber(event.target.value)
    }
    const handleSecondNumberChange  = (event) => {
        setSecondNumber(event.target.value)
    }
    const handleThirdNumberChange  = (event) => {
        setThirdNumber(event.target.value)
    }
    const handleFourthNumberChange  = (event) => {
        setFourthNumber(event.target.value)
    }
    return (
        <>
            <nav>
                <Link to="/">Home</Link>
            </nav>
            <h1>
                Admin Login
            </h1>
            <form onSubmit={handleSubmit}>
                <input type="number" onChange={handleFirstNumberChange}/>
                <input type="number" onChange={handleSecondNumberChange}/>
                <input type="number" onChange={handleThirdNumberChange}/>
                <input type="number" onChange={handleFourthNumberChange}/>
                <input type="submit" value="login" />
            </form>

        </>
    )
}

export default AdminLogin