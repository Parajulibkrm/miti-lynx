import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const padNumber = (num: number, length: number) => {
	return Number.parseInt(num.toString().padStart(length, "0"));
};
