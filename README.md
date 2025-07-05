# Discord Playtime Tracker Bot

A modern Discord bot for tracking and displaying user playtime statistics. Built with TypeScript, Drizzle ORM, and Docker for easy deployment.


## Features

- ⏱️ **Track Playtime:** Automatically records and aggregates user playtime.
- 🛠️ **Easy Setup:** Deployable via Docker or manually with Node.js.
- 🤖 **Slash Commands:** Modern Discord interactions for a seamless user experience.


## Docker Compose Setup
```yaml
services:
  bot:
    build:
      context: https://github.com/Joshua-Beatty/discord-playtime-tracker-bot.git
    environment:
      - TOKEN=YOUR BOT TOKEN HERE
      - CLIENT_ID=YOUR APP CLIENT ID HERE
      - DB_FILE_NAME=file:/config/db.sqlite
    volumes:
      - /storage/configs/playTimeBotConfig:/config
    restart: unless-stopped
    pull_policy: always
```

## Usage

- `/highest` – Show the leaderboard for highest playtime.
- `/recent` – Show the most recent playtime stats.

Invite the bot to your server and use the above slash commands to interact.


## Project Structure

```
src/
  commands/        # Discord slash commands
  db/              # Database config & schema
  utils/           # Utility functions
  index.ts         # Bot entry point
  job.ts           # Scheduled job
```


## Contributing

Contributions are welcome! Please open issues or submit pull requests for improvements and bug fixes.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a pull request
