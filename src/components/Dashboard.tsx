import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { supabase } from "../supabaseClient";
import type {Profile} from "../context/AuthContext"

function Dashboard() {
    const { session, signOut, loading } = UserAuth();
    useEffect(() => {
        if (session?.user) {
            supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single()
            .then(({ data, error }) => {
                console.log('Dashboard direct fetch:', data, error);
                if (!error && data) setLocalProfile(data);
            });
        }
    }, [session]);

    const [localProfile, setLocalProfile] = useState<Profile | null>(null);
    // const [submitError, setSubmitError] = useState<string>("");
    const navigate = useNavigate();

    const handleSignOut = async () => {
        await signOut();
        navigate('/signin');
    }

    if(loading) return <p>Loading...</p>;

    if(!session) {
        return (
            <div>
                <p>Please log in!</p>
                <p>Already have an account? <Link to='/signin'>Sign In</Link></p>
                <p>Don't an account yet? <Link to='/signup'>Sign Up</Link></p>
            </div>
        )
    }

    return (
        <div>
            <p>Dashboard Page</p>
            <p>Welcome {localProfile?.username}!</p>
            <p>Your email is: {session?.user.email}</p>
            <button onClick={handleSignOut}>Sign Out</button>
        </div>
    );
}

export default Dashboard;