import { useNavigate, Link } from "react-router-dom";

const Admin = () => {
    const navigate = useNavigate()
    setTimeout(function() {
        //set login to false
        navigate("/adming-login");
      }, 500000);
    
    return (
        <>
            <nav>
                <Link to="/admin-login">Logout</Link>
            </nav>
            <h1>Admin</h1>
            <button>Today</button>
            <button>History</button>
        </>
    )
}

export default Admin