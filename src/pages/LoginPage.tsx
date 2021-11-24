import React from "react";
import LoginForm from "../components/Auth/LoginForm";

function LoginPage() {
	return (
		<div className="flex flex-col justify-center items-center bg-green-500 w-screen min-h-screen text-black">
			<LoginForm />
		</div>
	);
}

export default LoginPage;
