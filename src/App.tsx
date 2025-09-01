import { Link, Route, Routes } from "react-router-dom";
import About from "./pages/About";
import Home from "./pages/Home";
import "./App.css";

export default function App() {
	return (
		<div className="app">
			<nav>
				<Link to="/">Home</Link>
				<Link to="/about">About</Link>
			</nav>

			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/about" element={<About />} />
			</Routes>
		</div>
	);
}
