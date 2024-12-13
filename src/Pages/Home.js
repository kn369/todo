import React, { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import axios from "axios";
import Input from "../Components/Input";
import TaskLoader from "../Components/TaskLoader";

const Home = () => {
    const [user, setUser] = useState(null);
    const [tasks, setTasks] = useState([]);

    const fetchUser = async () => {
        try {
            const id = localStorage.getItem("user");
            const response = await axios.get(`http://localhost:3000/users/${id}`);
            const userData = response.data;

            // Check if the tasks attribute is present
            if (!userData.tasks) {
                userData.tasks = [];
                // Optionally, you can update the user on the server with the new tasks attribute
                await axios.put(`http://localhost:3000/users/${id}`, userData);
            }

            setUser(userData);
            setTasks(userData.tasks);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <Container style={{ marginTop: "2rem" }}>
            <Container
                fluid
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <h1>Welcome {user ? (user.name ? user.name : user.email) : "Guest"}</h1>
                <Button
                    style={{
                        padding: "1rem",
                        height: "2.5vh",
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    Profile
                </Button>
            </Container>
            <hr />
            <Container>
                <h2>Tasks</h2>
                <Container>
                    <TaskLoader tasks={tasks} setTasks={setTasks} />
                </Container>
            </Container>
            <Container fluid>
                <Input user={user} tasks={tasks} setTasks={setTasks} />
            </Container>
        </Container>
    );
};

export default Home;
