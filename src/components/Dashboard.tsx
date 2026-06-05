import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

function Dashboard() {
    const { session, profile, signOut } = UserAuth(); 
    const [ submitError, setSubmitError] = useState<string>("");
    const navigate = useNavigate();

    const handleSignOut = async () => {
        await signOut();
        navigate('/signin');
    }

    return (
        <div>
            <p>Dashboard Page</p>
            <p>Welcome {profile?.username}!</p>
            <p>Your email is: {session?.user.email}</p>
            <button onClick={handleSignOut}>Sign Out</button>
            {submitError && <p className="text-red-600 text-center pt-4">{submitError}</p>}
        </div>
    );
}

export default Dashboard;