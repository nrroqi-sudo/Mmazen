# Discord Bot - Replit Configuration

## Overview

This is a Discord bot built with Discord.js v13, designed primarily for Arabic-speaking Discord communities. The bot provides comprehensive server management features including moderation commands (ban, kick, mute, prison), role management, welcome systems with customizable canvas images, invite tracking, and various utility commands. The bot uses MongoDB for persistent data storage and pro.db for quick key-value storage.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Bot Framework
- **Discord.js v13**: The bot uses Discord.js version 13 with full intents (32767) for comprehensive Discord API access
- **Command Handler Pattern**: Commands are organized in a modular structure under `Commands/` directory with subdirectories for different command categories (Admin, General, Owners)
- **Event-Driven Architecture**: Events are handled separately in the `events/` directory (messageCreate, interactionCreate)

### Command Structure
- **Prefix Commands**: Traditional message-based commands using a configurable prefix (default: `!`)
- **Slash Commands**: Support for Discord slash commands through `SlashCommands/` directory
- **Permission System**: Each command has its own permission check using a database-stored role/user allowlist pattern (`Allow - Command {commandName} = [ guildId ]`)

### Data Storage
- **MongoDB**: Primary database using Mongoose for structured data (welcome system configurations via `models/welcome.js`)
- **pro.db**: JSON-based key-value store for quick access to settings, permissions, and simple data
- **JSON Files**: Local JSON files for specific features (autorole.js, database.json, pointss.json)

### Key Features Architecture
1. **Welcome System**: Canvas-based welcome images with highly customizable positioning (avatar x/y, size, name positioning, colors)
2. **Moderation**: Hierarchical permission system checking role positions before executing actions
3. **Invite Tracking**: Uses discord-inviter package for tracking member invites
4. **Color Roles**: Number-based color role system with visual canvas display

### Express Server
- Basic Express server running on port 3000 for keep-alive functionality (common pattern for hosted bots)

### Handler System
- `handler/index.js`: Uses glob pattern matching to dynamically load all commands and events
- Commands are stored in `client.commands` Collection
- Slash commands stored in `client.slashCommands` Collection

## External Dependencies

### Core Services
- **MongoDB Atlas**: Cloud database (`mongodb+srv://...`) for persistent storage of welcome configurations and other structured data
- **Discord API**: Bot token required via environment variable `Token` or config.json

### NPM Packages (Key Dependencies)
- **discord.js v13.16.0**: Discord API wrapper
- **mongoose v7.6.2**: MongoDB ODM
- **pro.db v3.0.8**: Simple JSON database
- **canvas v2.11.2** & **@napi-rs/canvas**: Image manipulation for welcome cards
- **discord-inviter v0.9.3**: Invite tracking system
- **discord-html-transcripts**: Chat transcript generation
- **express v4.18.2**: HTTP server for uptime monitoring
- **moment v2.29.4**: Date/time formatting
- **ms**: Time string parsing for timeouts/mutes
- **jimp v0.22.10**: Additional image processing

### Bot Configuration
- Token: Set via `process.env.Token` or `config.json`
- Prefix: Configurable in `config.json` (default: `!`)
- Owners: Array of owner user IDs in `config.json`