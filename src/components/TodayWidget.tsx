import { useCalendarData } from "../query/calendar.js";
import { NepaliDate, type NepaliDateType } from "../types/nepalidate.js";
import { cn } from "../utils/cn.js";

export function TodayWidget() {
	const today = new NepaliDate();
	const { data: calendarData } = useCalendarData(today);

	const todayData = calendarData?.find(
		(day) => day.calendarInfo.dates.bs.full.en === today.format("YYYY-MM-DD"),
	);
	const isHoliday = todayData?.eventDetails.some((event) => event.isHoliday);
	if (!todayData) return null;

	return (
		<view
			className={cn(
				"w-full max-w-[800px] rounded-lg p-4 flex flex-col",
				isHoliday && "bg-red-700",
				!isHoliday && "bg-indigo-800",
			)}
		>
			<view className="flex flex-col">
				<view className="flex">
					{/* Left Column - Date */}
					<view className="flex">
						<view className="flex flex-1 flex-col items-center">
							<text className="text-sm text-gray-100 text-center">
								{todayData.calendarInfo.dates.bs.month.np},{" "}
								{todayData.calendarInfo.dates.bs.year.np}
							</text>
							<text className="text-4xl font-bold text-gray-100 text-center">
								{todayData.calendarInfo.dates.bs.day.np}
							</text>
							<text className="text-gray-100 text-center">
								{todayData.calendarInfo.days.dayOfWeek.np}
							</text>
							<text className="text-sm text-gray-100 mt-1 text-center">
								{todayData.calendarInfo.dates.ad.day.en}{" "}
								{todayData.calendarInfo.dates.ad.month.en},{" "}
								{todayData.calendarInfo.dates.ad.year.en}
							</text>
						</view>
					</view>

					{/* Vertical Divider */}
					<view className="w-px bg-gray-300 mx-4" />

					{/* Right Column - Events */}
					<view className="flex-1">
						{todayData.eventDetails.length > 0 ? (
							<view className="space-y-1">
								{todayData.eventDetails.map((event, index) => (
									<text
										key={`event-${event.title.np}`}
										className={cn(
											"block text-gray-100",
											event.isHoliday && "text-red-50 font-medium",
										)}
									>
										{event.title.np}
									</text>
								))}
							</view>
						) : (
							<text className="text-sm text-gray-100">No events today</text>
						)}
					</view>
				</view>
			</view>
		</view>
	);
}
