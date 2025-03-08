import type { NewCalendarData } from "../types/calendar.types.js";
import { cn } from "../utils/cn.js";

type UpcomingEventsProps = {
	currentNepaliDate: {
		format: (format: string) => string;
		getDate: () => number;
	};
	calendarData: NewCalendarData[] | undefined;
};

export function UpcomingEvents({
	currentNepaliDate,
	calendarData,
}: UpcomingEventsProps) {
	if (!calendarData) return null;

	const currentDate = currentNepaliDate.getDate();
	const upcomingEvents = calendarData
		.slice(currentDate) // Get only future dates
		.filter((day) => day.eventDetails.length > 0) // Filter days with events
		.map((day) => ({
			date: day.calendarInfo.dates.bs,
			events: day.eventDetails,
			daysLeft: day.calendarInfo.dates.bs.day.en
				? Number(day.calendarInfo.dates.bs.day.en) - currentDate
				: 0,
		}))
		.filter((day) => day.daysLeft > 0); // Ensure only future events are shown

	if (upcomingEvents.length === 0) {
		return (
			<view className="w-full rounded-lg bg-white p-4">
				<text className="text-gray-500">No upcoming events this month</text>
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
					<view className="flex flex-col items-center justify-center rounded-lg bg-indigo-50 p-3 min-w-[80px]">
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
											{day.daysLeft} दिन बाँकी
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
