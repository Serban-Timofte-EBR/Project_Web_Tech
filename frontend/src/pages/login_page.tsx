import React from "react";
import LoginForm from "../components/auth/Login/login_form";

const LoginPage: React.FC = () => {
    const handle_login = (email: string, password: string) => {
        console.log("Logging in with email: ", email, " and password: ", password)
    }

    return (
        <div>
            <LoginForm onSubmit={handle_login} />
        </div>
    )
}

export default LoginPage;