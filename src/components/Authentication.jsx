import axios from "../axios";
import React, { Component } from "react";
import "../css/Authentication.css";
import SignUpComponent from "./SignUpComponent";
import requests from "../requests";
import { useHistory } from "react-router-dom";
import { withCookies, Cookies, useCookies } from "react-cookie";

const Authentication = () => {
	const history = useHistory();
	const [cookies, setCookie, removeCookie] = useCookies(["userData"]);

	const handleAuth = (name, email, password, isSignIn) => {
		const body = { name: name, email: email, password: password };
		console.log("BODY", body);
		if (isSignIn) {
			axios
				.post(`${requests.auth.signIn}`, body)
				.then((res) => res.data)
				.then((data) => {
					history.replace("/");
					removeCookie("userData");
					setCookie("userData", data, {
						path: "/",
					});
					console.log("COOKIES", cookies.userData);
					console.log("DATA", data);
				});
		} else {
			axios
				.post(`${requests.auth.signUp}`, body)
				.then((res) => res.data)
				.then((data) => {
					history.replace("/");
					removeCookie("userData");
					setCookie("userData", data, {
						path: "/",
					});
					console.log("DATA", data);
				});
		}
	};
	return <SignUpComponent auth={handleAuth} />;
};

export default Authentication;
