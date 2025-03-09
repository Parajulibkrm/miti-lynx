import type { NewCalendarData } from "../types/calendar.types.js";
import { cn } from "../utils/cn.js";

const PanchangTableRow = ({
	label,
	value,
}: {
	label: string;
	value: string;
}) => {
	return (
		<view className="flex justify-between">
			<text className="font-semibold">{label}:</text>
			<text>{value}</text>
		</view>
	);
};

const PanchangSection = ({
	title,
	children,
	classes,
}: {
	title: string;
	children: React.ReactNode;
	classes?: string;
}) => {
	return (
		<view className="my-8">
			<text className="text-lg font-bold text-gray-800 mb-2">{title}</text>
			<view className={classes}>{children}</view>
		</view>
	);
};

const MuhuratItem = ({ name, time }: { name: string; time?: string }) => {
	return (
		<view className="flex justify-between p-4 text-black text-start">
			<text>{name}</text>
			{time && <text>{time}</text>}
		</view>
	);
};

export function Panchang({ data }: { data: NewCalendarData }) {
	return (
		<view className="">
			{/* Header */}
			<view className="flex items-center space-x-3 mb-6">
				<text className="text-2xl font-bold text-gray-800">पञ्चाङ्ग</text>
			</view>
			<view className="space-y-2">
				<PanchangTableRow
					label="तारिख"
					value={data.calendarInfo.dates.bs.full.np ?? "-"}
				/>

				<PanchangTableRow
					label="चन्द्र राशि"
					value={data.panchangaDetails?.chandraRashi.time.np ?? "-"}
				/>
				<PanchangTableRow
					label="सूर्य राशि"
					value={data.panchangaDetails?.suryaRashi.np ?? "-"}
				/>
				<PanchangTableRow
					label="नक्षत्र समाप्ति समय"
					value={data.panchangaDetails?.nakshatra.endTime.np ?? "-"}
				/>
				<PanchangTableRow
					label="करण १"
					value={data.panchangaDetails?.karans.first.np ?? "-"}
				/>
				<PanchangTableRow
					label="करण २"
					value={data.panchangaDetails?.karans.second.np ?? "-"}
				/>
				<PanchangTableRow
					label="ऋतु"
					value={data.hrituDetails?.title.np ?? "-"}
				/>
				<PanchangTableRow
					label="पक्ष"
					value={data.panchangaDetails?.pakshya.np ?? "-"}
				/>
				<PanchangTableRow
					label="योग"
					value={data.panchangaDetails?.yog.np ?? "-"}
				/>
				<PanchangTableRow
					label="तिथि"
					value={
						(data.tithiDetails?.title.np ?? "-") +
						(data.tithiDetails?.display.np ?? "-")
					}
				/>
			</view>

			{/* Shubh Muhurat Section */}
			<PanchangSection title="आजको शुभ साइत / मुहूर्त">
				<view
					className={cn(
						"divide-y divide-orange-200 bg-orange-100 rounded-lg",
						data.auspiciousMoments.sahits.length === 0 && "px-4 py-4",
					)}
				>
					{data.auspiciousMoments.sahits.length > 0 ? (
						data.auspiciousMoments.sahits.map((sahit, index) => (
							<MuhuratItem
								key={`${sahit.title.np}-${index}`}
								name={sahit.title.np ?? ""}
							/>
						))
					) : (
						<text>आज शुभ साइत / मुहूर्त छैन।</text>
					)}
				</view>
			</PanchangSection>

			{/* Kala Muhurat Section */}
			<PanchangSection title="आजको काल / मुहूर्तम्">
				<view
					className={cn(
						"divide-y divide-emerald-200 bg-emerald-100 rounded-lg",
						data.auspiciousMoments.muhurats.length === 0 && "px-4 py-4",
					)}
				>
					{data.auspiciousMoments.muhurats.length > 0 ? (
						data.auspiciousMoments.muhurats.map((muhurat, index) => (
							<MuhuratItem
								key={`${muhurat.periodName}-${index}`}
								name={muhurat.periodName ?? ""}
								time={muhurat.duration ?? ""}
							/>
						))
					) : (
						<text>आज काल / मुहूर्तम् छैन।</text>
					)}
				</view>
			</PanchangSection>
		</view>
	);
}
