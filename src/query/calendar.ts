import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getCalendarCacheKey, storage } from "../lib/storage.js";
import type { CalendarData, NewCalendarData } from "../types/calendar.types.js";

type NepaliDate = {
	getMonth(): number;
	getYear(): number;
	getDate(): number;
	format(format: string): string;
};

export const padNumber = (num: number, length: number) =>
	Number.parseInt(num.toString().padStart(length, "0"));

const getPreviousMonth = (date: NepaliDate) => {
	const month = date.getMonth() + 1;
	const year = date.getYear();
	return month === 1
		? { year: year - 1, month: padNumber(12, 2) }
		: { year, month: padNumber(month - 1, 2) };
};

const getNextMonth = (date: NepaliDate) => {
	const month = date.getMonth() + 1;
	const year = date.getYear();
	return month === 12
		? { year: year + 1, month: padNumber(1, 2) }
		: { year, month: padNumber(month + 1, 2) };
};

export const useCalendarData = (currentNepaliDate: NepaliDate) => {
	const queryClient = useQueryClient();

	/**
	 * Naming is hard :D
	 * the previous year may be the previous year or the same year
	 * the next year may be the next year or the same year
	 */

	const { year: prevYear, month: prevMonth } =
		getPreviousMonth(currentNepaliDate);

	const { year: nextYear, month: nextMonth } = getNextMonth(currentNepaliDate);

	const fetchPreviousMonth = async () => {
		return fetchCalendarData(prevYear, prevMonth);
	};

	const fetchNextMonth = async () => {
		return fetchCalendarData(nextYear, nextMonth);
	};

	const fetchCurrentMonth = async () => {
		return fetchCalendarData(
			currentNepaliDate.getYear(),
			padNumber(currentNepaliDate.getMonth() + 1, 2),
		);
	};

	queryClient.prefetchQuery({
		queryKey: ["calendar", prevYear, prevMonth],
		queryFn: fetchPreviousMonth,
	});

	queryClient.prefetchQuery({
		queryKey: ["calendar", nextYear, nextMonth],
		queryFn: fetchNextMonth,
	});

	return useQuery<NewCalendarData[]>({
		queryKey: [
			"calendar",
			currentNepaliDate.getYear(),
			padNumber(currentNepaliDate.getMonth() + 1, 2),
		],
		queryFn: fetchCurrentMonth,
		networkMode: "offlineFirst",
	});
};

export const useYearlyData = (currentNepaliDate: NepaliDate) => {
	return useQuery<CalendarData>({
		queryKey: [
			"calendar",
			currentNepaliDate.getYear(),
			currentNepaliDate.getMonth(),
		],
		queryFn: () =>
			fetchCalendarData(
				currentNepaliDate.getYear(),
				Number.parseInt(
					currentNepaliDate.getMonth().toString().padStart(2, "0"),
				),
			),
		networkMode: "offlineFirst",
	});
};

export const useTodayData = (currentNepaliDate: NepaliDate) => {
	return useQuery<NewCalendarData>({
		queryKey: ["today-data"],
		queryFn: () =>
			fetchCalendarData(
				currentNepaliDate.getYear(),
				padNumber(currentNepaliDate.getMonth() + 1, 2),
			).then((data) => data[currentNepaliDate.getDate() - 1]),
		networkMode: "offlineFirst",
	});
};

export const useNextMonthData = (currentNepaliDate: NepaliDate) => {
	const { year, month } = getNextMonth(currentNepaliDate);
	return useQuery<NewCalendarData[]>({
		queryKey: ["calendar", year, month],
		queryFn: () => fetchCalendarData(year, month),
		networkMode: "offlineFirst",
	});
};

export async function fetchCalendarData(year: number, month: number) {
	const cacheKey = getCalendarCacheKey(year, month);

	try {
		// Try to get cached data first
		const cachedData = await storage.getItem<NewCalendarData[]>(cacheKey);

		// Attempt to fetch fresh data
		try {
			const res = await fetch(
				`https://data.miti.bikram.io/data/${year}/${month.toString().padStart(2, "0")}.json`,
			);
			const freshData = await res.json();

			// Update cache with fresh data
			await storage.setItem(cacheKey, freshData);

			return freshData;
		} catch (error) {
			console.log("Network error, using cached data:", error);
			// If we have cached data, return it when fetch fails
			if (cachedData) {
				return cachedData;
			}
			throw error; // Re-throw if we have no cached data
		}
	} catch (error) {
		console.error("Error fetching calendar data:", error);
		throw error;
	}
}
