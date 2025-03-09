import { differenceInDays } from "date-fns";
import type { NewCalendarData } from "../types/calendar.types.js";
import { NepaliDate, type NepaliDateType } from "../types/nepalidate.js";
import { cn } from "../utils/cn.js";
type UpcomingEventsProps = {
	currentNepaliDate: NepaliDateType;
	calendarData: NewCalendarData[] | undefined;
	showAllEvents: boolean;
};

const dateDiff = (date1: Date, date2: Date) => {
	const diff = differenceInDays(date1, date2);
	return diff;
};

export function UpcomingEvents({
	currentNepaliDate,
	calendarData,
	showAllEvents,
}: UpcomingEventsProps) {
	if (!calendarData) return null;
	console.log("currentNepaliDate", currentNepaliDate);
	const isCurrentMonth =
		currentNepaliDate.getMonth() === new NepaliDate().getMonth() &&
		currentNepaliDate.getYear() === new NepaliDate().getYear();
	console.log("isCurrentMonth", isCurrentMonth);
	const upcomingEvents = calendarData
		.filter((day) => day.eventDetails.length > 0) // Filter days with events
		.map((day) => ({
			date: day.calendarInfo.dates.bs,
			events: day.eventDetails,
			daysLeft: day.calendarInfo.dates.ad.full.en
				? dateDiff(new Date(day.calendarInfo.dates.ad.full.en), new Date())
				: 0,
		}))
		.filter((day) =>
			showAllEvents
				? day.events.length > 0
				: day.events.find((event) => event.isHoliday),
		);
	console.log("upcomingEvents", upcomingEvents);
	// .filter((day) => day.daysLeft > 0); // Ensure only future events are shown

	if (upcomingEvents.length === 0) {
		return (
			<view className="w-full rounded-lg bg-white p-4">
				<text className="text-gray-500">
					{showAllEvents ? "No events this month" : "No holidays this month"}
				</text>
			</view>
		);
	}

	return (
		<view className="w-full rounded-lg bg-white p-2 mb-6 space-y-4 flex flex-col">
			{upcomingEvents.map((day) => (
				<view
					key={day.date.full.en || `day-${day.date.day.en}`}
					className="flex items-start space-x-4 border-b border-gray-100 py-2 last:border-b-0"
				>
					{/* Date Column */}
					<view
						className={cn(
							"flex flex-col items-center justify-center rounded-lg p-3 min-w-[80px]",
							!day.events.find((event) => event.isHoliday) && "bg-indigo-50",
							day.events.find((event) => event.isHoliday) && "bg-red-50",
						)}
					>
						<text className="text-2xl font-bold text-indigo-700">
							{day.date.day.np}
						</text>
						<text className="text-sm text-indigo-600">{day.date.month.np}</text>
					</view>

					{/* Events Column */}
					<view className="flex-1 pl-2">
						{day.events
							.sort((a, b) => (a.isHoliday ? -1 : 1) - (b.isHoliday ? -1 : 1))
							.map((event, index) => (
								<view
									key={`${day.date.full.en}-${event.title.np}`}
									className="flex items-center justify-between"
								>
									<text
										className={cn(
											"text-gray-700",
											event.isHoliday && "text-red-700 font-medium",
										)}
									>
										{event.title.np}
									</text>
									{index === 0 && (
										<text className="text-sm text-gray-500">
											{day.daysLeft > 1 || day.daysLeft < -1
												? `${Math.abs(day.daysLeft)} `
												: ""}
											{day.daysLeft === 0
												? "आज"
												: day.daysLeft === 1
													? "भोलि"
													: day.daysLeft === -1
														? "हिजो"
														: day.daysLeft > 0
															? "दिन पछि"
															: "दिन अघि"}
										</text>
									)}
								</view>
							))}
					</view>
				</view>
			))}
		</view>
	);
}
