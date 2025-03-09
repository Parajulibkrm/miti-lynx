export interface Storage {
	getItem: (key: string) => string | null;
	setItem: (key: string, value: string) => void;
	removeItem: (key: string) => void;
}

export const storage: Storage = {
	getItem(key: string): string | null {
		if (!key) return null;
		try {
			return NativeModules.NativeLocalStorageModule.getStorageItem(key);
		} catch (error) {
			return null;
		}
	},

	setItem(key: string, value: string): void {
		if (!key || value === null || value === undefined) return;
		try {
			NativeModules.NativeLocalStorageModule.setStorageItem(key, value);
		} catch (error) {}
	},

	removeItem(key: string): void {
		if (!key) return;
		try {
			NativeModules.NativeLocalStorageModule.setStorageItem(key, "");
		} catch (error) {}
	},
};
