import { type Dispatch, useMemo, useState } from "@lynx-js/react";
import Dropdown from "./Dropdown.jsx";

interface DatePickerProps {
	date: Date;
	setDate: Dispatch<React.SetStateAction<Date>>;
}

const MIN_DATE = new Date("1943-04-14");
const MAX_DATE = new Date("2034-04-13");

function GregorianDatePicker({ date, setDate }: DatePickerProps) {
	const [openDropdown, setOpenDropdown] = useState<
		"year" | "month" | "day" | null
	>(null);

	const dateData = useMemo(() => {
		return {
			date: date.getDate(),
			month: date.getMonth() + 1,
			year: date.getFullYear(),
		};
	}, [date]);

	const monthOptions = [
		{ label: "January", value: "1" },
		{ label: "February", value: "2" },
		{ label: "March", value: "3" },
		{ label: "April", value: "4" },
		{ label: "May", value: "5" },
		{ label: "June", value: "6" },
		{ label: "July", value: "7" },
		{ label: "August", value: "8" },
		{ label: "September", value: "9" },
		{ label: "October", value: "10" },
		{ label: "November", value: "11" },
		{ label: "December", value: "12" },
	];

	const yearOptions = useMemo(() => {
		const minYear = MIN_DATE.getFullYear() + 1;
		const maxYear = MAX_DATE.getFullYear() - 1;
		const years = [];
		for (let year = minYear; year <= maxYear; year++) {
			years.push({ label: year.toString(), value: year.toString() });
		}
		return years;
	}, []);

	const getDaysInMonth = (year: number, month: number) => {
		return new Date(year, month, 0).getDate();
	};

	const getAvailableMonths = (year: number) => {
		if (year === MIN_DATE.getFullYear()) {
			return monthOptions.slice(MIN_DATE.getMonth());
		}
		if (year === MAX_DATE.getFullYear()) {
			return monthOptions.slice(0, MAX_DATE.getMonth() + 1);
		}
		return monthOptions;
	};

	const getAvailableDays = (year: number, month: number) => {
		const daysInMonth = getDaysInMonth(year, month);
		const days = Array.from({ length: daysInMonth }, (_, i) => ({
			label: (i + 1).toString(),
			value: (i + 1).toString(),
		}));

		if (year === MIN_DATE.getFullYear() && month === MIN_DATE.getMonth() + 1) {
			return days.slice(MIN_DATE.getDate() - 1);
		}

		if (year === MAX_DATE.getFullYear() && month === MAX_DATE.getMonth() + 1) {
			return days.slice(0, MAX_DATE.getDate());
		}

		return days;
	};

	const availableMonths = useMemo(
		() => getAvailableMonths(dateData.year),
		[dateData.year],
	);

	const dayOptions = useMemo(
		() => getAvailableDays(dateData.year, dateData.month),
		[dateData.year, dateData.month],
	);

	const handleDateChange = (type: "year" | "month" | "day", value: string) => {
		console.log(type, value);
		setDate((prev) => {
			console.log(prev);
			const newDate = new Date(prev);
			if (type === "year") {
				newDate.setFullYear(+value);
			}
			if (type === "month") {
				newDate.setMonth(+value - 1);
			}
			if (type === "day") {
				newDate.setDate(+value);
			}

			// Ensure the new date is within bounds
			if (newDate < MIN_DATE) return MIN_DATE;
			if (newDate > MAX_DATE) return MAX_DATE;
			console.log(newDate);
			return newDate;
		});
	};

	return (
		<view className="items-center w-full flex flex-row gap-1">
			<view className="w-[27%] h-full">
				<Dropdown
					options={yearOptions}
					value={dateData.year.toString()}
					onChange={(value: string) => handleDateChange("year", value)}
					placeholder="Year"
					isOpen={openDropdown === "year"}
					onOpen={() =>
						setOpenDropdown(openDropdown === "year" ? null : "year")
					}
				/>
			</view>
			<view className="h-full flex-1">
				<Dropdown
					options={availableMonths}
					value={dateData.month.toString()}
					onChange={(value: string) => handleDateChange("month", value)}
					placeholder="Month"
					isOpen={openDropdown === "month"}
					onOpen={() =>
						setOpenDropdown(openDropdown === "month" ? null : "month")
					}
				/>
			</view>
			<view className="h-full w-[27%]">
				<Dropdown
					options={dayOptions}
					value={dateData.date.toString()}
					onChange={(value: string) => handleDateChange("day", value)}
					placeholder="Day"
					isOpen={openDropdown === "day"}
					onOpen={() => setOpenDropdown(openDropdown === "day" ? null : "day")}
				/>
			</view>
		</view>
	);
}

export default GregorianDatePicker;
