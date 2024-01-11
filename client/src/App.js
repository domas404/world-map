import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import RefugeeData from "./pages/RefugeeData";

export default function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Main />}></Route>
				<Route path="/pages/RefugeeData" element={<RefugeeData />}></Route>
			</Routes>
		</Router>
	);
}
