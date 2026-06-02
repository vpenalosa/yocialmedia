import { createContext, useEffect, useState, useContext } from "react";
import { supabase } from "../supabaseClient";
import type { Session, AuthError } from "@supabase/supabase-js";
import type { ReactNode } from "react";
// import { AuthError } from "@supabase/supabase-js";

interface AuthContextType {
    session: Session | null | undefined;
    signUpNewUser: (args: {email: string; password: string}) => Promise<AuthResult>;
    signInUser: (args: {email: string; password: string}) => Promise<AuthResult>;
    signOut: () => Promise<void>;
}

interface AuthResult {
    success: boolean;
    data?: unknown;
    error?: AuthError;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthContextProvider = ({children}: {children: ReactNode}) => {
    const [session, setSession] = useState<Session | null | undefined>(undefined);

    //sign up
    const signUpNewUser = async ({email, password}: {email: string, password: string}): Promise<AuthResult> => {
        const {data, error} = await supabase.auth.signUp({
            email: email,
            password: password
        });

        if(error) {
            console.error('There was a problem signing up: ', error);
            return {success: false, error};
        } else {
            return {success: true, data}
        }
    }

    //sign in
    const signInUser = async ({email, password}: {email: string, password: string}): Promise<AuthResult> => {
        try {
            const {data, error} = await supabase.auth.signInWithPassword({
                email: email,
                password: password
            });

            if(error) {
                console.error('sign in error occured, ', error);
                return { success: false, error};
            } else {
                console.log('sign-in success: ', data);
                return {success: true, data};
            }

        } catch(error) {
            console.error('An error occured signing in, ', error);
            return {success: false, error: error as AuthError}
        }
    }

    //useeffect maintaining session
    useEffect(() => {
        supabase.auth.getSession().then(({data: {session}}) => {
            setSession(session);
        });

        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        })
    }, []);

    //sign out
    const signOut = async () => {
        const {error} = await supabase.auth.signOut();

        if(error) {
            console.error("There was an error signing out: ", error);
        }
    };

    return (
        <AuthContext.Provider value={{session, signUpNewUser, signInUser, signOut}}>
            {children}
        </AuthContext.Provider>
    )
}

export const UserAuth = () => {
    const context = useContext(AuthContext);
    if(!context) { //this check makes sure its never undefined
        throw new Error("UserAuth must be used within an AuthContextProvider");
    }
    return context;
}