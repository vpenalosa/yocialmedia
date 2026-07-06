import { createContext, useEffect, useState, useContext } from "react";
import { supabase } from "../supabaseClient";
import type { Session, AuthError } from "@supabase/supabase-js";
import type { ReactNode } from "react";

export type Profile = {
    id: string,
    username: string
}

interface AuthContextType {
    session: Session | null | undefined;
    profile: Profile | null;
    signUpNewUser: (args: {username: string, email: string; password: string}) => Promise<AuthResult>;
    signInUser: (args: {email: string; password: string}) => Promise<AuthResult>;
    signOut: () => Promise<void>;
    loading: boolean;
}

interface AuthResult {
    success: boolean;
    data?: unknown;
    error?: AuthError;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthContextProvider = ({children}: {children: ReactNode}) => {
    const [session, setSession] = useState<Session | null | undefined>(undefined);
    const [profile, setProfile] = useState<Profile | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    //fetch the username from the public table
    async function fetchProfile(userId: string) {

        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', userId) //basically a where clause, return row if it matches the userid
            .single() //return only 1 row

        if(error) {
            if (import.meta.env.DEV) console.error('Error fetching profile: ', error);
            return;
        }

        setProfile(data);
    }

    //sign up
    const signUpNewUser = async ({username, email, password}: {username: string, email: string, password: string}): Promise<AuthResult> => {
        const {data, error} = await supabase.auth.signUp({
            email: email,
            password: password,
            options: {
                data: {username} //read by the trigger
            }
        });

        if(error) {
            if(import.meta.env.DEV) console.error('There was a problem signing up: ', error);
            return {success: false, error};
        } else {
            return {success: true, data}
        }
    }

    //sign in
    const signInUser = async ({email, password}: {email: string, password: string}): Promise<AuthResult> => {
        const {data, error} = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        });

        if(error) {
            if(import.meta.env.DEV) console.error('sign in error occured, ', error);
            return { success: false, error};
        } else {
            return {success: true, data};
        }
    }

    useEffect(() => {
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            if (!session) {
                setProfile(null);
                setLoading(false);
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    // separate effect that runs when session changes
    useEffect(() => {

        if (session === undefined) return;

        //fetch the username
        if (session?.user) {
            supabase
                .from('profiles')
                .select('*')
                .eq('id', session.user.id)
                .single()
                .then(({ data, error }) => {
                    if (!error && data) {
                        setProfile(data);
                    }
                    setLoading(false);
                });
        }
    }, [session]);

    //sign out
    const signOut = async () => {
        const {error} = await supabase.auth.signOut();

        if(error) {
            if(import.meta.env.DEV) console.error("There was an error signing out: ", error);
        }
    };

    return (
    <AuthContext.Provider value={{session, profile, signUpNewUser, signInUser, signOut, loading}}>
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