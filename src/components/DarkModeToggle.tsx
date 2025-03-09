import { useAtom } from "jotai";
import { darkModeAtom } from "../atoms/darkMode.js";

export function DarkModeToggle() {
	const [darkMode, setDarkMode] = useAtom(darkModeAtom);
	return (
		<text
			bindtap={() => setDarkMode(!darkMode)}
			className="p-2 rounded-lg bg-gray-200 "
		>
			{darkMode ? "🌙" : "☀️"}
		</text>
	);
}
