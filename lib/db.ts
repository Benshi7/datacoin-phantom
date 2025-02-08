import { sql } from "@vercel/postgres"
import { drizzle } from "drizzle-orm/vercel-postgres"
import { users, userData } from "./schema"

export const db = drizzle(sql)

export async function createUser(email: string, name: string | null, image: string | null) {
  try {
    // Insert user
    const [user] = await db
      .insert(users)
      .values({
        email,
        name,
        image,
      })
      .returning()

    // Create initial user data
    await db.insert(userData).values({
      userId: user.id,
      balance: 0,
      dataPoints: 0,
      activeShares: 0,
      trustScore: 0,
    })

    return user
  } catch (error) {
    console.error("Error creating user:", error)
    throw error
  }
}

export async function getUserByEmail(email: string) {
  try {
    const [user] = await db.select().from(users).where(sql`email = ${email}`)

    if (!user) return null

    const [data] = await db.select().from(userData).where(sql`user_id = ${user.id}`)

    return {
      ...user,
      ...data,
    }
  } catch (error) {
    console.error("Error getting user:", error)
    throw error
  }
}

export async function updateUserData(userId: number, data: Partial<typeof userData.$inferInsert>) {
  try {
    const [updated] = await db.update(userData).set(data).where(sql`user_id = ${userId}`).returning()
    return updated
  } catch (error) {
    console.error("Error updating user data:", error)
    throw error
  }
}

