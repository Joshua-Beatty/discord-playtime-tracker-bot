import "dotenv/config"
const envVars = ["DB_FILE_NAME", "TOKEN"]
for (const v of envVars) {
    if (!process.env[v]) {
        throw `Envvar ${!process.env[v]} is empty`
    }
}

import { Client, Events, GatewayIntentBits } from "discord.js"
import cron from "node-cron"
import job from "./job.ts"
import registerCommands from "./commands/registerCommands.ts"
import db from "./db/db.ts"
import logger from "./utils/logger.ts"

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildPresences,
    ],
})

client.once(Events.ClientReady, async (readyClient) => {
    logger.info(`Ready! Logged in as ${readyClient.user.tag}`)
    await registerCommands(client)

    cron.schedule("* * * * *", () => {
        job(client, db)
    })
})

client.login(process.env.TOKEN)
