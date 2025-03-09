import { useEffect, useMemo, useState } from "@lynx-js/react";
import { useMainThreadRef } from "@lynx-js/react";
import { useNavigate } from "react-router";
import { useCalendarData } from "../query/calendar.js";
import { NepaliDate, type NepaliDateType } from "../types/nepalidate.js";
import { cn } from "../utils/cn.js";
import { Header } from "./Header.jsx";
import { MonthCalendar } from "./MonthCalendar.jsx";
import { TodayWidget } from "./TodayWidget.js";
import { UpcomingEvents } from "./UpcomingEvents.jsx";

export function Calendar() {
	const nav = useNavigate();
	const [currentNepaliDate, setCurrentNepaliDate] = useState(new NepaliDate());
	const [showAllEvents, setShowAllEvents] = useState(true);
	const { data: currentMonthData } = useCalendarData(currentNepaliDate);
	console.log("currentMonthData", currentMonthData);
	const dayNames = ["आइत", "सोम", "मंगल", "बुध", "बिही", "शुक्र", "शनि"];

	const getPreviousMonthDate = (date: NepaliDateType) => {
		const year = date.getYear();
		const month = date.getMonth();
		const day = date.getDate();

		const newDate = new NepaliDate();
		newDate.setYear(year);
		newDate.setMonth(month);
		newDate.setDate(day);

		if (month === 0) {
			newDate.setYear(year - 1);
			newDate.setMonth(11);
		} else {
			newDate.setMonth(month - 1);
		}

		return newDate;
	};

	const getNepaliDate = (date: NepaliDateType) => {
		console.log("date", date);
		return new NepaliDate(date);
	};

	const getNextMonthDate = (date: NepaliDateType) => {
		const year = date.getYear();
		const month = date.getMonth();
		const day = date.getDate();

		const newDate = new NepaliDate();
		newDate.setYear(year);
		newDate.setMonth(month);
		newDate.setDate(day);

		if (month === 11) {
			newDate.setYear(year + 1);
			newDate.setMonth(0);
		} else {
			newDate.setMonth(month + 1);
		}

		return newDate;
	};

	const previousMonthDate = useMemo(
		() => getPreviousMonthDate(currentNepaliDate),
		[currentNepaliDate],
	);

	const nextMonthDate = useMemo(
		() => getNextMonthDate(currentNepaliDate),
		[currentNepaliDate],
	);

	return (
		<scroll-view
			className="flex flex-col gap-4 h-[90vh]"
			scroll-orientation="vertical"
		>
			<MonthCalendar
				date={currentNepaliDate}
				dayNames={dayNames}
				onPreviousMonth={() => {
					setCurrentNepaliDate(previousMonthDate);
				}}
				onNextMonth={() => {
					setCurrentNepaliDate(nextMonthDate);
				}}
				onToday={() => {
					setCurrentNepaliDate(new NepaliDate());
				}}
				onDateChange={(date) => {
					setCurrentNepaliDate(new NepaliDate(date));
				}}
			/>
			<view className="flex flex-row justify-between items-center my-2">
				<text className="text-md font-bold text-gray-800 flex flex-col my-2">
					Today
				</text>
				<text
					bindtap={() => nav("/converter")}
					className="text-sm text-indigo-500"
				>
					Convert Date &gt;&gt;
				</text>
			</view>
			<TodayWidget />
			<view className="flex flex-col my-2">
				<view className="flex flex-row justify-between">
					<view className="flex flex-row gap-2">
						<text
							className={cn(
								"text-md font-bold text-gray-800",
								showAllEvents && "text-indigo-500",
							)}
							bindtap={() => setShowAllEvents(true)}
						>
							All Events
						</text>
						<view className="w-px bg-gray-300 mx-1" />
						<text
							className={cn(
								"text-md font-bold text-gray-800",
								!showAllEvents && "text-indigo-500",
							)}
							bindtap={() => setShowAllEvents(false)}
						>
							Holidays
						</text>
					</view>
				</view>
			</view>
			<UpcomingEvents
				currentNepaliDate={currentNepaliDate}
				calendarData={currentMonthData}
				showAllEvents={showAllEvents}
			/>
		</scroll-view>
	);
}
