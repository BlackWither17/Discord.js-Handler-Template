import { ActivityType } from "discord.js";
import client from "../index.js";
import logger from "../functions/logger.js";

client.on("clientReady", () => {
  const guild = client.guilds.cache.get(process.env.GUILD_ID);
  const activities = [
    { name: "/help", type: ActivityType.Listening },
    { name: `${guild.channels.cache.size} Channels`, type: ActivityType.Playing },
    { name: `${guild.members.cache.size} Users`, type: ActivityType.Watching },
  ];
  const status = [
    "online",
    "dnd",
    "idle",
  ];
  let i = 0;
  setInterval(() => {
    if(i >= activities.length) {i = 0;}
    client.user.setActivity(activities[i]);
    i++;
  }, 5000);

  let s = 0;
  setInterval(() => {
    if(s >= activities.length) {s = 0;}
    client.user.setStatus(status[s]);
    s++;
  }, 30000);
  logger.success(`Logged in as ${client.user.tag}!`);
});
