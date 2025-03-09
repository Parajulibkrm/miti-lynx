import { useEffect, useState } from "@lynx-js/react";
import { NepaliDate, type NepaliDateType } from "../types/nepalidate.js";
import GregorianDatePicker from "./GregorianDatePicker.jsx";
import NepaliDatePicker from "./NepaliDatePicker.jsx";

const monthNames = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];
export function DateConverter() {
	const [nepaliDate, setNepaliDate] = useState(new NepaliDate());
	const [englishDate, setEnglishDate] = useState(new Date());

	// Function to format date in "DD Month, YYYY" format
	const formatEnglishDate = (date: Date) => {
		return `${date.getDate()} ${monthNames[date.getMonth()]}, ${date.getFullYear()}`;
	};

	// Update English date when Nepali date changes
	const convertedEnglishDate = new NepaliDate(nepaliDate).getDateObject();

	// Update Nepali date when English date changes
	const convertedNepaliDate = new NepaliDate(englishDate).format(
		"DD MMMM, YYYY",
	);

	return (
		<scroll-view
			className="flex flex-col gap-4 h-[100vh] p-4"
			scroll-orientation="vertical"
		>
			<view className="grid grid-cols-1 md:grid-cols-2 gap-4">
				{/* Nepali Date Card */}
				<view className="p-6 bg-indigo-800 rounded-lg shadow-lg">
					<text className="text-2xl font-bold text-gray-100 mb-6 text-center block">
						Nepali Date
					</text>
					<NepaliDatePicker date={nepaliDate} setDate={setNepaliDate} />

					<text className="text-2xl font-bold text-gray-100 mt-4 text-center block">
						English Date
					</text>
					<text className="text-lg text-gray-100 mt-4 text-center block">
						{formatEnglishDate(convertedEnglishDate)}
					</text>
				</view>

				{/* English Date Card */}
				<view className="p-6 bg-indigo-800 rounded-lg shadow-lg">
					<text className="text-2xl font-bold text-gray-100 mb-6 text-center block">
						English Date
					</text>
					<GregorianDatePicker date={englishDate} setDate={setEnglishDate} />
					<text className="text-2xl font-bold text-gray-100 mt-4 text-center block">
						Nepali Date
					</text>
					<text className="text-lg text-gray-100 mt-4 text-center block">
						{convertedNepaliDate}
					</text>
				</view>
			</view>
		</scroll-view>
	);
}
