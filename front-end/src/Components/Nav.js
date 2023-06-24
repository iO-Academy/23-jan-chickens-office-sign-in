import { Link } from 'react-router-dom'
import { useLocation } from "react-router-dom"
import { useState, useEffect } from 'react'
import NavLink from "./NavLink"

const Nav = (props) => {
    // props.links.forEach(element => {
    //     console.dir(element.handler)
    // });
    // console.dir(props.links.handler)

    // const [links, setLinks] = useState([])
    // let props.links ?? [{}]


    const { pathname } = useLocation();
    //     useEffect(() => {
    //     console.log(pathname)
    //     // pathname === '/' && links.push({name: "Home", path: "/"})
    //     if(pathname === '/' || '/admin-login') {
    //         setLinks([{name: "Home", path: "/"}])
    //     } else {
    //         setLinks([{name: "Admin", path: "/admin-login"}])
    //     }
    // }, [])

    // let links
    // if(pathname === '/' || pathname === '/admin-login') {
    //     links = [{name: "Home", path: "/"}]
    // } else {
    //     links = ([{name: "Admin", path: "/admin-login"}])
    // }

    // /admin = logout
    // /"/admin-logout/failure" = home
    // //admin/today/bulk-sign-out-failure = home
    // //admin/history = {name: "Back", path: "/admin"}
    // /"/admin-login" = home
    // /"/admin-login/failure" = {name: "Admin", path: "/admin-login"}

    return (
        //     <nav className={`bg-amber-300 p-4 flex ${links.length > 1 ? "justify-between" : ""}`}>
        //     {
        //         links?.map((link, index) => {
        //             return (
        //                 <Link className="ease-in-out delay-150 duration-300 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow" to={link.path} {...(link.handler ? { onClick: () => link.handler() } : {})}>{link.name}</Link>
        //             )
        //         })
        //     }
        // </nav>


        // <nav className={`bg-amber-300 p-4 flex ${props.links.length > 1 ? "justify-between" : ""}`}>
        //     {
        //         props.links?.map((link) => {
        //             return (
        //                 <NavLink link={link}/>
        //             )
        //         })
        //     }
        // </nav>

                <nav className={`bg-amber-300 p-4 h-16 flex items-center ${props?.links?.length > 1 ? "justify-between" : ""}`}>
            {
                props?.links?.map((link) => {
                    return (
                        <NavLink link={link}/>
                    )
                })
            }
        </nav>
    
    )


//         < nav className = {`bg-amber-300 p-4 flex ${props.links.length > 1 ? "justify-between" : ""}`
// }>
// {
//     props.links?.map((link) => {
//         return (
//             <Link className="ease-in-out delay-150 duration-300 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow" to={link.path} {...(link.handler ? { onClick: () => link.handler() } : {})}>{link.name}</Link>
//         )
//     })
// }
// </nav >

}
export default Nav