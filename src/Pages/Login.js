import React from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Login = () => {
	const [data, setData] = useState({});

	const handleChange = (e) => {
		setData({ ...data, [e.target.name]: e.target.value });
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.get("http://localhost:3000/users");
			const user = response.data.find(
				(user) => user.email === data.email && user.password === data.password
			);
			if (!user) {
				alert("Invalid email or password");
				return;
			}
			localStorage.setItem("user", user.id);
			window.location.href = "/home";
			alert("Login successful");
		} catch (e) {
			console.error(e);
		}
	};

	return (
		<Container
			fluid
			style={{
				display: "flex",
				height: "100vh",
				justifyContent: "center",
				alignItems: "center",
				backgroundColor: "lightgray",
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
				<h1 style={{ textAlign: "center" }}>Login</h1>
				<p style={{ textAlign: "center" }}> to continue to ToDo App</p>
				<Form onSubmit={handleSubmit}>
					<Container style={{ marginBottom: "1rem" }}>
						<Form.Label htmlFor="email">Email</Form.Label>
						<Form.Control
							type="email"
							placeholder="Enter email"
							name="email"
							value={data.email}
							onChange={handleChange}
						/>
					</Container>
					<Container>
						<Form.Label htmlFor="password">Password</Form.Label>
						<Form.Control
							type="password"
							placeholder="Password"
							name="password"
							value={data.password}
							onChange={handleChange}
						/>
					</Container>
					<Container className="d-grid gap-2" style={{ marginTop: "2rem" }}>
						<Button variant="primary" type="submit">
							Login
						</Button>
					</Container>
				</Form>
				<Link to="/signup" style={{ margin: "1rem" }}>
					Don't have an account? Sign up
				</Link>
			</Container>
		</Container>
	);
};

export default Login;
