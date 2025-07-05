import type { CacheType, ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js"

export type command = {
    command: SlashCommandBuilder
    action: (interaction: ChatInputCommandInteraction<CacheType>) => void
}
