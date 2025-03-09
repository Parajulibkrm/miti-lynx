import { useState } from "@lynx-js/react";
import type { NewCalendarData } from "../types/calendar.types.js";
import { NepaliDate } from "../types/nepalidate.js";
import { cn } from "../utils/cn.js";
import { DayDetail } from "./DayDetail.js";
import Dialog from "./Dialog.js";

type CalendarGridProps = {
	calendarData: NewCalendarData[] | undefined;
	currentNepaliDate: {
		format: (format: string) => string;
	};
	dayNames: string[];
	isLoading?: boolean;
};

export function CalendarGrid({
	calendarData,
	currentNepaliDate,
	dayNames,
	isLoading,
}: CalendarGridProps) {
	const [selectedDay, setSelectedDay] = useState<NewCalendarData | null>(null);
	const [showDialog, setShowDialog] = useState(false);

	const handleDaySelect = (day: NewCalendarData) => {
		setSelectedDay(day);
		setShowDialog(true);
	};

	const handleCloseDialog = () => {
		setShowDialog(false);
	};

	if (isLoading) {
		return (
			<view className="w-full">
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
					{[...Array(35)].map((_, index) => {
						const skeletonKey = `skeleton-${currentNepaliDate.format("YYYY-MM")}-${index}`;
						return (
							<view key={skeletonKey} className="aspect-square p-1 rounded-lg">
								<view className="h-full flex flex-col">
									<view className="grow flex items-center justify-center">
										<view className="w-11 h-11 bg-gray-200 rounded animate-pulse" />
									</view>
								</view>
							</view>
						);
					})}
				</view>
			</view>
		);
	}

	return (
		<view className="w-full">
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

				{calendarData?.map((day) => {
					const isToday =
						day.calendarInfo.dates.bs.full.en ===
						new NepaliDate().format("YYYY-MM-DD");
					const isHoliday =
						day.eventDetails.some((event) => event.isHoliday) ||
						day.calendarInfo.days.codes.en === "7";

					return (
						<view
							key={`${day.calendarInfo.dates.bs.full.en}`}
							className={cn(
								"aspect-square p-1 rounded-lg cursor-pointer hover:bg-gray-100",
								isToday && "bg-indigo-50 border-indigo-200",
							)}
							bindtap={() => handleDaySelect(day)}
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

			<Dialog show={showDialog}>
				<view className="bg-white rounded-lg p-6 w-[90vw] max-w-lg">
					<view className="flex justify-between items-center mb-4">
						<text className="text-xl font-semibold">पुरा बिवरण</text>
						<view
							className="cursor-pointer p-2 hover:bg-gray-100 rounded-full"
							bindtap={handleCloseDialog}
						>
							<text className="text-gray-500">✕</text>
						</view>
					</view>

					{selectedDay && <DayDetail dayData={selectedDay} />}
				</view>
			</Dialog>
		</view>
	);
}
