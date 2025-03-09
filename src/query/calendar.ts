import { useCallback, useEffect } from "@lynx-js/react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { NepaliDate, type NepaliDateType } from "../types/nepalidate.js";

import type { CalendarData, NewCalendarData } from "../types/calendar.types.js";

export const padNumber = (num: number, length: number) =>
	Number.parseInt(num.toString().padStart(length, "0"));

const getPreviousMonth = (date: NepaliDateType) => {
	const month = date.getMonth() + 1;
	const year = date.getYear();
	return month === 1
		? { year: year - 1, month: padNumber(12, 2) }
		: { year, month: padNumber(month - 1, 2) };
};

const getNextMonth = (date: NepaliDateType) => {
	const month = date.getMonth() + 1;
	const year = date.getYear();
	return month === 12
		? { year: year + 1, month: padNumber(1, 2) }
		: { year, month: padNumber(month + 1, 2) };
};

export const useCalendarData = (currentNepaliDate: NepaliDateType) => {
	const queryClient = useQueryClient();
	const isCurrentMonth =
		currentNepaliDate.getMonth() === new NepaliDate().getMonth() &&
		currentNepaliDate.getYear() === new NepaliDate().getYear();
	/**
	 * Naming is hard :D
	 * the previous year may be the previous year or the same year
	 * the next year may be the next year or the same year
	 */

	const { year: prevYear, month: prevMonth } =
		getPreviousMonth(currentNepaliDate);

	const { year: nextYear, month: nextMonth } = getNextMonth(currentNepaliDate);

	const fetchPreviousMonth = useCallback(async () => {
		return fetchCalendarData(prevYear, prevMonth);
	}, [prevYear, prevMonth]);

	const fetchNextMonth = useCallback(async () => {
		return fetchCalendarData(nextYear, nextMonth);
	}, [nextYear, nextMonth]);

	const fetchCurrentMonth = useCallback(async () => {
		return fetchCalendarData(
			currentNepaliDate.getYear(),
			padNumber(currentNepaliDate.getMonth() + 1, 2),
		);
	}, [currentNepaliDate]);

	// Only prefetch adjacent months once when viewing current month
	useEffect(() => {
		if (isCurrentMonth) {
			queryClient.prefetchQuery({
				queryKey: ["calendar", prevYear, prevMonth],
				queryFn: fetchPreviousMonth,
			});

			queryClient.prefetchQuery({
				queryKey: ["calendar", nextYear, nextMonth],
				queryFn: fetchNextMonth,
			});
		}
	}, [
		isCurrentMonth,
		prevYear,
		prevMonth,
		nextYear,
		nextMonth,
		queryClient,
		fetchPreviousMonth,
		fetchNextMonth,
	]);

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

export const useYearlyData = (currentNepaliDate: NepaliDateType) => {
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

export const useTodayData = (currentNepaliDate: NepaliDateType) => {
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

export const useNextMonthData = (currentNepaliDate: NepaliDateType) => {
	const { year, month } = getNextMonth(currentNepaliDate);
	return useQuery<NewCalendarData[]>({
		queryKey: ["calendar", year, month],
		queryFn: () => fetchCalendarData(year, month),
		networkMode: "offlineFirst",
	});
};

export async function fetchCalendarData(year: number, month: number) {
	try {
		try {
			const res = await fetch(
				`https://data.miti.bikram.io/data/${year}/${month.toString().padStart(2, "0")}.json`,
			);
			const freshData = await res.json();
			return freshData;
		} catch (error) {
			console.log("Network error, using cached data:", error);
			throw error;
		}
	} catch (error) {
		console.error("Error fetching calendar data:", error);
		throw error;
	}
}
