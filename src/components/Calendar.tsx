import { useMemo, useState } from "@lynx-js/react";
import NepaliDate from "nepali-datetime";
import { useNavigate } from "react-router";
import { useCalendarData } from "../query/calendar.js";
import { cn } from "../utils/cn.js";
import { Header } from "./Header.jsx";
import { TodayWidget } from "./TodayWidget.js";
import { UpcomingEvents } from "./UpcomingEvents.jsx";

export function Calendar() {
	const validYearAndMonth = useMemo(() => {
		return new NepaliDate();
	}, []);

	const nav = useNavigate();
	const [currentNepaliDate] = useState(validYearAndMonth);
	const { data: calendarData } = useCalendarData(currentNepaliDate);
	console.log("calendarData", calendarData);
	const dayNames = ["आइत", "सोम", "मंगल", "बुध", "बिही", "शुक्र", "शनि"];

	return (
		<scroll-view
			className="flex flex-col gap-4 h-[100vh]"
			scroll-orientation="vertical"
		>
			<view className="w-full max-w-[800px] bg-white rounded-lg shadow-lg p-6">
				{/* Calendar Header */}
				<view className="flex items-center justify-between mb-6">
					<view className="flex items-center">
						<text className="text-2xl font-bold text-gray-800">
							{currentNepaliDate.format("MMMM YYYY")}
						</text>
					</view>
				</view>

				{/* Days of Week Header */}
				<view className="grid grid-cols-7 mb-2">
					{dayNames.map((day) => (
						<view key={day} className="p-2">
							<text className="text-gray-600 text-sm font-semibold text-center">
								{day}
							</text>
						</view>
					))}
				</view>

				{/* Calendar Grid */}
				<view className="grid grid-cols-7 gap-1">
					{/* Add empty cells for proper alignment */}
					{calendarData?.[0]?.calendarInfo.days.codes.en &&
						[
							...Array(Number(calendarData[0].calendarInfo.days.codes.en) - 1),
						].map((_, index) => (
							<view
								key={`empty-${currentNepaliDate.format("YYYY-MM")}-${index}`}
								className="aspect-square p-1"
							/>
						))}

					{calendarData?.map((day, index) => {
						const isToday =
							day.calendarInfo.dates.bs.full.en ===
							currentNepaliDate.format("YYYY-MM-DD");
						const isHoliday =
							day.eventDetails.some((event) => event.isHoliday) ||
							day.calendarInfo.days.codes.en === "7";

						return (
							<view
								key={`${day.calendarInfo.dates.bs.full.en}`}
								className={cn(
									"aspect-square p-1 rounded-lg",
									isToday && "bg-indigo-50 border-indigo-200",
								)}
							>
								<view className="h-full flex flex-col">
									<view className="flex justify-between">
										<text
											className={cn(
												"text-[10px]",
												isHoliday ? "text-red-600" : "text-gray-600",
											)}
										>
											{day.calendarInfo.dates.ad.day.en}
										</text>
									</view>
									<text
										className={cn(
											"grow flex items-center justify-center text-2xl font-semibold text-center",
											isHoliday ? "text-red-600" : "text-gray-500",
										)}
									>
										{day.calendarInfo.dates.bs.day.np}
									</text>
								</view>
							</view>
						);
					})}
				</view>
			</view>
			<text className="text-md font-bold text-gray-800 flex flex-col my-2">
				Today
			</text>
			<TodayWidget />
			<view className="flex flex-col my-2">
				<view className="flex flex-row justify-between">
					<text className="text-md font-bold text-gray-800">
						Upcoming Events
					</text>
					<text
						bindtap={() => nav("/home")}
						className="text-sm text-indigo-500"
					>
						View all &gt;&gt;
					</text>
				</view>
			</view>
			<UpcomingEvents
				currentNepaliDate={currentNepaliDate}
				calendarData={calendarData}
			/>
		</scroll-view>
	);
}
