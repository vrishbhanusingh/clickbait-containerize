// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import {
  index,
  integer,
  pgEnum,
  pgTable,
  pgTableCreator,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */

export const userSystemEnum = pgEnum(
  "user_system_enum",
  ['system','user']
)
export const createTable = pgTableCreator((name) => `clickbait-containerize_${name}`);

export const posts = createTable(
  "post",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 256 }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt", { withTimezone: true }),
  },
  (example) => ({
    nameIndex: index("name_idx").on(example.name),
  })
);

export const chats = createTable(
  'chats',
  {
    id: serial("id").primaryKey(),
    pdfName: varchar("pdf_name", { length: 256 }).notNull(),
    pdfUrl : varchar("pdf_url", {length: 1024} ).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt", { withTimezone: true }),
    userId : varchar("user_id", {length:256}).notNull(),
    fileKey: varchar('file_key', {length:1024}).notNull(),
    abstract: varchar('abstract'),
  }
)

export const messages = createTable(
  'messages',
  {
    id: serial("id").primaryKey(),
    chatId: integer("chat_id",).references(()=> chats.id).notNull(),
    content : varchar("content", {length: 1024} ).notNull(),
    role:userSystemEnum('role').notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt", { withTimezone: true }),}

)

export const generatedTitles = createTable(
  'generatedTitles',
  {
    id: serial("id").primaryKey(),
    chatId: integer("chat_id",).references(()=> chats.id).notNull(),
    generatedTitle : varchar("generated_title" ).notNull(),
    abstract: varchar('abstract'),
    // role:userSystemEnum('role').notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt", { withTimezone: true }),}

)
export type DrizzleChat = typeof chats.$inferSelect;
