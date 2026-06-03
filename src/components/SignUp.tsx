import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { UserAuth } from "../context/AuthContext";
import { validationMethods, mapSignUpError } from "../helpers";
import { Eye, EyeOff } from 'lucide-react';
import type {SyntheticEvent} from "react";

type FieldErrors = {
    username: string | null;
    email: string | null;
    password: string | null;
};

function SignUp() {
    const [username, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [fieldErrors, setFieldErrors] = useState<FieldErrors>({username: null, email: null, password: null}); //validation error
    const [submitError, setSubmitError] = useState<string>(""); //supabase error
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    const {session, signUpNewUser } = UserAuth();
    // console.log(session);

    //testing
    // console.log(email, password);

    const handleSignUp = async (e: SyntheticEvent) => {
        e.preventDefault(); //make it so it doesn't reload the page on call 
        setLoading(true);
        setSubmitError("");

        //validate inputs
        const newUsername = validationMethods.checkUsername(username);
        const newEmail = validationMethods.checkEmail(email);
        const newPassword = validationMethods.checkPassword(password);

        //error check the input fields
        setFieldErrors({
            username: newUsername.error,
            email: newEmail.error,
            password: newPassword.error
        })

        if(newUsername.error || newEmail.error || newPassword.error) {
            setLoading(false);
            return;
        }

        const result = await signUpNewUser({
            username: newUsername.value, 
            email: newEmail.value, 
            password: newPassword.value
        });

        if(result.success) {
            navigate('/dashboard');
        } else {
            setSubmitError(mapSignUpError(result.error?.message ?? ''));
        }

        setLoading(false);
    }

    return (
        <div>
            <form onSubmit={handleSignUp} className='max-w-md m-auto pt-24'>
                <h2 className='font-bold pb-2'>Sign up today!</h2>

                <div className="flex flex-col py-4">

                    {/* username */}
                    <div className="relative">
                        <input onChange={(e) => {setUsername(e.target.value); setFieldErrors(prev => ({ ...prev, username: null }));}} 
                               className='w-full p-3 mt-2 border-2 border-white rounded-full' 
                               placeholder='Please enter your username...'/>
                        {fieldErrors.username && (
                            <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3 bg-red-600 text-white text-xs rounded-lg px-3 py-1.5 whitespace-nowrap z-10
                                            before:content-[''] before:absolute before:right-full before:top-1/2 before:-translate-y-1/2 before:border-4 before:border-transparent before:border-r-red-600">
                                {fieldErrors.username}
                            </div>
                        )}
                    </div>


                    {/* email */}
                    <div className="relative">
                        <input onChange={(e) => {setEmail(e.target.value); setFieldErrors(prev => ({ ...prev, email: null }));}} 
                               className='w-full p-3 mt-2 border-2 border-white rounded-full' 
                               placeholder='Please enter your email...'/>
                        {fieldErrors.email && (
                            <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3 bg-red-600 text-white text-xs rounded-lg px-3 py-1.5 whitespace-nowrap z-10
                                            before:content-[''] before:absolute before:right-full before:top-1/2 before:-translate-y-1/2 before:border-4 before:border-transparent before:border-r-red-600">
                                {fieldErrors.email}
                            </div>
                        )}
                    </div>

                    {/* password */}
                    <div className="relative">
                        <input onChange={(e) => {setPassword(e.target.value); setFieldErrors(prev => ({ ...prev, password: null }));}} 
                               className='w-full p-3 mt-2 pb-4 border-2 border-white rounded-full' 
                               type={showPassword ? 'text' : 'password'} 
                               placeholder='Please enter your password...'/>
                        <button
                            type='button'
                            onClick={() => setShowPassword(prev => !prev)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 mt-1 text-xs text-gray-400 hover:text-white transition-colors"
                        >
                            {showPassword ? <EyeOff size={32} /> : <Eye size={32} />}
                        </button>
                        {fieldErrors.password && (
                            <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3 bg-red-600 text-white text-xs rounded-lg px-3 py-1.5 whitespace-nowrap z-10
                                            before:content-[''] before:absolute before:right-full before:top-1/2 before:-translate-y-1/2 before:border-4 before:border-transparent before:border-r-red-600">
                                {fieldErrors.password}
                            </div>
                        )}
                    </div>


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
                    {submitError && <p className="text-red-600 text-center pt-4">{submitError}</p>}
                </div>
            </form>
        </div>
    );
}

export default SignUp;