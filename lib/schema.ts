import { integer, pgTable, serial, timestamp, varchar, decimal } from "drizzle-orm/pg-core"

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  name: varchar("name", { length: 255 }),
  image: varchar("image", { length: 255 }),
  role: varchar("role", { length: 50 }).default("user"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
})

export const userData = pgTable("user_data", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  balance: decimal("balance").default("0"),
  dataPoints: integer("data_points").default(0),
  activeShares: integer("active_shares").default(0),
  trustScore: integer("trust_score").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
})

export const userSessions = pgTable("user_sessions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  sessionToken: varchar("session_token", { length: 255 }).notNull().unique(),
  expires: timestamp("expires").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
})

