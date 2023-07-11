import { useNavigate, Link, useLocation } from "react-router-dom"
import { baseURL } from "../config"

const Button = (props) => {
    const navigate = useNavigate()
    const location = useLocation()

    const handleLogout = () => {
        fetch(baseURL + '/adminlogout', {
            method: "GET",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json"
            }
        }
        ).then((response) => {
            response.status === 200 ?
                navigate("/") :
                navigate("/admin/logout/failure", {state: response.status})
        })
        .catch((e) => {
            console.error(e.message)
            window.location.pathname === location.pathname && navigate("/admin/logout/failure")
        })
    }

    const link = { name: props?.link }
    switch (props?.link) {
        case "Admin":
        case "Login":
            link['path'] = "/admin/login"
            break;
        case "Back":
            link['path'] = ".."
            link['relative'] = true
            break;
        case "Bulk Sign Out":
            link['path'] = "/admin/today/bulk-sign-out"
            break;
        case "History":
            link['path'] = "/admin/history"
            break;
        case "Home":
            link['path'] = "/"
            break;
        case "Logout":
            link['handler'] = handleLogout
            break;
        case "Sign In":
            link['path'] = "/sign-in"
            break;
        case "Sign Out":
            link['path'] = "/sign-out"
            break;
        case "Today":
            link['path'] = "/admin/today"
            break;
        default:
            link['path'] = "/"
    }

    if (props.link) {
        return (
            <Link className="ease-in-out delay-150 duration-300 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow h-fit" to={link.path} {...(link.relative ? { relative: "path" } : {})} {...(link.handler ? { onClick: () => link.handler() } : {})} {...(props.replace ? { replace: true } : {})}>{link.name}</Link>
        )
    }
}

export default Button