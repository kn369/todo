import React, { useState, useEffect } from "react";
import { Container, Form } from "react-bootstrap";
import axios from "axios";

const Input = () => {
	const [isChecked, setIsChecked] = useState(false);
	const [taskName, setTaskName] = useState("");
	const [user, setUser] = useState(null);
	const [tasks, setTasks] = useState(null);

	const fetchUser = async () => {
		try {
			const id = localStorage.getItem("user");
			const response = await axios.get(`http://localhost:3000/users/${id}`);
			const userData = response.data;

			// Ensure tasks attribute is present
			if (!userData.tasks) {
				userData.tasks = [];
			}

			setUser(userData);
         setTasks(userData.tasks);
		} catch (error) {
			console.error(error);
		}
	};

	const handleAdd = async () => {
		if (!user) {
			console.error("User is not loaded yet");
			return;
		}

		try {
			const id = localStorage.getItem("user");
			const newTask = { name: taskName, user: id };
			const updatedUser = { ...user, tasks: [...user.tasks, newTask] };

			// Update the user with the new task
			await axios.put(`http://localhost:3000/users/${id}`, updatedUser);

			// Update the tasks state
			setTasks([...tasks, newTask]);
			setUser(updatedUser);
		} catch (error) {
			console.error(error);
		}
		setTaskName("");
		setIsChecked(false);
	};

	useEffect(() => {
		fetchUser();
	}, []);

	return (
		<Container style={{ display: "flex" }}>
			<Container
				style={{
					borderRadius: "1rem",
					border: "solid",
					height: "4vh",
					width: "4vh",
					margin: "0",
					marginBottom: "1rem",
				}}
			></Container>
			{isChecked ? (
				<Container style={{ borderBottom: "solid" }}>
					<Form style={{ display: "flex", alignItems: "center" }}>
						<input
							type="text"
							value={taskName}
							onChange={(e) => setTaskName(e.target.value)}
							placeholder="Type your task here"
							style={{
								width: "100%",
								height: "2rem",
								border: "none",
								outline: "none",
							}}
							onKeyDown={(e) => {
								if (e.key === "Escape") {
									setIsChecked(false);
								}

								if (e.key === "Enter") {
									handleAdd();
								}
							}}
							name="taskName"
						/>
						<label htmlFor="deadline">Deadline </label>
						<input type="date" name="deadline" id="deadline" />
					</Form>
				</Container>
			) : (
				<Container
					onClick={() => {
						setIsChecked(true);
					}}
					style={{
						borderBottom: "solid",
						display: "flex",
						justifyContent: "flex-start",
						padding: "0",
					}}
					fluid
				></Container>
			)}
		</Container>
	);
};

export default Input;
