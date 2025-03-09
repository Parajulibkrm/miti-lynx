import { type Dispatch, useEffect, useMemo, useState } from "@lynx-js/react";
import NepaliDate from "nepali-datetime";
import { useCalendarData } from "../query/calendar.js";
import { CalendarGrid } from "./CalendarGrid.jsx";
import Dialog from "./Dialog.jsx";
import NepaliDatePicker from "./NepaliDatePicker.jsx";

interface MonthCalendarProps {
	date: NepaliDate;
	dayNames: string[];
	onPreviousMonth: () => void;
	onNextMonth: () => void;
	onToday: () => void;
	onDateChange: (date: NepaliDate) => void;
}

export function MonthCalendar({
	date,
	dayNames,
	onPreviousMonth,
	onNextMonth,
	onToday,
	onDateChange,
}: MonthCalendarProps) {
	const { data: monthData, isLoading, isError } = useCalendarData(date);
	const [showDatePicker, setShowDatePicker] = useState(false);

	return (
		<view
			className="bg-white rounded-lg shadow-lg p-4"
			id={`month-calendar-${date.format("YYYY-MM")}`}
		>
			{/* Calendar Header */}
			<view className="flex items-center justify-between mb-6">
				<view
					className="flex items-center gap-2 border border-gray-300 rounded-lg p-2"
					bindtap={onToday}
				>
					<text className="text-md font-bold text-gray-800">Today</text>
				</view>
				<view
					className="flex items-center cursor-pointer"
					bindtap={() => setShowDatePicker(true)}
				>
					<text className="text-2xl font-bold text-gray-800">
						{date.format("MMMM YYYY")}
					</text>
				</view>

				<view className="flex items-center gap-2">
					<view
						className="w-10 h-10  border bg-gray-50 border-gray-300 rounded-full p-2 text-sm cursor-pointer justify-center items-center"
						bindtap={onPreviousMonth}
					>
						<text className="text-xl font-semibold text-center cursor-pointer text-gray-600">
							&lt;
						</text>
					</view>
					<view
						className="w-10 h-10  border bg-gray-50 border-gray-300 rounded-full p-2 text-sm cursor-pointer justify-center items-center"
						bindtap={onNextMonth}
					>
						<text className="text-xl font-semibold text-center cursor-pointer text-gray-600">
							&gt;
						</text>
					</view>
				</view>
			</view>

			{/* Calendar Grid */}
			<view className="w-full">
				<CalendarGrid
					calendarData={monthData}
					currentNepaliDate={date}
					dayNames={dayNames}
					isLoading={isLoading}
				/>
			</view>

			<Dialog show={showDatePicker}>
				<DatePickerDialog
					showDatePicker={showDatePicker}
					setShowDatePicker={setShowDatePicker}
					onDateChange={onDateChange}
				/>
			</Dialog>
		</view>
	);
}

const DatePickerDialog = ({
	showDatePicker,
	setShowDatePicker,
	onDateChange,
}: {
	showDatePicker: boolean;
	setShowDatePicker: Dispatch<React.SetStateAction<boolean>>;
	onDateChange: (date: NepaliDate) => void;
}) => {
	const [date, setDate] = useState(new NepaliDate());

	return (
		<view className="bg-white rounded-lg p-6 w-[90vw] max-w-lg">
			<view className="flex justify-between items-center mb-4">
				<text className="text-xl font-semibold">Select Date</text>
				<view
					className="cursor-pointer p-2 hover:bg-gray-100 rounded-full"
					bindtap={() => setShowDatePicker(false)}
				>
					<text className="text-gray-500">✕</text>
				</view>
			</view>

			<NepaliDatePicker date={date} setDate={setDate} />
			<view className="flex justify-end mt-4">
				<view
					className="bg-indigo-500 text-sm text-white px-4 py-2 rounded-md"
					bindtap={() => {
						onDateChange(date);
						setShowDatePicker(false);
					}}
				>
					<text className="text-sm text-white">Select</text>
				</view>
			</view>
		</view>
	);
};
