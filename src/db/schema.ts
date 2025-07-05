import { int, primaryKey, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const activities = sqliteTable("activities_table", {
  guildId: text(),
  userId: text(),
  applicationId: text(),
  applicationName: text(),
  lastPlayed: int({ mode: 'timestamp_ms' }),
  firstPlayed: int({ mode: 'timestamp_ms' }),
  minutes: int(),
}, (table) => [
  primaryKey({ columns: [table.userId, table.guildId, table.applicationId] }),
]);