import {
  integer,
  text,
  boolean,
  pgTable,
  serial,
  varchar,
  jsonb,
} from "drizzle-orm/pg-core";

export const summaryDataTable = pgTable("user_questions", {
  id: serial("id").primaryKey(),
  roll_number: varchar("roll_number").notNull(), // User-provided ID
  questionsData: jsonb("data").notNull(),
  name: varchar("name", {
    length: 255,
  }).notNull(),
  scores: jsonb("scores").notNull(), // Subject-wise performance data
});
