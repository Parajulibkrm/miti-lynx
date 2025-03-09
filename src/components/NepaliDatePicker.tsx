import { type Dispatch, useMemo, useState } from "@lynx-js/react";
import nepaliDateData from "../lib/date-data.js";
import { NepaliDate, type NepaliDateType } from "../types/nepalidate.js";
import Dropdown from "./Dropdown.jsx";

interface DatePickerProps {
	date: NepaliDateType;
	setDate: Dispatch<React.SetStateAction<NepaliDateType>>;
}

function NepaliDatePicker({ date, setDate }: DatePickerProps) {
	const [openDropdown, setOpenDropdown] = useState<
		"year" | "month" | "day" | null
	>(null);

	const dateBs = useMemo(() => {
		const nepaliDate = new NepaliDate(date);
		return {
			date: nepaliDate.getDate(),
			year: nepaliDate.getYear(),
			month: nepaliDate.getMonth() + 1,
		};
	}, [date]);

	const monthOptions = [
		{ label: "बैशाख", value: "1" },
		{ label: "जेठ", value: "2" },
		{ label: "असार", value: "3" },
		{ label: "श्रावण", value: "4" },
		{ label: "भदौ", value: "5" },
		{ label: "आश्विन", value: "6" },
		{ label: "कार्तिक", value: "7" },
		{ label: "मंसिर", value: "8" },
		{ label: "पुष", value: "9" },
		{ label: "माघ", value: "10" },
		{ label: "फाल्गुन", value: "11" },
		{ label: "चैत्र", value: "12" },
	];

	const yearOptions = useMemo(() => {
		return Object.keys(nepaliDateData).map((year) => ({
			label: year,
			value: year,
		}));
	}, []);

	const getDayOptions = (year: number, month: number) => {
		if (!year || !month) return [];
		const days = nepaliDateData[year][month];
		if (!days) return [];

		const dayOptions = [];
		for (let i = 1; i <= days; i++) {
			dayOptions.push({ label: i.toString(), value: i.toString() });
		}
		console.log(dayOptions);
		return dayOptions;
	};

	const dayOptions = useMemo(() => {
		return getDayOptions(dateBs.year, dateBs.month);
	}, [dateBs.year, dateBs.month]);

	const handleDateChange = (type: "year" | "month" | "day", value: string) => {
		setDate((prev) => {
			const oldDate = new NepaliDate(prev);
			if (type === "year") {
				oldDate.setYear(+value);
			}
			if (type === "month") {
				oldDate.setMonth(+value - 1);
			}
			if (type === "day") {
				oldDate.setDate(+value);
			}
			return oldDate.getDateObject();
		});
	};

	return (
		<view className="items-center w-full flex flex-row gap-1">
			<view className="h-full w-1/3">
				<Dropdown
					options={yearOptions}
					value={dateBs.year.toString()}
					onChange={(value: string) => handleDateChange("year", value)}
					placeholder="वर्ष"
					isOpen={openDropdown === "year"}
					onOpen={() =>
						setOpenDropdown(openDropdown === "year" ? null : "year")
					}
				/>
			</view>
			<view className="h-full flex-1">
				<Dropdown
					options={monthOptions}
					value={dateBs.month.toString()}
					onChange={(value: string) => handleDateChange("month", value)}
					placeholder="महिना"
					isOpen={openDropdown === "month"}
					onOpen={() =>
						setOpenDropdown(openDropdown === "month" ? null : "month")
					}
				/>
			</view>
			<view className="h-full w-1/3">
				<Dropdown
					options={dayOptions}
					value={dateBs.date.toString()}
					onChange={(value: string) => handleDateChange("day", value)}
					placeholder="दिन"
					isOpen={openDropdown === "day"}
					onOpen={() => setOpenDropdown(openDropdown === "day" ? null : "day")}
				/>
			</view>
		</view>
	);
}

export default NepaliDatePicker;
