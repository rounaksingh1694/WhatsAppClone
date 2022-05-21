import React, { Component } from "react";
import { BrowserRouter, Link, Switch, Route } from "react-router-dom";
import App from "./App";
import Authentication from "./components/Authentication";
import CookieApp from "./CookieApp";

const Router = () => {
	return (
		<BrowserRouter>
			<Switch>
				<Route exact path="/" component={CookieApp} />
				<Route exact path="/auth" component={Authentication} />
			</Switch>
		</BrowserRouter>
	);
};

export default Router;
