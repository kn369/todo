import React from "react";
import { Container, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import axios from "axios";
import { useState } from "react";

const SignUp = () => {
	const [data, setData] = useState({});

	const handleChange = (e) => {
		setData({ ...data, [e.target.name]: e.target.value });
		console.log(data);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (data.password !== data.confirm_password) {
			alert("Passwords do not match");
			return;
		}
		if (data.password.length < 8) {
			alert("Password must be at least 8 characters long");
			return;
		}
		try {
			await axios.post("http://localhost:3000/users", data);
			alert("Account created successfully");
		} catch (e) {
			console.error(e);
			alert("An error occurred");
		}
	};

	return (
		<Container
			fluid
			style={{
				backgroundColor: "lightgray",
				height: "100vh",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<Container
				style={{
					width: "50vw",
					backgroundColor: "white",
					borderRadius: "1rem",
					padding: "1rem",
				}}
			>
				<h1 style={{ textAlign: "center" }}>Sign up</h1>
				<p style={{ textAlign: "center" }}> to continue to ToDo App</p>
				<Form onSubmit={handleSubmit}>
					<Container style={{ marginBottom: "1rem" }}>
						<Form.Label htmlFor="email">Email</Form.Label>
						<Form.Control
							type="email"
							placeholder="Enter email"
							name="email"
							value={data.email}
							onChange={(e) => handleChange(e)}
						/>
					</Container>
					<Container style={{ marginBottom: "1rem" }}>
						<Form.Label htmlFor="password">Password</Form.Label>
						<Form.Control
							type="password"
							placeholder="Password"
							name="password"
							value={data.password}
							onChange={(e) => handleChange(e)}
						/>
					</Container>
					<Container>
						<Form.Label htmlFor="confirm_password">Confirm Password</Form.Label>
						<Form.Control
							type="password"
							placeholder="Confirm Password"
							name="confirm_password"
							value={data.confirm_password}
							onChange={(e) => handleChange(e)}
						/>
					</Container>
					<Container className="d-grid gap-2" style={{ marginTop: "2rem" }}>
						<Button variant="primary" size="" type="submit">
							Sign up
						</Button>
					</Container>
				</Form>
				<Link to="/login" style={{ margin: "1rem" }}>
					Already have an account? Log in
				</Link>
			</Container>
		</Container>
	);
};

export default SignUp;
