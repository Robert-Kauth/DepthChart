export async function validateSignupEmail(email) {
    const res = await fetch(`/api/auth/validate_signup_email/${email}`);
    const isValid = await res.json();
    return isValid;
}

export async function validateLoginEmail(email) {
    const res = await fetch(`/api/auth/validate_login_email/${email}`);
    const isValid = await res.json();
    return isValid;
}
