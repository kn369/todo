import React from "react";
import { Container } from "react-bootstrap";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import axios from "axios";

const TaskLoader = ({ tasks, setTasks }) => {
	const today = new Date();
	const todayString = today.toISOString().split("T")[0]; // Get the date part in 'YYYY-MM-DD' format

	const handleCheck = async (e) => {
		const id = localStorage.getItem("user");
		const taskName = e.target.parentElement.innerText;
		const newTasks = tasks.filter((task) => task.name !== taskName);

		try {
			const response = await axios.get(`http://localhost:3000/users/${id}`);
			const userData = response.data;
			const updatedUser = { ...userData, tasks: newTasks };
			console.log(updatedUser);
			await axios.put(`http://localhost:3000/users/${id}`, updatedUser);
			setTasks(newTasks);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<Container>
			<Container>
				<p>Today</p>
				{tasks.map((task, index) => {
					const isToday = task.deadline === todayString;
					return (
						<Container
							key={index}
							style={{ backgroundColor: isToday ? "lightgreen" : "white" }}
						>
							<input type="checkbox" onChange={handleCheck} />
							<p>{task.name}</p>
							<p>{task.deadline}</p>
							{isToday && <p>Due Today!</p>}
						</Container>
					);
				})}
			</Container>
		</Container>
	);
};

export default TaskLoader;
