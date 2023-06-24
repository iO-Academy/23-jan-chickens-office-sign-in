import { useNavigate, Link } from "react-router-dom"
import { baseURL } from "../config"

const NavLink = (props) => {
    const navigate = useNavigate()

    const handleLogout = () => {
        fetch(baseURL + '/adminlogout', {
            method: "GET",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json"
            }
        }
        ).then((response) => {
            response.status == 200 ?
                navigate("/") :
                navigate("/admin-logout/failure")
        })
    }

    const handleBulkSignout = () => {
        const today = new Date()
        today.setTime(today.getTime() - new Date().getTimezoneOffset() * 60 * 1000)
        const bulkSignOutDate = today.toISOString().substring(0, 10)
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
            if (response.status == 200) {
                navigate("/admin/today/bulk-sign-out-success")
            } else if (response.status == 401) {
                navigate("/admin-login")
            } else {
                navigate("/admin/today/bulk-sign-out-failure")
            }
        })
    }
    //receive single link name string as prop "link"
    //assign objects with handlers to variable based on prop with switch
    let link
    switch (props.link) {
        case "Admin":
            link = { name: "Admin", path: "/admin-login" }
            break;
        case "Back":
            link = {name: "Back", path: "/admin"}
            break;
        case "BulkSignOut":
            link = {name: "Bulk Sign Out", handler: handleBulkSignout}
            break;
        case "Home":
            link = { name: "Home", path: "/" }
            break;
        case "Logout":
            link = { name: "Logout", handler: handleLogout }
            break;
        default:
            link = { name: "Home", path: "/" }
    }

    return (
        <Link className="ease-in-out delay-150 duration-300 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow h-fit" to={link.path} {...(link.handler ? { onClick: () => link.handler() } : {})}>{link.name}</Link>
    )

}

export default NavLink