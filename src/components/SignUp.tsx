import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { UserAuth } from "../context/AuthContext";
import type {SyntheticEvent} from "react";

function SignUp() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    const {session, signUpNewUser } = UserAuth();
    console.log(session);

    //testing
    // console.log(email, password);

    const handleSignUp = async (e: SyntheticEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const result = await signUpNewUser({email, password});

            if(result.success) {
                navigate('/dashboard');
            }
        } catch (error) {
            setError('an error occurred with signup!')
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <form onSubmit={handleSignUp} className='max-w-md m-auto pt-24'>
                <h2 className='font-bold pb-2'>Sign up today!</h2>

                <div className="flex flex-col py-4">
                    <input onChange={(e) => setEmail(e.target.value)} className='p-3 mt-2 border-2 border-white rounded-full' type='email' placeholder='Please enter your email...'/>
                    <input onChange={(e) => setPassword(e.target.value)} className='p-3 mt-2 pb-4 border-2 border-white rounded-full' type='password' placeholder='Please enter your password...'/>
                    <button
                        type='submit'
                        disabled={loading}
                        className="mt-2 mx-auto w-48 pt-2 pb-3 border-2 border-white rounded-full 
                                    hover:bg-white hover:text-black 
                                    focus:bg-white focus:text-black 
                                    disabled:opacity-50 disabled:cursor-not-allowed
                                    transition-colors duration-200 cursor-pointer"
                        >
                        Sign Up
                    </button>
                    <p>Already have an account? <Link to='/signin'>Sign In</Link></p>
                    {error && <p className="text-red-600 text-center pt-4">{error}</p>}
                </div>
            </form>
        </div>
    );
}

export default SignUp;