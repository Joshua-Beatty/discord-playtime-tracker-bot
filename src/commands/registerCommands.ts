import {
    Client,
    Events,
    MessageFlags,
    REST,
    Routes,
} from "discord.js"
import type { command } from "./types.ts"

import highest from "./highest.ts"
import recent from "./recent.ts"

const commands = [highest, recent]

const commandMap = commands.reduce((prev, current) => {
    prev[current.command.name] = current
    return prev
}, {} as Record<string, command>)

export default async function registerCommands(client: Client) {
    const rest = new REST().setToken(process.env.TOKEN || "")
    await rest.put(Routes.applicationCommands(process.env.CLIENT_ID || ""), {
        body: commands.map((x) => x.command.toJSON()),
    })

    client.on(Events.InteractionCreate, async (interaction) => {
        if (!interaction.isChatInputCommand()) return

        const command = commandMap[interaction.commandName]
        if (command) {
            try {
                await command.action(interaction)
            } catch (error) {
                console.error(error)
                if (interaction.replied || interaction.deferred) {
                    await interaction.followUp({
                        content:
                            "There was an error while executing this command!",
                        flags: MessageFlags.Ephemeral,
                    })
                } else {
                    await interaction.reply({
                        content:
                            "There was an error while executing this command!",
                        flags: MessageFlags.Ephemeral,
                    })
                }
            }
        } else {
            await interaction.reply({
                content: `No known command: ${interaction.commandName}`,
                flags: MessageFlags.Ephemeral,
            })
        }
    })
}
