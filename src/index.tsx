import { root } from "@lynx-js/react";
import { MemoryRouter, Route, Routes } from "react-router";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Calendar } from "./components/Calendar.jsx";
import { Header } from "./components/Header.jsx";
import { Home } from "./components/Home.jsx";
import "tailwindcss/utilities.css";

const queryClient = new QueryClient();

root.render(
	<MemoryRouter>
		<QueryClientProvider client={queryClient}>
			<view className="flex  min-h-screen bg-gray-100  p-4">
				<view className="w-full max-w-4xl">
					<Header />
					<Routes>
						<Route path="/" element={<Calendar />} />
						<Route path="/home" element={<Home />} />
					</Routes>
				</view>
			</view>
		</QueryClientProvider>
	</MemoryRouter>,
);

if (import.meta.webpackHot) {
	import.meta.webpackHot.accept();
}
