import { root } from "@lynx-js/react";
import { MemoryRouter, Route, Routes } from "react-router";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Calendar } from "./components/Calendar.jsx";
import { DateConverter } from "./components/DateConverter.jsx";
import { Header } from "./components/Header.jsx";
import "tailwindcss/utilities.css";
import { queryClient } from "./lib/persister.js";

root.render(
	<MemoryRouter>
		<QueryClientProvider client={queryClient}>
			<view className="flex  min-h-screen bg-gray-100  p-4">
				<view className="w-full max-w-4xl h-full">
					<Header />
					<Routes>
						<Route path="/" element={<Calendar />} />
						<Route path="/converter" element={<DateConverter />} />
					</Routes>
				</view>
			</view>
		</QueryClientProvider>
	</MemoryRouter>,
);

if (import.meta.webpackHot) {
	import.meta.webpackHot.accept();
}
