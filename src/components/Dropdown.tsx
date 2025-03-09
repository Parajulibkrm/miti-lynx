import { useEffect, useState } from "@lynx-js/react";
import type { ReactElement } from "react";

interface DropdownOption {
	label: string;
	value: string;
}

interface DropdownProps {
	options: DropdownOption[];
	value?: string;
	onChange?: (value: string) => void;
	placeholder?: string;
	isOpen: boolean;
	onOpen: () => void;
}

export default function Dropdown(props: DropdownProps) {
	const {
		options,
		value,
		onChange,
		placeholder = "Select an option",
		isOpen,
		onOpen,
	} = props;
	const [displayOptions, setDisplayOptions] = useState<boolean>(false);
	const [selectedValue, setSelectedValue] = useState<string | undefined>(value);

	const selectedOption = options.find((opt) => opt.value === selectedValue);

	const optionsStyle = isOpen
		? {
				opacity: 1,
				transform: "translateY(0%)",
				transition: "opacity 0.2s, transform 0.2s",
			}
		: {
				opacity: 0,
				transform: "translateY(-10%)",
				transition: "opacity 0.2s, transform 0.2s",
			};

	useEffect(() => {
		if (isOpen) {
			setDisplayOptions(true);
		} else {
			setTimeout(() => {
				setDisplayOptions(false);
			}, 200);
		}
	}, [isOpen]);

	const handleSelect = (optionValue: string) => {
		setSelectedValue(optionValue);
		onChange?.(optionValue);
		onOpen();
	};

	return (
		<view className="relative w-full">
			<view
				className="flex items-center justify-between px-4 py-2 border border-gray-300 rounded-md cursor-pointer bg-white"
				native-interaction-enabled
				bindtap={() => onOpen()}
			>
				<text className="text-gray-700">
					{selectedOption ? selectedOption.label : placeholder}
				</text>
				<text
					className={`transform transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
				>
					▼
				</text>
			</view>

			<view
				className="absolute w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-50"
				style={{
					visibility: displayOptions ? "visible" : "hidden",
					...optionsStyle,
				}}
			>
				<scroll-view scroll-orientation="vertical" className="max-h-[50vh]">
					{options.map((option) => (
						<view
							key={option.value}
							className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
								option.value === selectedValue ? "bg-gray-50" : ""
							}`}
							native-interaction-enabled
							bindtap={() => handleSelect(option.value)}
						>
							<text className="text-gray-700">{option.label}</text>
						</view>
					))}
				</scroll-view>
			</view>
		</view>
	);
}
