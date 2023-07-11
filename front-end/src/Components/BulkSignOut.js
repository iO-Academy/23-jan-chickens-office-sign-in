import { useEffect } from "react"
import { useOutletContext, useNavigate, useLocation } from "react-router-dom"
import { baseURL } from "../config"
import IOLogoContainer from "./IOLogoContainer"
import LoadingSpinner from "./LoadingSpinner"

const BulkSignOut = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const [, setLinks,, setReplace] = useOutletContext()
    useEffect(() => {
        setLinks(["Back"])
        setReplace(true)
        return () => setReplace(null)
    }, [setLinks, setReplace])

    useEffect(() => {
        const today = new Date()
        today.setTime(today.getTime() - new Date().getTimezoneOffset() * 60 * 1000)
        const bulkSignOutDate = today.toLocaleDateString("en-GB")
        const bulkSignOutTime = today.toISOString().substring(11, 16)
        const requestBody = {
            signOutDate: bulkSignOutDate,
            signOutTime: bulkSignOutTime
        }

        fetch(baseURL + '/visitors', {
            method: 'PUT',
            credentials: 'include',
            body: JSON.stringify(requestBody),
            headers: {
                "Content-Type": "application/json"
            }
        }).then((response) => {
            if (response.status === 200) {
                navigate("/admin/today/bulk-sign-out/success", { replace: true })
            } else if (response.status === 401) {
                navigate("/admin/login", { replace: true })
            } else if (window.location.pathname === location.pathname) {
                navigate("failure", { replace: true, state: response.status })
            }
        })
            .catch((e) => {
                console.error(e.message)
                window.location.pathname === location.pathname && navigate("failure", { replace: true })
            })
    }, [navigate, location.pathname])

    return (
        <IOLogoContainer >
            <LoadingSpinner message="Signing out all visitors..." />
        </IOLogoContainer>
            )
}

export default BulkSignOut