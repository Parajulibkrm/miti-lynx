type ClassValue =
	| string
	| boolean
	| null
	| undefined
	| { [key: string]: boolean };

export function cn(...inputs: ClassValue[]): string {
	return inputs
		.filter(Boolean)
		.map((input) => {
			if (typeof input === "string") return input;
			if (typeof input === "object" && input !== null) {
				return Object.entries(input)
					.filter(([_, value]) => value)
					.map(([key]) => key)
					.join(" ");
			}
			return "";
		})
		.join(" ");
}
