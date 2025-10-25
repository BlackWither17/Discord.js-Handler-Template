module.exports = {
	name: 'say',
	description: "Says the user's message.",
	cooldown: 3000,
	userPerms: [],
	botPerms: [],
	run: async (client, message, args) => {
		message.send(args)
	}
};