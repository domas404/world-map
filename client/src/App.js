import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import DataPage from "./pages/DataPage";

export default function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Main />}></Route>
				<Route path="/pages/DataPAge" element={<DataPage />}></Route>
			</Routes>
		</Router>
	);
}
