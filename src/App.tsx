import "./App.css";
import { Calendar } from "./components/Calendar.jsx";
import { Header } from "./components/Header.js";

export function App() {
	return (
		<view className="flex items-center justify-center min-h-screen bg-gray-100  p-4">
			<view className="w-full max-w-4xl">
				<Calendar />
			</view>
		</view>
	);
}
