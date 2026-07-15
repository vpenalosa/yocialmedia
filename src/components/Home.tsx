import { Link, useNavigate } from "react-router-dom";
import VideoCard from "./VideoCard";
import TrickGrid from "./TrickGrid";

function Home() {
    const navigate = useNavigate();

    return (
        <div>
            <button><Link to="/signin">Sign In</Link></button>
            <br />
            <button><Link to="/signup">Sign Up</Link></button>
            <br />
            <button><Link to="/dashboard">Dashboard</Link></button> {/* TODO change this later to only show up if logged in */}

            <TrickGrid />
        </div>
    )
}

export default Home;