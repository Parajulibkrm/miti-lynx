import type { NewCalendarData } from "../types/calendar.types.js";
import { cn } from "../utils/cn.js";
import { Panchang } from "./Panchang.js";

export function DayDetail({ dayData }: { dayData: NewCalendarData }) {
	const isHoliday =
		dayData.eventDetails.filter((event) => event.isHoliday).length !== 0 ||
		dayData.calendarInfo.days.codes.en === "7";

	return (
		<scroll-view scroll-orientation="vertical" className="h-[50vh]">
			<view className="flex items-center space-x-4 rounded-lg">
				<view
					className={cn(
						"rounded-lg bg-gray-200 text-center w-16 h-16 flex flex-col gap-1 items-center justify-center",
						isHoliday && "text-red-500 bg-red-100",
					)}
				>
					<view className="flex flex-col gap-1 items-center justify-center">
						<text className="text-2xl font-semibold">
							{dayData.calendarInfo.dates.bs.day.np}
						</text>
						<text className="text-sm font-semibold">
							{dayData.calendarInfo.days.dayOfWeek.np}
						</text>
					</view>
				</view>
				<view className="flex-1 px-4">
					<view className="flex flex-row">
						<text className="font-bold text-left flex-1 text-2xl">
							{dayData.calendarInfo.dates.bs.month.np},{" "}
							{dayData.calendarInfo.dates.bs.year.np}
						</text>
					</view>
					<text className="text-sm text-gray-600">
						{dayData.tithiDetails?.title.np},{" "}
						{dayData.panchangaDetails?.pakshya.np}
					</text>
					<text className="text-xs text-gray-500">
						ने.सं. {dayData.calendarInfo.nepaliEra.nepalSambat.year.np},{" "}
						{dayData.calendarInfo.nepaliEra.nepalSambat.month.np}
					</text>
				</view>
				<view className="flex flex-col my-4 justify-between">
					<view className="flex items-center gap-2">
						<view className="size-8">
							<text>☀️</text>
						</view>
						<text className="text-md text-gray-600">
							{dayData.panchangaDetails?.times.sunrise}
						</text>
					</view>
					<view className="flex items-center gap-2">
						<view className="size-8">
							<text>🌙</text>
						</view>
						<text className="text-md text-gray-600">
							{dayData.panchangaDetails?.times.sunset}
						</text>
					</view>
				</view>
			</view>

			{dayData.eventDetails.length > 0 && (
				<view className="mt-6">
					<text className="text-lg font-bold text-gray-800 mb-2">Events</text>
					<view className="space-y-2">
						{dayData.eventDetails.map((event) => (
							<view
								key={event.id || `${event.title.en}`}
								className={cn(
									"p-4 rounded",
									event.isHoliday ? "bg-red-50" : "bg-gray-50",
								)}
							>
								<text
									className={cn(
										"font-medium",
										event.isHoliday ? "text-red-600" : "text-gray-700",
									)}
								>
									{event.title.np}
								</text>
							</view>
						))}
					</view>
				</view>
			)}

			<view className="mt-6">
				<Panchang data={dayData} />
			</view>
		</scroll-view>
	);
}
