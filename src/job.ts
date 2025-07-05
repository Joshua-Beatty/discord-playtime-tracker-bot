import { ActivityType, Client } from "discord.js"
import { activities } from "./db/schema.ts"
import { LibSQLDatabase } from "drizzle-orm/libsql"
import { sql } from "drizzle-orm"
import logger from "./utils/logger.ts"

export default async function job(
    client: Client,
    db: LibSQLDatabase<Record<string, never>>
) {
    logger.info(`Fetcing activities`)
    const Guilds = await client.guilds.fetch()
    let userCount = 0
    logger.info(`Fetcing guild users of ${Guilds.size} guilds`)
    for (const [gid, partialGuild] of Guilds) {
        const guild = await partialGuild.fetch()
        const users = await guild.members.fetch({ withPresences: true })
        const values: (typeof activities.$inferInsert)[] = []
        for (const [uid, user] of users) {
            if (user.user.bot) continue
            userCount++
            for (const activity of user.presence?.activities || []) {
                if (activity.applicationId && activity.type == ActivityType.Playing) {
                    values.push({
                        guildId: gid,
                        userId: uid,
                        applicationId: activity.applicationId,
                        applicationName: activity.name,
                        lastPlayed: new Date(),
                        firstPlayed: new Date(),
                        minutes: 1,
                    })
                }
            }
        }
        logger.info(`Inserting/Updating ${values.length} row(s)`)
        if (values.length)
            await db
                .insert(activities)
                .values(values)
                .onConflictDoUpdate({
                    target: [
                        activities.guildId,
                        activities.userId,
                        activities.applicationId,
                    ],
                    set: {
                        minutes: sql`minutes + 1`,
                        applicationName: sql`excluded.applicationName`,
                        lastPlayed: sql`excluded.lastPlayed`,
                    },
                })
        logger.info(
            `Fetched ${userCount} user(s) from ${Guilds.size} guild(s). Found ${values.length} activities.`
        )
    }
}
