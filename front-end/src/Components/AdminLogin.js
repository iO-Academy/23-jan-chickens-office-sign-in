import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import iOLogo from '../io-logo.jpg'
import PinInput from 'react-pin-input'

const AdminLogin = (props) => {
    const [passcode, setPasscode] = useState([])
    const navigate = useNavigate()

    const attemptLogin = (value) => {

        fetch("http://localhost:3001/verify", {
            method: "POST",
            credentials: 'include',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ passcode: value }),
        })
            .then((response) => {
                if (response.status === 200) {
                    navigate("/admin")
                } else if (response.status === 401) {
                    navigate("/admin-login/incorrect")
                } else {
                    navigate("/admin-login/failure")
                }
            })

    }



    return (
        <>
            <nav className="bg-amber-300 p-4">
                <Link className="ease-in-out delay-150 delay-300 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow" to="/">Home</Link>
            </nav>
            <div className="flex flex-col gap-4 items-center justify-center pt-10">
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
                    onChange={value => setPasscode(value)}
                    type="numeric"
                    inputMode="number"
                    focus
                    inputStyle={{ borderColor: 'black' }}
                    inputFocusStyle={{ borderColor: 'orange' }}
                    onComplete={value => attemptLogin(value)}
                    autoSelect={true}
                    regexCriteria={/[0-9]{4}/}
                />
            </div>
            <p>{passcode}</p>
        </>
    )
}

export default AdminLogin