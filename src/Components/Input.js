import React, { useState } from "react";
import { Container, Form } from "react-bootstrap";
import axios from "axios";

const Input = ({ user, tasks, setTasks }) => {
	const [isChecked, setIsChecked] = useState(false);
	const [taskName, setTaskName] = useState("");
	const [deadline, setDeadline] = useState("");

	const handleAdd = async () => {
		if (!user) {
			console.error("User is not loaded yet");
			return;
		}

		if (taskName === "") {
			console.error("Task name is empty");
			return;
		}

		try {
			const id = localStorage.getItem("user");
			const newTask = { name: taskName, user: id, deadline: deadline };
			const updatedUser = { ...user, tasks: [...user.tasks, newTask] };

			// Update the user with the new task
			await axios.put(`http://localhost:3000/users/${id}`, updatedUser);

			// Update the tasks state
			setTasks([...tasks, newTask]);
		} catch (error) {
			console.error(error);
		}
		setTaskName("");
		setDeadline("");
		setIsChecked(false);
	};

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
				onClick={() => setIsChecked(true)}
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
						<input
							type="date"
							value={deadline}
							onChange={(e) => setDeadline(e.target.value)}
							name="deadline"
							id="deadline"
						/>
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
