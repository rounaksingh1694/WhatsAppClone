import React, { useEffect, useState } from "react";
import {
	SignUp,
	InputImage,
	InputName,
	EnterYourName,
	InputEmail,
	EnterYourEmail,
	InputPassword,
	EnterYourPassword,
	FlexWrapperOne,
	OrSIgnIn,
	ProceedButton,
	Proceed,
} from "./SignUp";

const SignUpComponent = ({ auth }) => {
	const [isSignIn, setIsSignIn] = useState(false);
	const [proceed, setProceed] = useState(false);
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	return (
		<SignUp>
			<InputName>
				<EnterYourName
					placeholder="Enter your name"
					type="text"
					onChange={(event) => {
						const value = event.target.value;
						console.log("VALUE", value);
						setName(value);
						console.log("NAME", name);
					}}
				/>
			</InputName>
			<InputEmail>
				<EnterYourEmail
					placeholder="Enter your email"
					type="email"
					onChange={(event) => setEmail(event.target.value)}
				/>
			</InputEmail>
			<InputPassword>
				<EnterYourPassword
					placeholder="Enter your password"
					type="password"
					onChange={(event) => setPassword(event.target.value)}
				/>
			</InputPassword>
			<FlexWrapperOne>
				<OrSIgnIn onClick={() => setIsSignIn(!isSignIn)}>
					{isSignIn ? "Or Sign Up" : "Or Sign In"}
				</OrSIgnIn>
				<ProceedButton onClick={() => auth(name, email, password, isSignIn)}>
					<Proceed>PROCEED</Proceed>
				</ProceedButton>
			</FlexWrapperOne>
		</SignUp>
	);
};

export default SignUpComponent;
