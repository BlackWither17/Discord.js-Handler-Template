import { Client, GatewayIntentBits, Partials, Collection } from "discord.js";
import fs from "fs";
import "dotenv/config";

const client = new Client({
  intents: [
    GatewayIntentBits.GuildScheduledEvents,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.AutoModerationConfiguration,
    GatewayIntentBits.AutoModerationExecution,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMembers,
  ],
  partials: [Partials.Channel, Partials.Message, Partials.User, Partials.GuildMember, Partials.Reaction],
});

client.commands = new Collection();
client.aliases = new Collection();
client.slashCommands = new Collection();
client.buttons = new Collection();
client.modals = new Collection();
client.selectMenus = new Collection();
client.contextMenus = new Collection();
client.allCommands = new Array();
client.prefix = process.env.PREFIX;

export default client;

(async () => {
  for (const handler of fs.readdirSync("./handlers")) {
    const { default: handlerFn } = await import(`./handlers/${handler}`);
    await handlerFn(client);
  }

  client.login(process.env.BOT_TOKEN);
})();
