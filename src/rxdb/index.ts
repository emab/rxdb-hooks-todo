import {
	type RxCollection,
	type RxDatabase,
	addRxPlugin,
	createRxDatabase,
} from "rxdb";
import { RxDBDevModePlugin } from "rxdb/plugins/dev-mode";
import { RxDBMigrationPlugin } from "rxdb/plugins/migration-schema";
import { getRxStorageMemory } from "rxdb/plugins/storage-memory";
import { type TodoDocType, todoSchema } from "./todo/todo";

addRxPlugin(RxDBMigrationPlugin);
addRxPlugin(RxDBDevModePlugin);

export type Collections = {
	todos: RxCollection<TodoDocType>;
};

export type Database = RxDatabase<Collections>;

export const initDb = async () => {
	const database: Database = await createRxDatabase<Collections>({
		name: "database",
		storage: getRxStorageMemory(),
		ignoreDuplicate: true,
	});

	await database.addCollections({
		todos: {
			schema: todoSchema,
		},
	});

	await database.todos.insert({
		id: "1",
		title: "Try out RxDB",
		description: "See if we can create a modern hook based API for it",
		done: true,
		timestamp: new Date().toISOString(),
	});

	return database;
};
