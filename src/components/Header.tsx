import { useNavigate } from "react-router";
// import { DarkModeToggle } from "./DarkModeToggle.jsx";
export function Header() {
	const nav = useNavigate();
	return (
		<view className="flex bg-white flex-row justify-between mb-2 p-2 rounded-lg">
			<view
				className="flex flex-row items-center gap-4"
				bindtap={() => nav("/")}
			>
				<text className="text-2xl text-gray-800">🏠 Miti</text>
			</view>
			{/* <DarkModeToggle /> */}
		</view>
	);
}
