import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { QueryClient } from "@tanstack/react-query";
import { persistQueryClient } from "@tanstack/react-query-persist-client";
import { storage } from "./storage.js";

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: Number.POSITIVE_INFINITY,
		},
	},
});

const localStoragePersister = createSyncStoragePersister({
	storage: storage,
	deserialize: (value) => JSON.parse(value),
	serialize: (value) => JSON.stringify(value),
});

persistQueryClient({
	queryClient,
	persister: localStoragePersister,
	maxAge: Number.POSITIVE_INFINITY,
});
