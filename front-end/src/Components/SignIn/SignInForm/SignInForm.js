import { useNavigate } from "react-router-dom"
const SignInForm = () => {
    
    const navigate = useNavigate()

    const handleSignIn = (event) => {
        event.preventDefault()
        const name = "taken from name inout from form"
        const company = "taken from name inout from form"
        const date = "taken from name inout from form"
        const time = "taken from name inout from form"
        const responseBody ={
            name: name,
            company: company,
            signInTime: time,
        }
        fetch('localhost:3001', {
                method: "POST",
                headres: "application/json",
                body:JSON.stringify(responseBody)
            }
        ).then(response => response.json())
        .then(navigate("/sign-in/success"))
        
    }

    return (
        <>
            <form onSubmit={handleSignIn}>
                <label htmlFor="name">Name*</label>
                <input type="text" id="name" name="name" required />
                <label htmlFor="company">Company</label>
                <input type="text" id="company" name="company" />
                <label htmlFor="date">Date*</label>
                <input type="date" id="date" name="date" required />
                <label htmlFor="time">Time*</label>
                <input type="time" id="time" name="time" required />
                <input type="submit" value="Sign me in" />
            </form>
            <p>* required field</p>
        </>
    )
}

export default SignInForm