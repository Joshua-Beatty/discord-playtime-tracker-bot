import { EmbedBuilder, User, type APIEmbedField } from "discord.js"
import { activities } from "../db/schema.ts"
import humanizeDuration from "humanize-duration"
export default function buildEmbed(data: (typeof activities.$inferSelect)[], user: User) {
    const fields: APIEmbedField[] = []
    for (const row of data) {
        fields.push({
            name: `${row.applicationName} - ${humanizeDuration(
                (row.minutes || 0) * 60 * 1000,
                { units: ["h"], maxDecimalPoints: 1 }
            )}`,
            value: `\`Last Played: \`<t:${Math.round(
                +row.lastPlayed! / 1000
            )}:f>\n\`First Seen:  \`<t:${Math.round(
                +row.firstPlayed! / 1000
            )}:f>`,
        })
    }

    const playTimeEmbed = new EmbedBuilder()
        .setColor(0x0099ff)
        .setTitle("Highest Playtime")
        .setDescription(`${user.displayName}'s most played games`)
        .addFields(fields)
        .setTimestamp()
    return playTimeEmbed
}
