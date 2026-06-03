type ValidationResult = { value: string; error: string | null };

export const validationMethods = {
    checkString(str: string, minLength: number, maxLength: number, fieldName: string = "String"): ValidationResult {
        const trimmed = str.trim();
        if (trimmed.length === 0) return { value: '', error: `${fieldName} cannot be empty!` };
        if (trimmed.length < minLength) return { value: '', error: `${fieldName} must be at least ${minLength} characters long!` };
        if (maxLength !== Infinity && trimmed.length > maxLength) return { value: '', error: `${fieldName} must be no more than ${maxLength} characters long!` };
        return { value: trimmed, error: null };
    },

    checkUsername(username: string): ValidationResult {
        const { value: trimmed, error } = this.checkString(username, 5, Infinity, "Username");
        if (error) return { value: '', error };
        if (!/^[a-zA-Z0-9]+$/.test(trimmed)) return { value: '', error: 'Username can only contain letters and numbers!' };
        if (/^\d+$/.test(trimmed)) return { value: '', error: 'Username cannot be only numbers!' };
        return { value: trimmed.toLowerCase(), error: null };
    },

    checkPassword(password: string): ValidationResult {
        if (password.length < 10) return { value: '', error: 'Password must be at least 10 characters long!' };
        if (/\s/.test(password)) return { value: '', error: 'Password cannot contain spaces!' };
        if (!/[a-z]/.test(password)) return { value: '', error: 'Password must contain at least one lowercase letter!' };
        if (!/[A-Z]/.test(password)) return { value: '', error: 'Password must contain at least one uppercase letter!' };
        if (!/\d/.test(password)) return { value: '', error: 'Password must contain at least one number!' };
        if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) return { value: '', error: 'Password must contain at least one special character!' };
        return { value: password, error: null };
    },

    checkEmail(email: string): ValidationResult {
        const trimmed = email.trim();
        if (trimmed.length === 0) return { value: '', error: 'Email cannot be empty!' };
        if (!/^[^\s@]+@/.test(trimmed)) return { value: '', error: 'Email must contain an @ symbol!' };
        if (!/^[^\s@]+@[^\s@]+/.test(trimmed)) return { value: '', error: 'Email must have a domain after @!' };
        if (!/^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(trimmed)) return { value: '', error: 'Email must have a valid ending (e.g. .com, .org)!' };
        return { value: trimmed, error: null };
    }
};

export function mapSignUpError(message: string): string {
    if (message.includes('User already registered')) return 'An account with that email already exists!';
    if (message.includes('username')) return 'That username is already taken!';
    if (message.includes('Database error saving new user')) return 'That username is already taken!';
    return 'Signup failed. Please try again!';
}