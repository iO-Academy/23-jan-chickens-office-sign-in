import { useNavigate, useOutletContext, useLocation } from 'react-router-dom'
import PinInput from 'react-pin-input'
import { baseURL } from '../config'
import { useState, useEffect } from 'react'
import LoadingSpinner from './LoadingSpinner'
import IOLogoContainer from './IOLogoContainer'

const AdminLogin = () => {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const [, setLinks] = useOutletContext()
    const location = useLocation()
    useEffect(() => setLinks(["Home"]), [setLinks])

    const attemptLogin = (value) => {
        setIsLoading(true)
        fetch(baseURL + "/verify", {
            method: "POST",
            credentials: 'include',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ passcode: value }),
        })
            .then((response) => {
                setIsLoading(false)
                if (response.status === 200) {
                    navigate("/admin")
                } else if (response.status === 401) {
                    navigate("/admin/login/incorrect")
                } else if (window.location.pathname === location.pathname) {
                    navigate("failure", { state: response.status })
                }
            })
            .catch((e) => {
                console.error(e.message)
                window.location.pathname === location.pathname && navigate("failure")
            })
    }

    return (
                <IOLogoContainer>
                    {isLoading ? <LoadingSpinner message="Verifying passcode..." /> : 
                    <>
                        <h1 className="text-3xl p-1 text-center">Admin login</h1>
                        <h2 className="text-center p-1">Please enter the admin passcode</h2>
                        <div className="flex flex-row justify-center p-10">
                            <PinInput
                                length={4}
                                initialValue=""
                                secret
                                secretDelay={100}
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
                    </>
                    }
                </IOLogoContainer>
    )
}

export default AdminLogin