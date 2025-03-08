import { useCallback, useEffect, useState } from "@lynx-js/react";
import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import arrow from "./assets/arrow.png";
import lynxLogo from "./assets/lynx-logo.png";
import reactLynxLogo from "./assets/react-logo.png";
import { Calendar } from "./components/Calendar.jsx";

const queryClient = new QueryClient();

export function App() {
	return (
		<view className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
			<QueryClientProvider client={queryClient}>
				<Calendar />
			</QueryClientProvider>
		</view>
	);
}
