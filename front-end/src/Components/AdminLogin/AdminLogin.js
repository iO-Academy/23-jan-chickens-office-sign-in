import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import iOLogo from '../../io-logo.jpg'
import PinInput from 'react-pin-input'

const AdminLogin = () => {
    const [pin, setPin] = useState([])
    const navigate = useNavigate()
    // const handleSubmit = (event) => {
    //     event.preventDefault()
    //     const pincodeString = firstNumber + secondNumber + thirdNumber + fourthNumber
    //     // fetch("/admin-login", {
    //     //     method: "POST",
    //     //     headers:{"Content-Type": "application/json"},
    //     //     body: JSON.encode(pincodeString)
    //     // })
    //     // .then(response => response.json())
    //     // .then((data) => {
    //     //     //set the session.id here, record as state in app
    //     // })

    //     navigate("/admin")
    // }
    return (
        <>
            <nav className="bg-amber-300 p-4">
                <Link className="ease-in-out delay-150 delay-300 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow" to="/">Home</Link>
            </nav>
            <div className="flex flex-col gap-4 items-center justify-centerpt-10">
                <img className="max-w-sm pt-10" src={iOLogo} alt="iO academy logo" />
                <h1 className="text-3xl p-1 text-center">Admin login</h1>
                <h2 className="text-center p-1">Please enter the admin pincode</h2>
            </div>
            <div className="flex flex-row justify-center p-10">
                <PinInput
                    length={4}
                    initialValue=""
                    secret
                    secretDelay={100}
                    onChange={value => setPin(value)}
                    type="numeric"
                    inputMode="number"
                    focus
                    inputStyle={{ borderColor: 'black' }}
                    inputFocusStyle={{ borderColor: 'orange' }}
                    onComplete={()=> {console.log('done')}}
                    autoSelect={true}
                    regexCriteria={/[0-9]{4}/}
                />
            </div>
            <p>{pin}</p>
        </>
    )
}

export default AdminLogin