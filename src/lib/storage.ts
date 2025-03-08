const CACHE_PREFIX = "calendar_cache_";
const CACHE_TIMESTAMP_PREFIX = "calendar_timestamp_";

export const storage = {
	async setItem<T>(key: string, value: T) {
		try {
			const serializedValue = JSON.stringify(value);
			NativeModules.NativeLocalStorageModule.setStorageItem(
				key,
				serializedValue,
			);
			// Store timestamp
			NativeModules.NativeLocalStorageModule.setStorageItem(
				`${CACHE_TIMESTAMP_PREFIX}${key}`,
				Date.now().toString(),
			);
		} catch (error) {
			console.error("Error setting storage item:", error);
		}
	},

	async getItem<T>(key: string): Promise<T | null> {
		try {
			const value = NativeModules.NativeLocalStorageModule.getStorageItem(key);
			return value ? (JSON.parse(value) as T) : null;
		} catch (error) {
			console.error("Error getting storage item:", error);
			return null;
		}
	},

	async getCacheTimestamp(key: string): Promise<number | null> {
		try {
			const timestamp = NativeModules.NativeLocalStorageModule.getStorageItem(
				`${CACHE_TIMESTAMP_PREFIX}${key}
      `,
			);
			return timestamp ? Number.parseInt(timestamp, 10) : null;
		} catch (error) {
			console.error("Error getting cache timestamp:", error);
			return null;
		}
	},

	clearStorage() {
		try {
			NativeModules.NativeLocalStorageModule.clearStorage();
		} catch (error) {
			console.error("Error clearing storage:", error);
		}
	},
};

export const getCalendarCacheKey = (year: number, month: number) =>
	`${CACHE_PREFIX}${year}_${month.toString().padStart(2, "0")}`;
