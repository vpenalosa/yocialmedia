import { Link, useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();

    return (
        <div>
            <button><Link to="/signin">Sign In</Link></button>
            <br />
            <button><Link to="/signup">Sign Up</Link></button>
            <br />
            <button><Link to="/dashboard">Dashboard</Link></button> {/* TODO change this later to only show up if logged in */}
        </div>
    )
}

export default Home;