import React from "react";
import { useState, useEffect } from "react";

import Home from "./Pages/Home";
import Login from "./Pages/Login";

function App() {
	const [data, setData] = useState(null);
    const [user, setUser] = useState(null);
    
    const fetchUser = async () => {
        try {
            const response = localStorage.getItem("user");
            console.log(response)
        } catch (error) {
            console.error(error);
        }
    };

	useEffect(() => {
		fetchUser();
	});

	return <>{user ? <Home {...user} /> : <Login />}</>;
}

export default App;
