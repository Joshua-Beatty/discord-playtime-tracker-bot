import { SlashCommandBuilder } from "discord.js"
import type { command } from "./types.ts"
import { activities } from "../db/schema.ts"
import db from "../db/db.ts"
import { eq, and, desc } from "drizzle-orm"
import buildEmbed from "../utils/buildEmbed.ts"
const command: command = {
    command: new SlashCommandBuilder()
        .setName("highest")
        .setDescription("Get your highest playtimes"),
    action: async function execute(interaction) {
        const gid = interaction.guildId || ""
        const uid = interaction.user.id || ""
        const data = await db
            .select()
            .from(activities)
            .where(and(eq(activities.guildId, gid), eq(activities.userId, uid)))
            .orderBy(desc(activities.minutes))
            .limit(10)

        await interaction.reply({
            embeds: [buildEmbed(data, interaction.user)],
        })
    },
}
export default command
