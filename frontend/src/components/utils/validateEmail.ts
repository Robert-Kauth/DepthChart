export async function validateSignupEmail(
    email: string
): Promise<{ is_email_unique: boolean }> {
    const res = await fetch(`/api/auth/validate_signup_email/${email}`);
    const isValid = await res.json();
    return isValid;
}

export async function validateLoginEmail(
    email: string
): Promise<{ is_user: boolean }> {
    const res = await fetch(`/api/auth/validate_login_email/${email}`);
    const isValid = await res.json();
    return isValid;
}
