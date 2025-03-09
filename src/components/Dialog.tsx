import { useEffect, useState } from "@lynx-js/react";
import type { ReactElement } from "react";

interface DialogProps {
	show?: boolean;
	children: ReactElement;
}

export default function Dialog(props: DialogProps) {
	const { show = true, children } = props;
	const [visible, setVisble] = useState<boolean>(false);
	const [displayContainer, setDisplayContainer] = useState<boolean>(false);

	const maskStyle = visible ? { opacity: 0.6 } : { opacity: 0.0 };

	const contentStyle = visible
		? {
				opacity: 1,
				transform: "translateY(0%)",
				transition: "opacity 0.3s, transform 0.3s",
			}
		: {
				opacity: 0,
				transform: "translateY(100%)",
				transition: "opacity 0.3s, transform 0.3s",
			};

	useEffect(() => {
		if (show) {
			setDisplayContainer(true);
			setTimeout(() => {
				setVisble(true);
			}, 50);
		} else if (visible) {
			setVisble(false);
			setTimeout(() => {
				setDisplayContainer(false);
			}, 300);
		}
	}, [show]);

	return (
		<view
			className="flex w-full h-full flex-col items-center justify-center z-[1000] fixed"
			style={{
				visibility: displayContainer ? "visible" : "hidden",
			}}
		>
			<view
				className="bg-[#333333] w-full h-full absolute transition-opacity duration-200 ease-in"
				native-interaction-enabled
				style={maskStyle}
			/>
			<view
				className="absolute flex transition-opacity duration-200 ease-in"
				style={contentStyle}
			>
				{children}
			</view>
		</view>
	);
}
